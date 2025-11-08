
import React, { useEffect, useState } from 'react';
//import { toast } from 'react-toastify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [menu, setMenu] = useState('All');  // State for filtering categories
  const apiUrl = import.meta.env.VITE_BackendUrl
  // Fetch blog data from the server
  useEffect(() => {
    const fetchBlogs = async () => {
      try {

        const response = await axios.get(`${apiUrl}/blog/blog-get`);
        if (response && response.data) {
          setBlogs(response.data); // Set blogs data
        } else {
          console.error('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error("Error fetching blogs, please try again.");
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array means it runs only once when component mounts

  return (
    <div>
      <ToastContainer />
      {/* Category Filter Buttons */}
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu('All')}
          className={menu === 'All' ? 'bg-black text-white py-1 px-4 rounded-sm' : 'py-1 px-4 rounded-sm'}
        >
          All
        </button>
        <button
          onClick={() => setMenu('Travel')}
          className={menu === 'Travel' ? 'bg-black text-white py-1 px-4 rounded-sm' : 'py-1 px-4 rounded-sm'}
        >
          Travel
        </button>
        <button
          onClick={() => setMenu('Health')}
          className={menu === 'Health' ? 'bg-black text-white py-1 px-4 rounded-sm' : 'py-1 px-4 rounded-sm'}
        >
          Health
        </button>
        <button
          onClick={() => setMenu('Story')}
          className={menu === 'Story' ? 'bg-black text-white py-1 px-4 rounded-sm' : 'py-1 px-4 rounded-sm'}
        >
          Story
        </button>
      </div>

      {/* Blog Cards Display */}
      <div className="flex flex-wrap justify-around gap-8 mb-16 xl:mx-24">
        {blogs?.filter((blog) => menu === 'All' || blog.category === menu) // Filter blogs based on selected category
          .map((blog, index) => (
           
             <div key={index} className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
              <div className="md:flex">
                <div className="md:shrink-0">
                  <Link to={`/details/${blog._id}`}>
                  <img
                    class="h-48 w-full object-cover md:h-full md:w-48"
                    src={blog.fileAvatar.url}
                    alt={blog.title}
                  />
                  </Link>
                </div>
                <div class="p-8">
                  <div class="text-sm font-semibold tracking-wide text-indigo-500 uppercase"> {blog.title}</div>
                  <a href="#" class="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
                    {blog.category}
                  </a>
                  <p class="mt-2 text-gray-500">
                    {blog.author}
                  </p><br />
                  <p className='mt-2 text-gray-500'>{blog.brief}</p>
                </div>
              </div>
     
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogList;




