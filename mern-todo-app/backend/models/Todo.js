const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    assignedTo: String,
});

module.exports = mongoose.model('Todo', TodoSchema);
