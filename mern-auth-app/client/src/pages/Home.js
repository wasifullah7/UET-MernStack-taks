import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <Link to="/login"><button>Login</button></Link>
      <br /><br />
      <Link to="/signup"><button>Signup</button></Link>
    </div>
  );
}
