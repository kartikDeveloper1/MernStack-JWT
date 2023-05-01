// this middleware helps to authenticate logged in user on each routes
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')
const loginuser=async (req,res,next)=>{
    
    try{
        const token = req.cookies.jwtToken
        const verifyToken= jwt.verify(token,process.env.SECRET_KEY)
        const rootUser = await User.findOne({_id:verifyToken._id})
        if(!rootUser){
            throw new Error('user not found')    
        }
        req.token =token
        req.rootUser= rootUser
        req.userId= rootUser._id

        
        next()
    }catch(err){
        res.status(401).send({error:"unauthorised"})
        // console.log(err)
    }
}
module.exports = loginuser