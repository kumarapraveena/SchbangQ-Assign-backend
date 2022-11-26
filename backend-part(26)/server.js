const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const multer=require("multer")()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(multer.array())
app.use(cors())
require('dotenv').config()
const userController=require("./user/routes/user")
const adminController=require("./user/routes/admin")
app.listen(3006,(err)=>{
if(!err){
    console.log("Connected at Port No:3006")
}
else{
    console.log(err)
}
})
mongoose.connect("mongodb://localhost:27017/super-admin",(data)=>{
console.log("Successfull Connected to MongoDB")
},(err)=>{
console.log(err)
})
app.use("/user",userController)
app.use("/admin",adminController)