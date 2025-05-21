import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams(); // Get post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/posts/${id}`);
        setPost(response.data.blog);
      } catch (err) {
        setError('Error fetching post details');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!post) return <div className="text-center">No post found</div>;

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-grow p-8 bg-white rounded-lg shadow-lg overflow-y-auto">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900">{post.title}</h1>
        <h2 className="text-xl text-gray-700 mb-2">By {post.author}</h2>
        <p className="text-gray-600 mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-800 leading-relaxed text-lg">{post.content}</p>
        <div className="mt-6">
          <button 
            onClick={() => navigate('/blogs')} // Navigate back to blogs
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;