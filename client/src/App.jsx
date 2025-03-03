//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import AddStudent from "./components/AddStudent";
import AddBook from "./components/AddBook";
import DisplayStudent from './components/DisplayStudent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/addstudent" element={<AddStudent />}></Route>
          <Route path="/addbook" element={<AddBook />}></Route>
          <Route path="/students" element={<DisplayStudent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
