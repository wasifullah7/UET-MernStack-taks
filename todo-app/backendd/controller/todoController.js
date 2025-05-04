const Todo = require('../models/todoModels')

exports.getTodo = async (req,res)=>{
    const todos = await Todo.find().sort({createdAt: -1})
    res.json(todos)
}

exports.createTodo = async (req,res)=>{
    try {
        const todos = await Todo.create({title:req.body.title})
        res.json(todos)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteTodo = async (req,res)=>{
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id)
        res.json({message:'Successfully deleted!'})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


exports.updateTodo = async (req,res)=>{
    try {
        const updated = await Todo.findByIdAndUpdate(req.params.id,{title:req.body.title},{new:true})
        res.json(updated)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}