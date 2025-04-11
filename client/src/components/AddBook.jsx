import React, { useState } from "react";
import "../CSS/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function AddBook() {
  const [name, setName] = useState("");
  const [ssin, setSsin] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post(`${backendURL}/authBook/addbook`, { name, ssin, author })
      .then((response) => {
        console.log(response.data);
        alert("Boom added Successfully!");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        alert("Error occurred:", error);
      });
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Add Book</h2>
        <br />
        <div className="form-group">
          <label htmlFor="name">Book Name:</label>
          <input
            type="text"
            placeholder="Enter Book Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ssin">SSIN:</label>
          <input
            type="number"
            placeholder="Enter SSIN"
            onChange={(e) => setSsin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            placeholder="Enter Author Name"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <button className="btn-login" onClick={handleSubmit}>
          Add
        </button>
        <p></p>
      </div>
    </div>
  );
}
export default AddBook;
