import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BackendUrl
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    writter: '',
    category: '',
    date: '',
  });

  // Fetch blog data when component mounts
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blog/${id}`)
        setFormData(response.data);
      } catch (error) {
        toast.error("Failed to fetch blog data.");
      }
    };

    fetchBlogData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.author || !formData.category || !formData.date) {
      toast.error("Please fill all the fields.");
      return;
    }

    const data = {
      title: formData.title,
      description: formData.description,
      author: formData.author,
      writter: formData.writter,
      date: formData.date,
      category: formData.category,
    };

    try {
      const response = await axios.put(
        `${apiUrl}/blog/blog/${id}`, // Update endpoint
        data,
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setFormData({
        title: '',
        description: '',
        author: '',
        category: '',
        writter: '',
        date: '',
      });
      navigate('/admin')

    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleUpdate} className='pt-5 px-5 sm:pt-12 sm:pl-12'>
        <p className='text-xl'>Update Blog</p>

        {/* Title */}
        <p className='text-xl mt-4'>Blog Title</p>
        <input
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder='Title'
          required
        />

        {/* Description */}
        <p className='text-xl mt-4'>Blog Description:</p>
        <textarea
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          required
        />

        {/* Author */}
        <p className='text-xl mt-4'>Blog Author</p>
        <input
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          type="text"
          name='author'
          value={formData.author}
          onChange={handleChange}
          placeholder='Type Author'
          required
        />

        {/* Writter */}
        <p className='text-xl mt-4'>Writter</p>
        <input
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          type="text"
          name='writter'
          value={formData.writter}
          onChange={handleChange}
          placeholder='Type Writter'
          required
        />

        {/* Date */}
        <p>Upload Date</p>
        <input
          type="date"
          name="date"
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          value={formData.date || ''}
          onChange={handleChange}
          required
        />

        {/* Category */}
        <p className='text-xl mt-4'>Blog Category</p>
        <select
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          name='category'
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Health">Health</option>
          <option value="Story">Story</option>
          <option value="Travel">Travel</option>
        </select>
        <br /> <br />
        {/* Submit Button */}
        <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>
          Update Blog
        </button>
      </form>
    </>
  );
};

export default UpdateBlog;
