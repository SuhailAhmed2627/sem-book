import React from "react";
import "../../Assets/CSS/Landing.css";
import { Link } from "react-router-dom";
import { Button } from "../index.js";

const Landing = () => {
   return (
      <>
         <div>Welcome to Sem-Book</div>
         <div className="container">
            <Button
               onClick={function () {
                  window.location.href = "http://localhost:8080/login";
               }}
            >
               Login
            </Button>
            <p>
               Click here to <Link to="/signup">Sign Up</Link>
            </p>
         </div>
      </>
   );
};

export default Landing;
