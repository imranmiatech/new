
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogDetails from './pages/BlogDetails';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Post from './pages/Post';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    alert('You need to login to access this page.');
    return <Navigate to='/loginuser' />;
  }
  return children;
};

function UserApp() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route
          path='/details/:id'
          element={
            <ProtectedRoute>
              <BlogDetails />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/loginuser' element={<Login />} />
        <Route path='/profile' element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/post' element={<Post/>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default UserApp;
// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import BlogList from './components/BlogList';
// import BlogDetails from './pages/BlogDetails';
// import LoginPage from './pages/LoginPage';
// import Register from './pages/Register';
// import Login from './pages/Login';

// function UserApp() {
//   const [error, setError] = useState(null);

//   // Check if the user is authenticated
//   const isAuthenticated = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('No token found. Please login again.');
//       return false;
//     }
//     return true;
//   };

//   // ProtectedRoute component
//   const ProtectedRoute = ({ children }) => {
//     return isAuthenticated() ? children : <Navigate to='/loginuser' />;
//   };

//   return (
//     <div>
//       <Header />
//       {error && <div className="error-message">{error}</div>}
//       <Routes>
//         <Route path='/' element={<BlogList />} />
//         <Route
//           path='/details/:id'
//           element={
//             <ProtectedRoute>
//               <BlogDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route path='/login' element={<LoginPage />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/loginuser' element={<Login />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default UserApp;