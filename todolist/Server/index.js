const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const { json } = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Route to get all todo tasks
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result)) // Send the result as a JSON response
    .catch(error => res.status(500).json({ error: error.message })); // Send error with status code
});

// Route to add a new todo task
app.post('/add', (req, res) => {
  const task = req.body.task;

  TodoModel.create({ task })
    .then(result => res.json(result)) // Send the created result as a JSON response
    .catch(error => res.status(500).json({ error: error.message })); // Send error with status code
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
