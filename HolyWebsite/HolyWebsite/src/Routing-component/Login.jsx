import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Here you can implement login logic, such as sending username and password to a server
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <button className="highlights-btn">Book Tickets Now</button>
        </Link>
      </div>
    </>
  );
};

export default Login;