import React from 'react'
import { useParams } from 'react-router-dom';

const Post = ({blogs, slugify}) => {
    const {slug} = useParams();
    const blog = blogs.find(blog => slugify(blog.title) === slug);
  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h3 className="font-bold text-xl shadow-lg mb-2">Loading...</h3>
        <p className="text-gray-700 text-justify">Please wait while the post loads or it may not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
        <h3 className="font-bold text-xl shadow-lg mb-2">{blog.title}</h3>
        <p className="text-gray-700 text-justify">{blog.content}...</p>
    </div>
  )
}

export default Post