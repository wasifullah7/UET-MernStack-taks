const express = require('express');
const router = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  deletePost
} = require('../controllers/posts');

// Route to get all posts
router.get('/', getPosts);

// Route to get a single post by ID
router.get('/:id', getPost);

// Route to create a new post
router.post('/', createPost);

// ✅ Route to delete a post by ID
router.delete('/:id', deletePost);

module.exports = router;
