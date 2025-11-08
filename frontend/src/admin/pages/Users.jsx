import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Users = () => {
  const apiUrl = import.meta.env.VITE_BackendUrl;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

 const handleDelete = async (id) => {
       try {
         setLoading(true);  
         const response = await axios.delete(`${apiUrl}/user/${id}`);
           console.log('Item deleted successfully:', response.data)
          setUsers((prevUser) => prevUser.filter(user => user._id !== id));
           setLoading(false);  
       } catch (error) {
         setLoading(false);  
          setError('Error deleting blog. Please try again.');
          console.error('Error deleting item:', error);
        }
       };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/user/total-user`);
        console.log('Response:', response);  
        if (response && response.data) {
          setUsers(response.data); // নিশ্চিত করুন যে `response.data` একটি অ্যারে
        } else {
          console.error('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const usersArray = Array.isArray(users) ? users : [];

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Users..</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-black'>
        <table className='w-full text-sm text-gray-500 p-5'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr className='flex justify-between'>
              <th scope='col' className='hidden sm:block px-6 py-3'>User Name</th>
              <th scope='col' className='hidden sm:block px-6 py-3'>User Email</th>
              <th scope='col' className='px-6 py-3 pr-6'>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersArray.map((user) => (
              <tr key={user._id} className='bg-white border-b flex justify-between'>
                <td  className='items-center gap-3 hidden sm:flex px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
                {user.name ? user.name : "No title"}
               
                </td>
                 <td className='items-center gap-3 hidden sm:flex px-6 py-2 font-medium text-gray-900 whitespace-nowrap'> {user.email ? user.email : "No title"}</td>
                <td className='flex gap-x-2 pr-3'>
                  <button onClick={() => handleDelete(user._id)} className='border px-3 border-black rounded-sm active:bg-gray-600 active:text-white'>
                    delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
