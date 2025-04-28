import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleStatus, onDelete }) => {
  if (todos.length === 0) {
    return <div className="empty-list">No tasks found</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList; 