import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:7000/user/login', formData);
      localStorage.setItem('token', response.data.token);
      toast.success('sucess!');
      setFormData({ email: '', password: '' });
      navigate('/')
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || 'login failed');
      } else if (err.request) { 
        toast.error('Network problem!');
      } else {   
        toast.error('try again');
      }
      console.error(err);
    }
  };

  return (

    <div className=" h-[50vh] flex items-center justify-center p-4 dark:bg-slate-800">
      <ToastContainer
       position="top-right"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
      />
      <div className="bg-white p-6 shadow-lg rounded-xl w-96 dark:bg-slate-100">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl text-blue-800 font-bold capitalize text-center mb-4">
            <h3>welcome back!</h3>
          </div>
          <div>
            <div>
              <div className="capitalize text-xl mb-2">
                <label>Email</label>

              </div>

              <div className="border-2 relative">
                <span className="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </span>


                <input className='w-full placeholder:capitalize px-8 py-1.5 outline-blue-800'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>
            <div class="mt-4">
              <div class="capitalize text-xl mb-2">
                <label>password</label>
              </div>
              <div class="border-2 relative">
                <span class="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </span>

                <input className='w-full placeholder:capitalize px-8 py-1.5 outline-blue-800'
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>

              <button className='bg-blue-800 text-xl text-white font-medium uppercase p-2 rounded-lg w-full opacity-90 hover:opacity-100 mt-4' type="submit">Login</button>
            </div>
            <div class="text-[18px] text-center mt-4">
              <p>Don't have an account? <a class="capitalize text-blue-800 hover:underline cursor-pointer" href="/register">register</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>


  );
};

export default Login;
