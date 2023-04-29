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

//using promises
// router.post('/register',(req,res)=>{
//     const {name,email,phone,work,password,cpassword} = req.body
//     if( !name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:'All fields are mandatory'})
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:'Email Already Exist !!'})
//         }
//         const user = new User({name,email,phone,work,password,cpassword})

//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfully"})
//         }).catch((err)=>{
//             res.status(500).json({error:"failed to register"})
//         })

//     }).catch(err => {console.log(err)})

// })


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


//getUser Details for about page

router.get('/getuser',loginuser,async(req,res)=>{
    try {
        let userId= req.user._id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router