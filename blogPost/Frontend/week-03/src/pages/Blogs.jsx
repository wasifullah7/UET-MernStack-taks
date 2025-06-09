import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Set the limit for pagination

  const getBlogs = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/blog/posts?page=${page}&limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages); // Use totalPages from the response
    } catch (error) {
      setError('Error fetching blogs');
      console.log('There is an error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/blog/posts/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id)); // Update state to remove deleted blog
    } catch (error) {
      setError('Error deleting blog post');
      console.log('There is an error:', error);
    }
  };

  useEffect(() => {
    getBlogs(currentPage);
  }, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-gray-100 rounded-lg shadow-md p-4 h-96 overflow-hidden"
          >
            <Link to={`/posts/${blog._id}`} className="block">
              <h1 className="text-lg font-semibold text-gray-800">{blog.blogid}</h1>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{blog.title}</h2>
              <p className="text-gray-700 mb-2">Author: {blog.author}</p>
              <p className="text-gray-800 line-clamp-4">{blog.content}</p>
            </Link>
            <button 
              onClick={() => deleteBlogPost(blog._id)} 
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          className="mx-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span className="text-lg">{currentPage} / {totalPages}</span>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
          className="mx-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;