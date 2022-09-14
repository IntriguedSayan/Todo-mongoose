const mongoose=require("mongoose")

require("dotenv").config()
const connection=mongoose.connect(process.env.MONGO_URL)

const todoSchema=new mongoose.Schema({
    todo_name:String,
    status:Boolean
},{
    versionKey:false,
    timestamps:true
})

const TodoModel=mongoose.model("todo",todoSchema)

module.exports={
    TodoModel
}