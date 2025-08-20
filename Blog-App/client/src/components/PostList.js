import { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/posts');
      setPosts(res.data);
      setLoading(false);
    } catch {
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleDelete(post._id)}>🗑 Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
