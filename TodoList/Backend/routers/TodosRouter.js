import express from 'express';
import { createTodo } from '../controller/TodosController.js'; // Ensure correct spelling of 'Controller'

const todoRouter = express.Router();

// Corrected route path to include leading slash
router.post('/add-todos', createTodo);

export default todoRouter;