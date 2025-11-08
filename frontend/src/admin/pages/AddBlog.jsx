import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
  const apiUrl = import.meta.env.VITE_BackendUrl
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    date: '',
    fileAvatar: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fileAvatar') {
      setFormData({ ...formData, fileAvatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.fileAvatar) {
      toast.error("Please select an image.");
      return;
    }



    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
    if (formData.fileAvatar && !allowedFormats.includes(formData.fileAvatar.type)) {
      toast.error("Please select a valid image file (PNG, JPEG, or WEBP).");
      return;
    }

    if (formData.fileAvatar.size > 5 * 1024 * 1024) { // 5MB
      toast.error("Image size should be less than 5MB.");
      return;
    }

    const data = new FormData();
    data.append('fileAvatar', formData.fileAvatar); // formData2 নয়, formData ব্যবহার করুন
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('author', formData.author);
    data.append('date', formData.date);
    data.append('category', formData.category);

    try {
      const response = await axios.post(`${apiUrl}/blog/blog`,
        data, {
        withCredentials: true,
      }
    )



      toast.success(response.data.message);
      setFormData({
        title: '',
        description: '',
        author: '',
        category: '',
        date: '',
        fileAvatar: null,
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
      <form onSubmit={handleRegister} className='pt-5 px-5 sm:pt-12 sm:pl-12'>
        <p className='text-xl'>Upload Blog</p>
        <label htmlFor='fileAvatar'>
          <img
            src={formData.fileAvatar ? URL.createObjectURL(formData.fileAvatar) : "/Images/Addb.jpeg"}
            width={140}
            className='mt-4 '
            alt="Blog preview"
          />
        </label>
        <input
          onChange={handleChange}
          type="file"
          name="fileAvatar"
          accept="image/png, image/jpeg, image/webp"
          id='fileAvatar'
          hidden
          required
        />
        <p className='text-xl mt-4'>Blog Title</p>
        <input
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black relative z-10'
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder='Title'
          required
        />
        <p className='text-xl mt-4'>Blog Description:</p>
        <textarea
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          required
        />
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
        <p>Upload Date</p>
        <input type="date" className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          value={formData.date || ''} onChange={handleChange} name="date" id="" />
        <p className='text-xl mt-4'>Blog Category</p>
        <select
          className='w-full sm:w-[500px] mt-4 py-3 px-4 border border-black'
          name='category'
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Health">Health</option>
          <option value="Story">Story</option>
          <option value="Travel">Travel</option>
        </select>
        <br />

        <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>
          Add Blog
        </button>
      </form>

    </>
  );
};

export default AddBlog;
