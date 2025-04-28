import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleTodoAdded = (newTodo) => {
        setTodos([newTodo, ...todos]);
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <TodoForm onTodoAdded={handleTodoAdded} />
            <div className="todo-list">
                {todos.map(todo => (
                    <div key={todo._id} className="todo-item">
                        <div className="todo-header">
                            <h3>{todo.title}</h3>
                            <span className="todo-date">{new Date(todo.date).toLocaleDateString()}</span>
                        </div>
                        <p className="todo-description">{todo.description}</p>
                        <div className="todo-footer">
                            <span className="todo-assigned">Assigned To: <b>{todo.assignedTo}</b></span>
                            <button onClick={() => handleDelete(todo._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList; 