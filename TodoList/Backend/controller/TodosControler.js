import mongoose from 'mongoose';
import todoCollection from "../models/todosModel";

export const createTodo = async (req, res) => {
  const { title, description, date, assignedTo } = req.body; 
  try {
  
    if (!title || !description || !date || !assignedTo) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields"
      });
    }

   o
    const newTodo = new todoCollection({
      title,
      description,
      date,
      assignedTo
    });

  
    await newTodo.save(); 

    return res.send({
      success: true,
      message: "Todo added successfully",
      newTodo
    });

  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while creating the todo"
    });
  }
};