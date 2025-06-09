import Blog from "../model/blogModel.js";
import Comment from "../model/commentModel.js"; // Import the Comment model

// Create a new blog post
export const createBlogPost = async (req, res) => {
    const { blogid, title, author, content } = req.body;
    try {
        const newBlog = new Blog({
            blogid,
            title,
            author,
            content,
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: "Error creating blog post", error });
    }
};

// Get all blog posts with pagination
// Get all blog posts with pagination
export const getAllBlogPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values for page and limit

    try {
        // Convert page and limit to numbers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * limitNumber;

        // Fetch the blogs with pagination
        const blogs = await Blog.find()
            .skip(skip)
            .limit(limitNumber);

        // Count total number of blogs for total pages
        const totalBlogs = await Blog.countDocuments();

        res.status(200).json({
            success: true,
            blogs,
            totalPages: Math.ceil(totalBlogs / limitNumber), // Calculate total pages
            currentPage: pageNumber, // Current page number
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog posts", error });
    }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        return res.status(200).json({ success: true, blog });
    } catch (error) {
        console.log('There is an error', error);
        res.status(500).json({ message: "Error fetching blog", error });
    }
};

// Fetch comments for a blog post
export const getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.find({ postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};

// Create a new comment for a blog post
export const createComment = async (req, res) => {
    const { postId } = req.params;
    const { author, content } = req.body;
    try {
        const newComment = new Comment({ postId, author, content });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Error creating comment", error });
    }
};


// delete post by id

// Delete a blog post by ID
export const deleteBlogPost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog post", error });
    }
};