import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTodo(task);
      setTask('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        required
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
};

export default TodoForm; 