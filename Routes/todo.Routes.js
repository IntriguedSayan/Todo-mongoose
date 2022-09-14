const {Router}=require("express")
const {TodoModel}=require("../Models/todo")

const todoController=Router()


todoController.get("/",async(req,res)=>{
    const result=await TodoModel.find()
    res.send(result)
})

todoController.post("/addTodo",async(req,res)=>{
    const payload=req.body
    const new_todo=new TodoModel(payload)
    await new_todo.save()
    res.send("Successful")
})

todoController.put("/updateTodo/:id",async(req,res)=>{
    const payload=req.body
    const params=req.params
    console.log(params)
    await TodoModel.replaceOne({_id:params.id},payload)
    res.send("Data Replaced")
})

todoController.delete("/:id",async(req,res)=>{
    const params=req.params
    console.log(params)
    await TodoModel.deleteOne({_id:params.id})
    res.send("Data Deleted")
})



module.exports={
    todoController,
}