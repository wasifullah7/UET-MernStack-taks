import React from 'react'

const Home = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-10'>Home Page</h1>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='border-2 border-gray-300 w-full max-w-md mx-auto mt-10 p-10 rounded-lg shadow-lg bg-white'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Welcome to the Home Page</h2>
          <p className='text-center'>This is the home page of our application.</p>
        </div>
      </div>
    </div>
  )
}

export default Home