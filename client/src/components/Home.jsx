// eslint-disable-next-line no-unused-vars
import "../CSS/Home.css";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

function Home () {
useEffect(()=>{
    Cookies.remove("token");
}, []);
    return(
        <div className="hero">
        <div className="hero-content">
            <h1 className = "hero-text">Book Shop CS Dept.</h1>
            <p className = "hero-description">
                Browse the collection of our best top interesting Programming Books.
                you will definilty find what you are looking for.
            </p>
        </div>
        <div className="hero-image">

        </div>
    </div>
    )
}
export default Home;