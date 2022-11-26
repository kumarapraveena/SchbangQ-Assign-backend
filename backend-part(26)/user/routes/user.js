const mongoose=require("mongoose")
const express=require("express")
const router=express.Router()
// const dotenv=require("dotenv").config()
const {checkExistingUser}=require("../utility")
const {generatePasswordHash}=require("../utility")
const signUpModel =require("../modals/SignupModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
router.post("/signup",async(req,res)=>{
if(await checkExistingUser(req.body.username)){
    res.status(400).send("User Already Exists Please try with New User...")
}
else{
    generatePasswordHash(req.body.password).then((passwordHash)=>{
        signUpModel.create({username:req.body.username,email:req.body.email,password:passwordHash}).then((userData)=>{
            console.log(userData)
res.status(200).send(`${req.body.username} Created Successfully..`)
        }).catch((err)=>{
            res.status(400).send(err.message)
        })
    })
}
})
router.post("/login",(req,res)=>{
    // res.status(200).send("login works")
    signUpModel.find({username:req.body.username}).then((userData)=>{
        if(userData.length){
       bcrypt.compare(req.body.password,userData[0].password).then((val)=>{
          if(val){
const authToken=jwt.sign(userData[0].username,process.env.SECRETKEY)
res.status(200).send({authToken})
          }
          else{
            res.status(400).send("Invalid Password")
          }
       })
        }
        else{
            res.status(400).send("Unauthorized User")
        }
    })

})

module.exports=router