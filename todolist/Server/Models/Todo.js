const mongoose = require('mongoose');

// Define the schema for a Todo item
const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true
  }
});

// Create the model from the schema
const TodoModel = mongoose.model('Todo', TodoSchema);

// Export the model
module.exports = TodoModel;
