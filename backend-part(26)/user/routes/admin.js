const mongoose=require("mongoose")
const express=require("express")
const router=express.Router()
const CourseModel=require("../modals/CourseModel")
const SignupModel=require("../modals/SignupModel")
const jwt=require("jsonwebtoken")
router.post("/createcourse",(req,res)=>{
    const userName = jwt.verify(req.headers.authorization, process.env.SECRETKEY);
SignupModel.find({username:userName}).then((users)=>{
if(users.length){
    CourseModel.create({title:req.body.title,description:req.body.description,vedioUrl:req.body.vedioUrl,topicsarray:req.body.topicsarray,duration:req.body.duration,category:req.body.category}).then((userData)=>{
        console.log(userData)
        res.status(200).send("Course Added Successfully")
    }).catch((err)=>{
        res.status(400).send(err)
    })
}
else{
    res.status(400).send("User Not Exists")
}
})
})
router.get("/get",(req,res)=>{
CourseModel.find().then((userData)=>{
userData.map((item)=>{
    if(item.isapproved && item.typeofemployee==="SuperAdmin"){
 res.status(200).send(item)
    }
    else{
        res.status(400).send("User is not approved admin cannot see course ")
    }
    // return item.isapproved===true
})
}).catch((err)=>{
    res.status(400).send(err.message)
})
})

router.put("/update/:id",(req,res)=>{
    
    CourseModel.find({_id:req.params.id}).updateMany({typeofemployee:req.body.typeofemployee,isapproved:req.body.isapproved}).then(()=>{
        // res.status(200).send(data)
        // console.log()
        
    res.status(200).send("role of employee Updated Successfully...")
        
    }).catch((err)=>{
res.status(400).send(err)
    })
})
router.delete("/delete/:id",(req,res)=>{
    
    CourseModel.find({_id:req.params.id}).deleteOne().then(()=>{
        // res.status(200).send(data)
        // console.log()
        res.status(200).send("Course Deleted  Successfully...")
    }).catch((err)=>{
res.status(400).send(err)
    })
})
module.exports=router
