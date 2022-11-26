const mongoose=require("mongoose")
// title, description, video Url, topics array, duration, category, )

const CourseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    vedioUrl:{
        type:String,
        required:true 
    },
    topicsarray:{
        type:String,
        required:true 
    },
duration:{
        type:String,
        required:true 
    },
    category:{
        type:String,
        required:true 
    },
    typeofemployee:{
        type:String,
        default:"Employee"
    },
    isapproved:{
        type:String,
        default:false
    }
})
const CourseModel=mongoose.model("course-creation",CourseSchema)
module.exports=CourseModel