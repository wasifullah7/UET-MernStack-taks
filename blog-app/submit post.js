function NewPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error('Failed to submit post.');
      alert('Post submitted!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button type="submit">Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
