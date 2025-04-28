import { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onTodoAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        assignedTo: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/todos', formData);
            onTodoAdded(response.data);
            setFormData({
                title: '',
                description: '',
                date: '',
                assignedTo: ''
            });
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="assignedTo"
                    placeholder="Assigned To"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm; 