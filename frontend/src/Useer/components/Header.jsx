
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const sideMenuRef = useRef()
  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translatex(-16rem)'
  }
  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translatex(16rem)'
  }
  const [email, setEmail] = useState("");

  const apiUrl = import.meta.env.VITE_BackendUrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/email/emailadd`,
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message || "Email added successfully");
      setEmail("");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Get the token from localStorage or sessionStorage
      const token = localStorage.getItem('token');

      // Call the logout endpoint with the Authorization header
      await axios.post(
        `${apiUrl}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem('token');

      navigate('/loginuser');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <div className="py-5 px-5 md:px-12 lg:px-28">
        <div className=" flex justify-between items-center">
          <img
            src="/headlogo.png"
            alt=""
            className="hidden  md:flex  h-[130px] w-[130px] sm:w-auto cursor-pointer"
          />
          <div className="block h-7 w-7 lg:hidden md:hidden cursor-pointer" onClick={openMenu} >
            <img src="/Images/fmenu.png" alt="" />
          </div>
          <div>
            <ul className="hidden custom-range:hidden md:flex lg:flex md:gap-6 lg:gap-12 gap-4 text-2xl cursor-pointer">
              <Link to="/">Home</Link>

              <li><a href="/contact">Connact us</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/loginuser">Login</a></li>
              <li><a href="/profile">Profile</a></li>
              <li onClick={handleLogout}><a href="">Logout</a></li>

            </ul>
          </div>

          <Link to='/login'>

            <button className="flex items-center gap-2 font-medium py-1 px-3  sm:py-3 sm:px-6 border border-solid border-black rounded-md bg-amber-100 shadow-[-7px_7px_0px_#000000]">
              Get Start <img src="/rightarrow.png" width={20} height={20} alt="" />
            </button>
          </Link>
          {/*--------mobile menu------------*/}
          <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64
    top-0 buttom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500'>
            <div className='absolute right-6 top-6 cursor-pointer' onClick={closeMenu}>
              <img src='/Images/Cross.png' alt='' width={25} height={25} />
            </div>
            <li><a onClick={closeMenu} herf="/">Home</a></li>
            <li><a onClick={closeMenu} href="/contact">Contact Us</a></li>
            <li><a onClick={closeMenu} href="/register">Sign-Up</a></li>
            <li><a onClick={closeMenu} href="/loginuser">Sign-In</a></li>
            <li><a onClick={closeMenu} href="/profile">Profile</a></li>
            <li><a onClick={closeMenu} href="/post">Post Blog</a></li>
            <li><a onClick={handleLogout} href="">Log-Out</a></li>
          </ul>

        </div>

      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">
          Latest Blogs there...
        </h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Positivity is key to overcoming challenges. It helps us stay resilient, focused, and motivated,
          turning obstacles into opportunities and improving both mental and physical he
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between max-w-[500px] bg-amber-100 scale-75 sm:scale-100 mx-auto mt-10 border border-solid border-black shadow-[-7px_7px_0px_#000000] rounded-md "
          action=""
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            className="pl-4 outline-none bg-amber-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default Header;