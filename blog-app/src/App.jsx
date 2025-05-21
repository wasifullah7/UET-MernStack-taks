import React from 'react';
import PostList from './PostList';
import NewPostForm from './NewpostForm';

function App() {
  return (
    <div className=" margin-left: 20px min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">My Blog</h1>
        <NewPostForm />
        <PostList />
      </div>
    </div>
  );
}

export default App;
