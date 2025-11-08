import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // প্রোফাইল ফেচ করার ফাংশন
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your profile.');
        setLoading(false);
        return;
      }

      const res = await axios.get('http://localhost:7000/user/profile', {
        headers: { Authorization: `Bearer ${token}` }, // টোকেন হেডারে পাঠানো
      });
      setUser(res.data); // ইউজার ডাটা সেট করুন
      setError('');
    } catch (err) {
      setError('Failed to fetch profile. Please login again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // কম্পোনেন্ট লোড হলে প্রোফাইল ফেচ করুন
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='px-[25%] py-2  text-center items-center '>
      <h1 className='text-center text-2xl text-lime-600'>Profile</h1>
      {user ? (
        <div className='px-[25%] text-center h-[50vh] mt-5  border border-black flex flex-col justify-around bg-amber-50'>
          <p className='text-2xl underline'>{user.name}</p>
          <p className='text-xl underline'>Email:{user.email} </p>
          <p className='text-xl underline'>Age:{user.age}</p>
          <p className='text-xl underline'>Phone:{user.phone}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )} 
      <Link to='/post'>
      <button className='px-4 py-2 bg-amber-200 mt-3 rounded-md'>Post Blog</button>
      </Link>
    </div>
  );
};

export default Profile;