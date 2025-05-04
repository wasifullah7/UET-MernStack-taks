import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./componets/TodoForm";
import TodoList from "./componets/TodoList";
import Signup from "./componets/Signup";
import Login from "./componets/Login";

// All logic in one file
const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // true = show login, false = show signup

  // Fetch todos from backend
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
    if (isLoggedIn) fetchTodos();
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const addTodo = async (todo) => {
    await axios.post("http://localhost:5000/api/todos", todo);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  if (!isLoggedIn)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-100 to-gray-200">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
          {showLogin ? (
            <>
              <Login onLogin={() => setIsLoggedIn(true)} />
              <p className="text-center mt-2">
                Don't have an account?{" "}
                <button className="text-blue-600 underline" onClick={() => setShowLogin(false)}>
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <Signup onSignup={() => setIsLoggedIn(true)} />
              <p className="text-center mt-2">
                Already have an account?{" "}
                <button className="text-blue-600 underline" onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );

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