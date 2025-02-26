import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/forgotPassword.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useAuth } from "../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setPasswordsMatch(confirmPasswordValue === password);
  };

  const handleForgotPassword = () => {
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        forgotPassword({ password, email });
        navigate("/signin");
      } else {
        setPasswordsMatch(false);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      <div className="forgotpasscontainer" id="forgotpasscontainer">
        <form action="#" className="forgotpassSelectForm">
          <>
            <h1 className="forgotpassheading">Forgot Password</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <span className="passwordMismatch">{passwordsMatch ? null : "Passwords do not match"}</span>
            <button
              className="setForgotpassBtn"
              id="signUpBtn"
              onClick={handleForgotPassword}
            >
              Done
            </button>
          </>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;