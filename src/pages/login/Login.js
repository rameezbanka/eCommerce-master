import React, { useState } from "react";
import "./login.css";

const Login = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  
  

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      console.log("Response:", response);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      if (response.ok) {
        localStorage.setItem('userData', JSON.stringify(data));
        onClose();
        onSuccess();
        console.log(localStorage.getItem('userData'));  

      }else if(response.status===401){
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
 
  
  return (
    <div className="login-container">
      <div className="input-container">
        <label className="input-label">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your email@example.com"
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label className="input-label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="**********"
          className="input-field"
        />
      </div>
      <div className="error-message">{errorMessage}</div>
      <div className="login-button-container">
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;


