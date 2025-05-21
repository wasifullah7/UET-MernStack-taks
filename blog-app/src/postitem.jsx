import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostItem = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/${post._id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const toggleComments = () => {
    if (!showComments) fetchComments();
    setShowComments(!showComments);
  };

  return (
    <div style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={toggleComments}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments &&
        (comments.length > 0 ? (
          <ul>
            {comments.map((c) => (
              <li key={c._id}>{c.text}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        ))}
    </div>
  );
};

export default PostItem;
