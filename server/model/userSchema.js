const mongoose= require('mongoose')
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
    
})



//hashing password 
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcyrpt.hash(this.password,12)
        this.cpassword = await bcyrpt.hash(this.cpassword,12)
    }
    next()
})

// we are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        return token
    }catch(err){
        console.log(err)
    }
}


const User = mongoose.model('users',userSchema)
module.exports = User
