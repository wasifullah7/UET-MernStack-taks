let express = require('express');
let router = express.Router();
const { createBlog, displayBlogs, displayBlog} = require('../controllers/blogcontroller');

// Create a new blog post
router.post('/posts', createBlog);
router.get('/posts', displayBlogs);
router.get('/posts/:id', displayBlog);

module.exports = router;