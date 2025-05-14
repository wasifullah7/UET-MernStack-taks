import React from 'react';
import './TodoList.css';

function TodoList({ todos, handleDelete }) {
    return (
        <table className="todo-table">
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo._id}>
                        <td>{todo.title}</td>
                        <td className="desc-cell">{todo.description}</td>
                        <td>{todo.date}</td>
                        <td>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(todo._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TodoList;
