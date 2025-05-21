import mongoose from 'mongoose';

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
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the Blog model
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;