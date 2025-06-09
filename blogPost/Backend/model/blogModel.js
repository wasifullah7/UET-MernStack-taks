import mongoose from "mongoose";

// Define the blog schema
const blogSchema = new mongoose.Schema({
    blogid: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 5, // Minimum length for title
        trim: true, // Trim whitespace
    },
    author: {
        type: String,
        required: true,
        trim: true, // Trim whitespace
    },
    content: {
        type: String,
        required: true,
        minlength: 20, // Minimum length for content
        trim: true, // Trim whitespace
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' // Reference to Comment model
    }]
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the Blog model
const Blog = mongoose.model('Blog', blogSchema);
export default Blog