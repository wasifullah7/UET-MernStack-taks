import Blog from "../model/blogModel.js";

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
export const getAllBlogPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit
    const skip = (page - 1) * limit;

    try {
        const blogs = await Blog.find().skip(skip).limit(limit);
        const total = await Blog.countDocuments(); // Get total count for pagination
        res.status(200).json({
            success: true,
            total,
            page,
            blogs,
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