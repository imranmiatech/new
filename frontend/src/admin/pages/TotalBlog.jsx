import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@mui/material';

const TotalBlog = () => {
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [totalSubs, setTotalSubs] = useState(0);
    const [totalBlogsToday, setTotalBlogsToday] = useState(0);
    const [totalBlogsYesterday, setTotalBlogsYesterday] = useState(0);
    const [dailyVisits, setDailyVisits] = useState(0);
    const apiUrl = import.meta.env.VITE_BackendUrl
    useEffect(() => {
        const fetchTotalBlogs = async () => {
            try {
                const response = await axios.get(`${apiUrl}/blog/total-blogs`);
                setTotalBlogs(response.data.totalBlogs);
            } catch (error) {
                console.error('Error fetching total blogs:', error);
            }
        };
        const fetchTotalSubs = async () => {
            try {
                const response = await axios.get(`${apiUrl}/email/total-subscribe`);
                setTotalSubs(response.data.totalSubs);
            } catch (error) {
                console.error('Error fetching total subscribers:', error);
            }
        };
        const fetchTotalBlogsToday = async () => {
            try {
                const response = await axios.get(`${apiUrl}/blog/perdaytotal`);
                setTotalBlogsToday(response.data.totalBlogsToday);
            } catch (error) {
                console.error('ত্রুটি:', error);
            }
        }
        const fetchTotalBlogsYesterday = async () => {
            try {
                const response = await axios.get(`${apiUrl}/blog/total-blogs-yesterday`);
                setTotalBlogsYesterday(response.data.totalBlogsYesterday);
            } catch (error) {
                console.error('ত্রুটি:', error);
            }
        };
        const fetchDailyVisits = async () => {
            try {
                const response = await axios.get(`${apiUrl}/visit/daily-visits`);
                setDailyVisits(response.data.dailyVisits);
            } catch (error) {
                console.error('ত্রুটি:', error);
            }
        };

        fetchTotalBlogs();
        fetchTotalSubs();
        fetchTotalBlogsToday();
        fetchTotalBlogsYesterday();
        fetchDailyVisits();
    }, [])


    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>All Information..</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-black'>
                <table className='w-full text-sm text-gray-500 p-5'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                        <tr className='flex justify-between'>
                            <th scope='col' className='hidden sm:block px-6 py-3'>Information Name</th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr className='bg-white border-b flex justify-between'>
                            <td scope='row' className='items-center gap-3 hidden sm:flex px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
                                <p>Total blog :</p>{totalBlogs}

                            </td>


                        </tr>
                        <tr className='bg-slate-100 border-b flex justify-between'>
                            <td scope='row' className='items-center gap-3 hidden sm:flex px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
                                <p>Subscriber :</p> {totalSubs}
                            </td>
                        </tr>
                        <tr className='bg-white border-b flex justify-between'>
                            <td scope='row' className='items-center gap-3 hidden sm:flex px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
                                <p>Sum of blog post in Today :</p> {totalBlogsToday}
                            </td>
                        </tr>
                        <tr className='bg-slate-100 border-b flex justify-between'>
                            <td scope='row' className='items-center gap-3 hidden sm:flex px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
                                <p>Sum of blog post in yesterday :</p> {totalBlogsYesterday}
                            </td>
                        </tr>
                        <tr className='bg-white border-b flex justify-between'>
                            <td scope='row' className='items-center gap-3 hidden sm:flex px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
                                <p>Sum of visiter in this web :</p>  {dailyVisits}
                            </td>
                        </tr>
                        
                    </tbody>


                </table>

            </div>


        </div>
        
    );
}

export default TotalBlog;




