import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    password: '',
  });
  const apiUrl = import.meta.env.VITE_BackendUrl
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
      const response = await axios.post(`${apiUrl}/user/register`, formData);
      setMessage('Registion success!');
      setError('');
      console.log(response.data);
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'failed!');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className=" h-[100vh] flex items-center justify-center p-4 dark:bg-slate-800">
      <div className="bg-white p-6 shadow-lg rounded-xl w-96 dark:bg-slate-100">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl text-blue-800 font-bold capitalize text-center mb-4">
            <h3>welcome!</h3>
          </div>
          <div>
            <div>
              <div className="capitalize text-xl mb-2">
                <label>Name</label>

              </div>

              <div className="border-2 relative">
                <span className="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">

                </span>


                <input className='w-full placeholder:capitalize px-8 py-1.5 outline-blue-800'
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>
            <div>
              <div className="capitalize text-xl mb-2">
                <label>Email</label>

              </div>

              <div className="border-2 relative">
                <span className="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">

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
            <div>
              <div className="capitalize text-xl mb-2">
                <label>Age</label>

              </div>

              <div className="border-2 relative">
                <span className="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">

                </span>


                <input className='w-full placeholder:capitalize px-8 py-1.5 outline-blue-800'
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>
            <div>
              <div className="capitalize text-xl mb-2">
                <label>Phone</label>

              </div>

              <div className="border-2 relative">
                <span className="absolute px-2 inset-y-0 left-0 flex items-center text-gray-400">

                </span>


                <input className='w-full placeholder:capitalize px-8 py-1.5 outline-blue-800'
                  type="text"
                  name="phone"
                  value={formData.phone}
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

              <button className='bg-blue-800 text-xl text-white font-medium uppercase p-2 rounded-lg w-full opacity-90 hover:opacity-100 mt-4' type="submit">Register</button>
            </div>
            <div class="text-[18px] text-center mt-4">
              <p>Do have an account? <a class="capitalize text-blue-800 hover:underline cursor-pointer" href="/loginuser">login</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>


  );
};

export default Register;