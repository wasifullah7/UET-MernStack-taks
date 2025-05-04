// routes/todos.js
const express = require("express");
const router = express.Router();
const Todo = require('../models/todoModels')
const {getTodo,
createTodo,
deleteTodo,
updateTodo} = require('../controller/todoController')
// GET all todos
router.get("/",getTodo);

// POST a new todo
router.post("/", createTodo);

// DELETE a todo
router.delete("/:id",deleteTodo);
router.put("/:id",updateTodo);

module.exports = router;
