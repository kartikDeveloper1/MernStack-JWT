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
app.use(express.json()) //We need to tell our application to accept json data format

app.use(require("./router/auth"))

const PORT=process.env.PORT || 5000 

/*
Routes
*/
app.get('/',(req,res)=>{
    res.send("Hello world from the Express Server")
})

// 3rd step heroku deployment
if(process.env.NODE_ENV== "production"){
    app.use(express.static('client/build'))
}
//

app.listen(PORT,()=>{
    console.log(`Now Server is Running at port number ${PORT}`)
})