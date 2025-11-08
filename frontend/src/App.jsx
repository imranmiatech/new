
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserApp from './Useer/UserApp';
import AdminApp from './admin/AdminApp';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserApp/>} />
        <Route path='/admin/*' element={<AdminApp/>}/>
      </Routes>
    </Router>
  );
}

export default App;