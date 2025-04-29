import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  useEffect(()=>{
axios.get('http://localhost:3001/get')
.then(result=>setTodos(result.data))
.catch(error=>console.log(error))
  },[])

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="todo-wrapper">
        <header>
          <h1>📝 My Todo List</h1>
          <p>Stay productive. Get things done.</p>
          <button className="mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <div className="input-section sticky">
          <input
            type="text"
            placeholder="What do you want to do today?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>Add Task</button>
        </div>

        <div className="counter">
          {todos.length} task{todos.length !== 1 ? 's' : ''}
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">You're all caught up! 🎉</div>
          ) : (
            todos.map((todo, index) => (
              <div
                className={`todo-item fadeInUp ${todo.completed ? 'completed' : ''}`}
                key={index}
              >
                <div onClick={() => toggleTodo(index)}>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <span>{todo.text}</span>
                </div>
                <button className="delete-btn" onClick={() => deleteTodo(index)}>
                  ❌
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 

export default Home;
