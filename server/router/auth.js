const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const db= require('../db/conn')
const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')
const loginuser= require('../middleware/loginuser')
const cookieParser =require("cookie-parser");
router.use(cookieParser())

router.get('/',(req,res)=>{
    res.send("Hello world from the Express Router Server")
})


// using Async Await 
router.post('/register',async (req,res)=>{
    const {name,email,phone,work,password,cpassword} = req.body
    if( !name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:'All fields are mandatory'})
    }
    try{
        const userExist=await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:'Email Already Exist !!'})
        }else if(password != cpassword){
            return res.status(422).json({error:'Password Mismatch !!'})
        }else{
            const user = new User({name,email,phone,work,password,cpassword})
            //middleware to use pre / post function on 'save' event function defined in userSchema
            const userRegisterData=await user.save()
            if(userRegisterData){
                res.status(201).json({success:"user registered successfully"})
            }
        }
        
    }catch(err){
        console.log(err)
    }
})

//login Route

router.post('/login',async (req,res)=>{
    try{   
        const {email,password}= req.body
        if(!email || !password){
            return res.status(400).json({error:'Invalid details'})
        }

        const userLogin = await User.findOne({email:email})
        // match user password with db password
        if(userLogin){
            const isMatch =await bcrypt.compare(password,userLogin.password)
            //token generate for user
            if(isMatch){
                const AuthToken =await userLogin.generateAuthToken()

                res.cookie("jwtToken",AuthToken,{
                    expires: new Date(Date.now()+ 25892000000),
                    httpOnly:true
                })

                res.json({success:"user signin successfully",AuthToken})
            }else{
                res.status(400).json({error:"Invalid Credentials"})
            } 
        }else{
            res.status(400).json({error:"Invalid Credentials"})
        }

        
    }catch(err){
        console.log(err)
    }

})


//getUser Details for about page and contact page

router.get('/getuser',loginuser,async(req,res)=>{
    res.send(req.rootUser)
})



// contact page form submit url route
router.post('/contact',loginuser,async(req,res)=>{
    try {
        const {name,email,phone,message} = req.body
        if(!name || !email || !phone || !message){
            return res.json({error:"Please fill the contact form"})
        }else{
            let userId= req.user._id
            const user = await User.findById(userId).select("-password")
            if(user){
                const userMessage=await user.addMessage(message)
                await user.save()
                res.status(200).json({success:"Message sent successfully"})
            }
        }

    } catch (error) {
        console.log(error)
    }
})

//logout functionality
router.get('/logout',(req,res)=>{
    res.clearCookie('jwtToken',{path:'/'})
    res.status(200).send('logout')
})

router.all('*', function(req, res, next){
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
            res.header("Access-Control-Max-Age", "1728000")
            next();
        });

module.exports = router
