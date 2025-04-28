const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema); 