
import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../../main";
import axios from 'axios';
import { Link } from 'react-router-dom';



const BlogList = () => {
  const apiUrl = import.meta.env.VITE_BackendUrl
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { } = useContext(Context);
  const handleDelete = async (id) => {
        try {
          setLoading(true);  
          const response = await axios.delete(`${apiUrl}/blog/${id}`);
          console.log('Item deleted successfully:', response.data)
          setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== id));
          setLoading(false);  
        } catch (error) {
         setLoading(false);  
          setError('Error deleting blog. Please try again.');
          console.error('Error deleting item:', error);
        }
      };

  useEffect(() => {
   
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blog/blog-get`);
        if (response && response.data) {
          setBlogs(response.data);
        } else {
          console.error('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs()
  }, [])


  return (

    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs..</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-black'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author Name</th>
              <th scope='col' className=' px-6 py-3'>Blog Title</th>
              <th scope='col' className=' px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
  {blogs.map((blog) => (
    <tr key={blog._id} className='bg-white border-b'>
      <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {blog.fileAvatar && (
          <img
            width={40}
            height={40}
            className="rounded-full"
            src={blog.fileAvatar.url}
            alt={blog.title}
          />
        )}
      </th>
      <td className='px-6 py-4'>
        {blog.title ? blog.title : "No title"}
      </td>
      <td className='px-6 py-4'>
        {blog.date ? blog.date : "No date"}
      </td>
      <td className='flex gap-x-2'>
        <button  onClick={() => handleDelete(blog._id)} className='border border-black rounded-sm  active:bg-gray-600 active:text-white'>delete</button>
        <Link to={`/admin/edit/${blog._id}`} >
        <button className='border border-black rounded-sm  active:bg-gray-600 active:text-white'>edit</button>
        </Link>
      </td>
    </tr>
  ))}
</tbody>
         

        </table>

      </div>


    </div>
  )
}

export default BlogList

