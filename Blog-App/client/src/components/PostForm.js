import { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/posts', { title, content });

      setTitle('');
      setContent('');
      setSuccess('✅ Post added successfully!');
      setTimeout(() => setSuccess(''), 3000); // Hide after 3 sec
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <button type="submit">Add Post</button>
      </form>
      {success && <p style={{ textAlign: 'center', color: 'green' }}>{success}</p>}
    </>
  );
};

export default PostForm;
