import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Signup.css";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function Signup() {
  const [rollno, setRollno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const verifyToken = async () => {
    console.log("Verifying Token....");
    let response = false;
    await axios
      .post(`${backendURL}/authAdmin/verifyToken`)
      .then((res) => {
        console.log("Token verification response:", res.data);
        response = res.data.status;
      })
      .catch((error) => {
        console.log(error.message);
      });
    return response;
  };

  function handleSubmit() {
    axios
      .post(`${backendURL}/authStudent/addstudent`, {
        rollno,
        email,
        grade,
        password,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        navigate("/students");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        alert("Error occurred:", error);
      });
  }

  useEffect(async () => {
    let isTokenExpired = await verifyToken();
    if(!isTokenExpired){
      alert("Session expired!");
      navigate("/");
    }
  }, [rollno, email, password, grade, handleSubmit]);
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Add Student</h2>
        <br />
        <div className="form-group">
          <label htmlFor="rollno">RollNo:</label>
          <input
            type="text"
            placeholder="Enter RollNo"
            onChange={(e) => setRollno(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            placeholder="Enter Grade"
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <button className="btn-login" onClick={handleSubmit}>
          Register
        </button>
        <p></p>
      </div>
    </div>
  );
}
export default Signup;
