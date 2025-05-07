import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';  
import Register from './pages/Register';

const App = () => {
  return (
    <div>
    
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
   
  );
};

export default App;