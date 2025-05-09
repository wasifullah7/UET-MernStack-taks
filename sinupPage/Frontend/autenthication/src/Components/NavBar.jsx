import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">MyApp</div>
          <ul className="flex space-x-4">
            <NavLink to="/" className="text-white hover:text-gray-300">
              <p>HOME</p>
            </NavLink>
            <NavLink to="/dashboard" className="text-white hover:text-gray-300">
              <p>DASHBOARD</p>
            </NavLink>
            <NavLink to="/register" className="text-white hover:text-gray-300">
              <buttion>Register</buttion>
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
