
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/posts`, { title, content })
      .then(() => {
        setMessage('Post created successfully!');
        setTitle('');
        setContent('');
      })
      .catch(() => setMessage('Failed to create post'));
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '300px', padding: '8px', marginBottom: '10px' }}
        /><br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows={6}
          style={{ width: '300px', padding: '8px', marginBottom: '10px' }}
        /><br />
        <button type="submit">Create Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreatePost;
