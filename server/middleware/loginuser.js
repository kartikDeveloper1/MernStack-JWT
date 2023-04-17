// this middleware helps to authenticate logged in user on each routes
const jwt = require('jsonwebtoken')

const loginuser=async (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try{    
        const data= jwt.verify(token,process.env.SECRET_KEY)
        req.user=data
        next()
    }catch(err){
        res.status(401).send({error:"not valid token"})
    }
}
module.exports = loginuser