import express from 'express';
import { createBlogPost, getAllBlogPosts, getBlogById } from '../controller/blogController.js';

const blogRouter = express.Router();

// Route to create a new blog post
blogRouter.post('/posts', createBlogPost);

// Route to get all blog posts with pagination
blogRouter.get('/posts', getAllBlogPosts);

// Route to get a blog post by ID
blogRouter.get('/posts/:id', getBlogById);

export default blogRouter;