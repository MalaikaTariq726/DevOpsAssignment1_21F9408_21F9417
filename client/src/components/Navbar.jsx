import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

function Navbar() {
  const location = useLocation();

  const hideLogoutRoute = ["/", "/login", "/signup"];

  const hideLogout = hideLogoutRoute.includes(location.pathname);

  const navigate = useNavigate();

  const handleNavig = (path) => {
    if (hideLogout) {
      alert("Login first!");
      navigate("/login");
    } else {
      navigate(path);
    }
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">FAST-NU Book Shop</span>
      </div>
      <div className="navbar-right">
        <div onClick={() => handleNavig("/books")} className="navbar-link">
          Books
        </div>
        <div onClick={() => handleNavig("/students")} className="navbar-link">
          Students
        </div>
        <div onClick={() => handleNavig("/addbook")} className="navbar-link">
          Add Book
        </div>
        <div onClick={() => handleNavig("/addstudent")} className="navbar-link">
          Add Student
        </div>

        {!hideLogout && (
          <Link to="/" className="navbar-link">
              Logout
            </Link>
        )}
        {hideLogout && (
          <>
            <Link to="/" className="navbar-link">
              Dashboard
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
export default Navbar;
