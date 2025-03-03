import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Signup.css";
import axios from "axios";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/authAdmin/signup", { email, password, username })
      .then((response) => {
        console.log(response.data);
        alert("Signup Successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        alert("Error occurred: Email must be unique, ", error);
      });
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Signup Page</h2>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
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
        <button className="btn-login" onClick={handleSubmit}>
          Sign Up
        </button>
        <p></p>
      </div>
    </div>
  );
}
export default Signup;
