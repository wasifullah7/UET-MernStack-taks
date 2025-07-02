import React from 'react'
import { useNavigate } from 'react-router-dom';

const Posts = ({blogs, slugify}) => {
  const navigate = useNavigate();
  
  return (
      <div className="max-w-3xl mx-auto p-4">
      <section>
        <h2 className="font-semibold text-2xl mb-4 text-blue-700">All Posts</h2>
        {blogs.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map(blog => ( // Display only the first 4 blogs
              <li key={blog._id} 
                  className="group border-2 p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:border-blue-500"
                  onClick={() => navigate(`/posts/${slugify(blog.title)}`)}>
                <h3 className="font-bold text-xl shadow-lg mb-2 transition-colors duration-300 group-hover:text-blue-600">{blog.title}</h3>
                <p className="text-gray-700 text-justify">{blog.content.slice(0, 500)}...</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Posts