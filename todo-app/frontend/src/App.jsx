import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./componets/TodoForm";
import TodoList from "./componets/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    await axios.post("http://localhost:5000/todos", todo);
    fetchTodos();
  };``

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 font-mono drop-shadow">Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

export default App;