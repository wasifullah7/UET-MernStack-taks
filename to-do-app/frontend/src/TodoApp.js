import React, { useState } from 'react';
import './App.css'; // Make sure this line is included

function TodoApp() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate || !assignedTo) return;

    const newTodo = {
      id: Date.now(),
      title,
      description,
      dueDate,
      assignedTo
    };

    setTodos([...todos, newTodo]);

    // Reset fields
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignedTo('');
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </label>

        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label>
          Assigned To:
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Enter assignee"
          />
        </label>

        <button type="submit">Add Todo</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <strong>{todo.title}</strong> - {todo.description}  
            <br />
            <em>Due: {todo.dueDate} | Assigned to: {todo.assignedTo}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
