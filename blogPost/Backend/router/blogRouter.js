import express from 'express';
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogById,
  getCommentsByPostId,
  createComment,
  deleteBlogPost,
} from '../controller/blogController.js';

const blogRouter = express.Router();

// Route to create a new blog post
blogRouter.post('/posts', createBlogPost);

// Route to get all blog posts with pagination
blogRouter.get('/posts', getAllBlogPosts);

// Route to get a blog post by ID
blogRouter.get('/posts/:id', getBlogById);

// Route to get comments for a specific blog post
blogRouter.get('/posts/:postId/comments', getCommentsByPostId);

// Route to create a new comment for a blog post
blogRouter.post('/posts/:postId/comments', createComment);

// Route to delete a blog post by ID
blogRouter.delete('/posts/:id', deleteBlogPost);

export default blogRouter;