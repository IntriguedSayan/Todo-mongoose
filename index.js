const express=require("express")
const {connection}=require("./Config/db")
const {TodoModel}=require("./Models/todo")
const {todoController}=require("./Routes/todo.Routes")

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/todos",todoController)


app.listen(7200,async()=>{
    try{
        await connection
        console.log("Listening on port 7200")
    }catch(err){
        console.log("Connection Failed");
        console.log(err)
    }
})

