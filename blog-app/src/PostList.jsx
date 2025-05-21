import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from './PostList';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      setPosts(res.data);
    } catch (err) {
      setError('Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return (
      <p className="text-center text-blue-600 font-semibold mt-4">
        Loading posts...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 font-semibold mt-4">{error}</p>
    );

  if (posts.length === 0)
    return (
      <p className="text-center text-gray-500 font-medium mt-4">
        No posts found.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
