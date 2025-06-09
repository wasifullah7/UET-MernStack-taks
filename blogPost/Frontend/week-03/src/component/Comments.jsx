import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
        setComments(response.data);
      } catch (err) {
        setError('Error fetching comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/posts/${postId}/comments`, { author, content });
      setComments((prevComments) => [...prevComments, response.data]);
      setAuthor('');
      setContent('');
    } catch (err) {
      setError('Error submitting comment');
    }
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map(comment => (
          <div key={comment._id} className="comment">
            <strong>{comment.author}</strong>: {comment.content}
          </div>
        ))
      )}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          placeholder="Your Name" 
          required 
          className="comment-input" // Add class for styling
        />
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Your Comment" 
          required 
          className="comment-textarea" // Add class for styling
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;