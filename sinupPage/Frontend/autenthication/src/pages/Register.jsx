import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [state, setState] = useState('signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (state === 'signup') {
                // Sign up logic
                const response = await axios.post('http://localhost:3000/api/user/signup', {
                    name,
                    email,
                    password,
                });

                console.log(response.data); // Handle success response
                alert('User created successfully!');
                
                // Reset form fields
                setName('');
                setEmail('');
                setPassword('');
            } else {
                // Login logic
                const response = await axios.post('http://localhost:3000/api/user/login', {
                    email,
                    password,
                });

                localStorage.setItem('token', response.data.token); // Store token in local storage
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in local storage

                console.log('Login successful:', response.data); // Handle success response
                alert('Login successful!');
                
                // Redirect to dashboard
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Redirect to dashboard if token exists
                }else{
                  navigate('/dashboard'); // Redirect to dashboard if token exists
                  
                }
                
                // Reset fields
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="border-2 border-gray-300 w-full max-w-md mx-auto mt-10 p-10 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {state === 'login' ? 'Login' : 'Sign Up'}
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {state === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter your name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        {state === 'login' ? 'Login' : 'Register'}
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        {state === 'signup' ? (
                            <>
                                Already have an account?{' '}
                                <span
                                    onClick={() => setState('login')}
                                    className="text-blue-500 cursor-pointer hover:underline"
                                >
                                    Login
                                </span>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <span
                                    onClick={() => setState('signup')}
                                    className="text-blue-500 cursor-pointer hover:underline"
                                >
                                    Sign Up
                                </span>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;