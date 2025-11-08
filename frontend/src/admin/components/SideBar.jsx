import React from 'react'
import { Link } from 'react-router-dom'



const SideBar = () => {


    return (
        <div className='hidden   md:flex md:flex-col lg:flex lg:flex-col bg-slate-100 '>
            <div className=' flex  w-28 sm:w-80 px-2 sm:pl-14 py-3 border border-black'>
                <h2 className='font-medium h-8 items-center'>BlogSphere</h2>
            </div>
            <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
                <div className='w-[50%] sm-[80]  absolute right-0'>
                    <Link to='/admin/addblog'>
                        <div className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0_#000]'>
                            <img src="/Images/add.jpeg" width={20} height={20} alt="" /> <h3>Add Blogs</h3>
                        </div>
                    </Link>
                    <Link to='/admin'>
                        <div className=' mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0_#000]'>
                            <img src="/Images/list.jpeg" width={20} height={20} alt="" />  <h3>Blog List</h3>
                        </div>
                    </Link>
                    <Link to='/admin/subs'>
                        <div className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0_#000]'>
                            <img src="/Images/subs.jpeg" width={20} height={20} alt="" />   <h3>Subscrobtion</h3>
                        </div>
                    </Link>
                    <Link to='/admin/totalblog'>
                        <div className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0_#000]'>
                            <img src="/Images/subs.jpeg" width={20} height={20} alt="" />   <h3>Information</h3>
                        </div>
                    </Link>
                    <Link to='/admin/users'>
                        <div className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0_#000]'>
                            <img src="/Images/users.png" width={20} height={20} alt="" />   <h3>USERS</h3>
                        </div>
                    </Link>

                </div>


            </div>



        </div>
    )
}

export default SideBar