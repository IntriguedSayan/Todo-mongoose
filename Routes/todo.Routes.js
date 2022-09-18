const {Router}=require("express")
const {TodoModel}=require("../Models/todo.model")
const {UserModel}=require("../Models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const todoController=Router()


todoController.get("/",async(req,res)=>{
    console.log(req.headers.authorization)
    const token=req.headers.authorization.split(" ")[1] 
    jwt.verify(token,"secret",async(err,decoded)=>{
        if(err){
            return res.send("Please Login")
        }else{
            const result=await TodoModel.find()
            res.send(result)
        }
    })
    
})

todoController.post("/addTodo",async(req,res)=>{
    console.log(req.headers.authorization)
    const token=req.headers.authorization.split(" ")[1]
    jwt.verify(token,"secret",async(err,_)=>{
        if(err){
            return res.send("Please Login")
        }else{
            const payload=req.body
            const new_todo=new TodoModel(payload)
            await new_todo.save()
            res.send("Successful")
        }
    })
   
})

todoController.put("/updateTodo/:id",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    jwt.verify(token,"secret",async(err,_)=>{
        if(err){
            return res.send("Please Login")
        }else{
            const payload=req.body
            const params=req.params
            console.log(params)
            await TodoModel.replaceOne({_id:params.id},payload)
            res.send("Data Replaced")
        }
    })
    
})

todoController.delete("/:id",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    jwt.verify(token,"secret",async(err,_)=>{
        if(err){
            return res.send("Please Login")
        }else{
            const params=req.params
            console.log(params)
            await TodoModel.deleteOne({_id:params.id})
            res.send("Data Deleted")
        }
    })
   
})



module.exports={
    todoController,
}