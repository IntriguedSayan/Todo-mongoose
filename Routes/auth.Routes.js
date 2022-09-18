const {Router} = require("express")
const {UserModel}=require("../Models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const authController=Router()

authController.get("/",(req,res)=>{
    res.send("Continue with SignUp & LogIn")
})

authController.post("/signup",async(req,res)=>{
    let {name,email,password,age}=req.body
    let newPassword=""
    bcrypt.hash(password,6).then(async(hash)=>{
        newPassword=hash
        const user=new UserModel({name:name,
                                  email:email,
                                  password:newPassword,
                                  age:age})
        await user.save()
        res.send("Signup successful")
    })
    .catch((err)=>{
        console.log(err)
    })
    console.log(req.body)
})

authController.post("/login",async(req,res)=>{
    console.log(req.body)
    const{email,password}=req.body
    const user=await UserModel.findOne({email})
    if(user===false) return res.send("Couldn't find user")
    const hash=user.password
    bcrypt.compare(password,hash,(err,result)=>{
        if(result){
            const token=jwt.sign({email:email},"secret",{expiresIn:60*5})
            console.log(token)
            return res.send({msg:"Login Successful",token:token})
        }else{
            return res.send("Login failed")
        }
    })
})

module.exports={
    authController
}

