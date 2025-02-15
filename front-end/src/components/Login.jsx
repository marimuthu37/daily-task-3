import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const validUsers = [{ username: "user", password: "pass" }];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const isValid = validUsers.some(user => user.username === username && user.password === password);
    if (isValid) {
      navigate("/student-form");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;