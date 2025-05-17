import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <div className="navbar">
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Blog App</span>
          <div>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="container">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
