import React, { useEffect } from "react";
import "../App.css";

export default function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in first.");
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h1>Welcome to Dashboard</h1>
      <p>You are logged in ✅</p>
      <button onClick={handleLogout}>Logout</button> {/* 👈 This is your logout button */}
    </div>
  );
}
