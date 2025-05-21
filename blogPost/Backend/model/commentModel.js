import mongoose from "mongoose";

// Define the comment schema
const commentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog', // Reference to the Blog collection
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;