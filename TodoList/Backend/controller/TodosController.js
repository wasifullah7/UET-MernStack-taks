import todoCollection from '../models/todosModel.js';


export const createTodo = async (req, res) => {
  const { title, description, date, assignedTo } = req.body; 
  try {
   
    if (!title || !description || !date || !assignedTo) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields"
      });
    }

    
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


export const getTodos = async (req, res) => {
  try {
    const todos = await todoCollection.find(); 
    return res.send({
      success: true,
      todos
    });
  } catch (error) {
    console.error("error to fetch the todos:", error);
    return res.status(500).send({
      success: false,
      message: "eror to fetch the todos"
    });
  }
};


export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await todoCollection.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send({
        success: false,
        message: "Todo is  not found"
      });
    }

    return res.send({
      success: true,
      message: "Todo deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while deleting the todo"
    });
  }
};