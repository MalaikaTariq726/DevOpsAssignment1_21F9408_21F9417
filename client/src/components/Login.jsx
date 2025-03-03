import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Signup.css";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    Cookies.remove("token");
  },[]);
  const handleSubmit = () => {
    if (role === "admin") {
      axios
        .post("http://localhost:3001/authAdmin/login", { email, password })
        .then((response) => {
          console.log(response.data);
          alert("Login Successfully!");
          navigate("/students");
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          alert("Error occurred: Incorrect Credentials, ", error);
        });
    } else {
      console.log("Role is not defined.");
      alert("Role is not defined.");
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login Page</h2>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="btn-login" onClick={handleSubmit}>
          Login
        </button>
        <p></p>
      </div>
    </div>
  );
}
export default Login;
