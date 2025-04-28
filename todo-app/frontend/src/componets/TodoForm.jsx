import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    assignedTo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(form);
    setForm({ title: "", description: "", date: "", assignedTo: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row md:items-end gap-4 mb-8"
    >
      <div className="flex-1">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50 text-gray-800 shadow"
          required
        />
      </div>
      <div className="flex-1">
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50 text-gray-800 shadow"
        />
      </div>
      <div>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50 text-gray-800 shadow"
        />
      </div>
      <div className="flex-1">
        <input
          name="assignedTo"
          placeholder="Assigned To"
          value={form.assignedTo}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50 text-gray-800 shadow"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition font-semibold"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;