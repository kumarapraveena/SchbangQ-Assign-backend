const mongoose=require("mongoose")
const signUpSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true 
    },
    typeofemployee:{
        type:String,
        default:"Employee"
    }
})
const signUpModel=mongoose.model("admin-backend",signUpSchema)
module.exports=signUpModel