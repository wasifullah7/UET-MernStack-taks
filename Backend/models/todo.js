let mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, default: false},
    timestamp: {type: Date, default: Date.now}
});

let TodoModel = mongoose.model('Todolist', todoSchema);
module.exports = TodoModel;