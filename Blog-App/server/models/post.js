const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Post', PostSchema);
