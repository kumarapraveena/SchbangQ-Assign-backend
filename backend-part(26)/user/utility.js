// const signUpModel=require("./modals/SignupModel")
// const bcrypt=require("bcryptjs")
// const mongoose=require("mongoose")
// const checkExistingUser=async(username)=>{
// let existingUser=false;
// await signUpModel.find({username:username}).then((userData)=>{
//     if(userData.length){
//         existingUser=true
//     }
// })
// return existingUser
// }
// const generatePasswordHash=(password)=>{
// let salt=10;
// return new Promise((resolve,reject)=>{
//     bcrypt.genSalt(10).then((saltHash)=>{
//         bcrypt.hash(password,saltHash).then((passwordHash)=>{
//     resolve(passwordHash)
//         })
//     })
    
// })
// }
// module.exports={checkExistingUser,generatePasswordHash}
const signupModel=require("./modals/SignupModel")
const bcrypt=require("bcryptjs")
 const checkExistingUser=async(username)=>{
    let existingUser=false;
    await signupModel.find({username:username}).then((userData)=>{
if(userData.length){
    existingUser=true
}
    })
return existingUser
}
const generatePasswordHash=(password)=>{
    const salt=10;
    // let hash='';
    return new Promise((resolve,reject)=>{
         bcrypt.genSalt(salt).then((hashSalt)=>{
            bcrypt.hash(password,hashSalt).then((passwordHash)=>{
resolve(passwordHash)
            })
        })
    })
}
module.exports={checkExistingUser,generatePasswordHash}