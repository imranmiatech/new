
import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../../main";
import axios from 'axios';



const SubsCribe = () => {
  const apiUrl = import.meta.env.VITE_BackendUrl
  const [emails, setEmail] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { } = useContext(Context);
  const handleDelete = async (id) => {
        try {
          setLoading(true);  
          const response = await axios.delete(`${apiUrl}/email/${id}`);
          console.log('Item deleted successfully:', response.data)
          setEmail((prevEmail) => prevEmail.filter(email => email._id !== id));
          setLoading(false);  
        } catch (error) {
         setLoading(false);  
          setError('Error deleting blog. Please try again.');
          console.error('Error deleting item:', error);
        }
      };

  useEffect(() => {
   
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/email/emailget`);
        if (response && response.data) {
          setEmail(response.data);
        } else {
          console.error('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchEmail()
  }, [])


  return (

    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All SubsCriber..</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-black'>
        <table className='w-full text-sm text-gray-500 p-5'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr className='flex justify-between'>
              <th scope='col' className='hidden sm:block px-6 py-3'>Email Name</th>
              <th scope='col' className='px-6 py-3 pr-6'>Action</th>
            </tr>
          </thead>
          <tbody>
  {emails.map((email) => (
    <tr key={email._id} className='bg-white border-b flex justify-between'>
      <td scope='row' className='items-center gap-3 hidden sm:flex px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
      {email.email}
      </td>
     
      <td className='flex gap-x-2 pr-3'>
        <button  onClick={() => handleDelete(email._id)} className='border px-3 border-black rounded-sm  active:bg-gray-600 active:text-white'>delete</button>
       
      </td>
    </tr>
  ))}
</tbody>
         

        </table>

      </div>


    </div>
  )
}

export default SubsCribe

