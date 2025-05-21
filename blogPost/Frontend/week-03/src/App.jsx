import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Blogs from './pages/Blogs';
import NavBar from './component/NavBar';
import Form from './pages/Form';
import PostDetails from './pages/PostDetails'; // Import the PostDetails component

const App = () => {
  return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/posts/:id" element={<PostDetails />} /> {/* Route for post details */}
        </Routes>
      </div>
    
  );
};

export default App;