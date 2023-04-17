const dotenv = require('dotenv')
const mongoose= require('mongoose')
const express = require('express')
const app = express() 
const jwt = require('jsonwebtoken')
//we require express to deal with backend and to use in our app we need to
// assign it to app const to use its functionality(Mthods and properties)


dotenv.config({path:'./config.env'})

//db connection
require('./db/conn')
// const User = require('./model/userSchema')
app.use(express.json()) //We need to tell our application to accept json data format
app.use(require("./router/auth"))

const PORT=process.env.PORT




//MiddleWare
// const middleware=(req,res,next)=>{
//     console.log('my middleware')
//     next();
// }
//MiddleWare End


/*
Routes
*/
app.get('/',(req,res)=>{
    res.send("Hello world from the Express Server")
})

// app.get('/about',middleware,(req,res)=>{
//     res.send("about")
// })

app.get('/contact',(req,res)=>{
    res.send("contact")
})

app.get('/signin',(req,res)=>{
    res.send("signin")
})

app.get('/signup',(req,res)=>{
    res.send("signup")
})

app.listen(PORT,()=>{
    console.log("Now Server is Running at port number 3000")
})