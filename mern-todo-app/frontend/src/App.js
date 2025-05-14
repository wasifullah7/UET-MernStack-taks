import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Footer from './Footer';
import './index.css';  // or App.css, whichever you’re using

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error('Fetch todos error:', err));
  }, []);

  const handleTodoAdded = newTodo => {
    // POST to server first
    axios.post('http://localhost:5000/todos', newTodo)
      .then(res => {
        setTodos(prev => prev.concat(res.data));
      })
      .catch(err => console.error('Add todo error:', err));
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo._id !== id));
      })
      .catch(err => console.error('Delete todo error:', err));
  };

  return (
    <div className="main-wrapper">
      <div className="content-wrapper">
        <div className="form-section">
          <h1>Todo List App</h1>
          <TodoForm onTodoAdded={handleTodoAdded} />
        </div>
        <div className="sidebar-section">
          <h2>Tasks</h2>
          <TodoList todos={todos} handleDelete={handleDelete} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
