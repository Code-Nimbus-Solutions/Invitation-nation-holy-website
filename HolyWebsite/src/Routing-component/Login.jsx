import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <button className="highlights-btn">Book Tickets Now</button>
      </Link>
    </>
  );
};

export default Login;
