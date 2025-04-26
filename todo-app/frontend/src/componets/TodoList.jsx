import React from "react";

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <ul className="space-y-4 mt-6">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex flex-col md:flex-row md:items-center justify-between bg-white border border-gray-200 rounded-xl shadow p-4 hover:shadow-lg transition"
        >
          <div className="flex-1">
            <div className="font-semibold text-lg text-gray-800">{todo.title}</div>
            <div className="text-gray-500">{todo.description}</div>
            <div className="text-gray-400 text-sm mt-1">
              {todo.date ? new Date(todo.date).toLocaleDateString() : ""}
              {todo.assignedTo && (
                <span className="ml-4 text-gray-500">Assigned to: <span className="font-medium">{todo.assignedTo}</span></span>
              )}
            </div>
          </div>
          <button
            onClick={() => deleteTodo(todo._id)}
            className="mt-3 md:mt-0 md:ml-6 bg-white border border-gray-300 text-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-50 hover:text-red-700 transition font-semibold"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;