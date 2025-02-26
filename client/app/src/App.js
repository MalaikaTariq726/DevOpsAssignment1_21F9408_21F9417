import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Login from './user_management/Login';
import Home from './user_management/Home';
import Navbar from './user_management/Navbar';
import SetRole from './user_management/RoleSelection';
import './App.css';
import ForgotPassword from './user_management/ForgotPassword';
import StudentDashboard from './user_management/StudentDashboard';
import MentorDashboard from './user_management/MentorDashboard';
import AdminDashboard from './user_management/AdminDashboard';

function App() {

  return (  
    <Router>
    <Navbar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Home />} />
       <Route path="/signin" element={<Login />} />
       <Route path="/setrole" element={<SetRole/>}/>
       <Route path="/forgot" element={<ForgotPassword/>}/>
       <Route path="/studdash" element={<StudentDashboard/>} />
       <Route path="/mentdash" element={<MentorDashboard/>} />
       
       <Route path="/admindash" element={<AdminDashboard/>} />
     </Routes>
   </Router>
  );
}

export default App;
