import React, { useState, useEffect } from "react";
import "../CSS/login.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import { useAuth } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const { loginUser, signupUser } = useAuth();
  const [role, setRole] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    Cookies.remove("token");
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error) {
      alert(error);
    }
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    const handleSignUp = () => {
      container.classList.add("right-panel-active");
      setIsSignUp(true);
    };

    const handleSignIn = () => {
      container.classList.remove("right-panel-active");
      setIsSignUp(false);
    };

    signUpButton.addEventListener("click", handleSignUp);
    signInButton.addEventListener("click", handleSignIn);

    return () => {
      signUpButton.removeEventListener("click", handleSignUp);
      signInButton.removeEventListener("click", handleSignIn);
    };
  }, []);

  const createAccount = () => {
    signupUser({ email, password, role, name });
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    window.open("http://localhost:7373/auth/google/callback", "_self");
  };

  const handleForgotPassword = () => {
    navigate("/forgot");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let res = await loginUser({ email, password });
      if (res && res.role === "Mentor") {
        navigate(`/mentdash?email=${email}`);
      } else if (res && res.role === "Student") {
        navigate(`/studdash?email=${email}`);
      } else if (res && res.role === "Admin") {
        navigate(`/admindash?email=${email}`);
      } else {
        alert("Unable to login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="main-container" id="container">
        <div
          className={`form-container ${
            isSignUp ? "sign-up-container" : "sign-in-container"
          }`}
        >
          <form action="#">
            {isSignUp ? (
              <>
                <h1>Create Account</h1>
                <div className="social-container">
                  <a href="#" className="social fcolorful">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social gcolorful">
                    <i
                      className="fab fa-google"
                      onClick={handleGoogleLogin}
                    ></i>
                  </a>
                  <a href="#" className="social lcolorful">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your email for registration</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="custom-select">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="" disabled selected hidden>
                      Choose Role...
                    </option>
                    <option value="Student">Student</option>
                    <option value="Mentor">Mentor</option>
                  </select>
                </div>
                <button
                  className="loginBtn"
                  id="signUpBtn"
                  onClick={createAccount}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h1>Sign in</h1>
                <div className="social-container">
                  <a href="#" className="social fcolorful">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social gcolorful">
                    <i
                      className="fab fa-google"
                      onClick={handleGoogleLogin}
                    ></i>
                  </a>
                  <a href="#" className="social lcolorful">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your account</span>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <a href="#" onClick={handleForgotPassword}>
                  Forgot your password?
                </a>
                <button className="loginBtn" onClick={handleLogin}>
                  Sign In
                </button>
              </>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
