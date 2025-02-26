import { useState, useEffect } from 'react';
import React from "react";
import { NavLink,useLocation } from "react-router-dom";
import "../CSS/navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    setShowNavbar(!location.pathname.includes('/studdash') && !location.pathname.includes('/mentdash') 
    && !location.pathname.includes('/admindash'));
  }, [location.pathname]);

  if (!showNavbar) {
    return null;
  }
 return (
  
     <nav className="nav">
        <div className="imgLogo"></div>
        <h3 className="heading3">Mento</h3>
       <div
         className={"nav__menu"}
         id="nav-menu"
       >
         <ul className="nav__list">
           <li className="nav__item">
             <NavLink to="/" className="nav__link">
               Home
             </NavLink>
           </li>
           
           <li className="nav__item">
             <NavLink
               to="/about-us"
               className="nav__link"
             >
               About Us
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink
               to="/contact"
               className="nav__link"
             >
              Contact 
             </NavLink>
           </li>
          
           <li className="nav__item">
             <NavLink to="/signin" className="nav__link">
               Sign In
             </NavLink>
           </li>
         </ul>
        
       </div>

     </nav>
 );
};

export default Navbar;