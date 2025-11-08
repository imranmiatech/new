
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom'


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//        <App/>
      
//     </BrowserRouter>
    
//   </React.StrictMode>,
// )

import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import React from 'react';
//import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
//export const Context = createContext({ isAuthenticated: false });
export const Context = createContext({isAuthenticated: false})

const AppWrapper = () => {
  const [blogs, setBlogs] = useState({});

  return (
    <Context.Provider 
    value={{blogs, setBlogs}}>
      <App />
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
