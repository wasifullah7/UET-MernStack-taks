const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        assignedTo: req.body.assignedTo
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 