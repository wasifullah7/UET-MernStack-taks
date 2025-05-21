import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="flex justify-around items-center bg-gray-800 p-4 shadow-md">
      <NavLink 
        to="/" 
        className="text-white text-lg hover:text-blue-400 transition duration-300"
        activeClassName="border-b-2 border-blue-400"
      >
        <h1>Home</h1>
      </NavLink>
      <NavLink 
        to="/blogs" 
        className="text-white text-lg hover:text-blue-400 transition duration-300"
        activeClassName="border-b-2 border-blue-400"
      >
        <h1>Blogs</h1>
      </NavLink>
      {/* Example of a dynamic link to view a specific post by ID */}
      <NavLink 
        to="/posts/1" // Replace '1' with the actual post ID dynamically
        className="text-white text-lg hover:text-blue-400 transition duration-300"
        activeClassName="border-b-2 border-blue-400"
      >
        <h1>Post Details</h1>
      </NavLink>
    </nav>
  );
};

export default NavBar;