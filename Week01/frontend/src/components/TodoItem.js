import React from 'react';

const TodoItem = ({ todo, onToggleStatus, onDelete }) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggleStatus(todo.id, !todo.completed)}
      />
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.task}
      </span>
      <button
        className="delete-button"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem; 