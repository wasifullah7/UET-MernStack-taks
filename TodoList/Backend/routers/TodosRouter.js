import express from 'express';
import { createTodo, getTodos, deleteTodo } from '../controller/TodosController.js'; 

const myRouter = express.Router();
//post methos

myRouter.post('/add-todos', createTodo);

// GET methods
myRouter.get('/todos', getTodos);

// DELETE methods
myRouter.delete('/todos/:id', deleteTodo);

export default myRouter;