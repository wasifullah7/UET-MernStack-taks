// Signup.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      onSignup();
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Sign Up</h2>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
      {error && <div className="text-red-600 text-center">{error}</div>}
    </form>
  );
}