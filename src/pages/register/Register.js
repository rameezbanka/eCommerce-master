import React, { useState } from "react";
import './register.css';

const Register = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }
  
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleRegister = () => {
    fetch("http://localhost:8080/api/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
      console.log(response);
      if (response.ok) {
        console.log("Registration successful");
        onClose();
      } else {
        console.log("Registration failed");
      }
    })
    .catch(error => {
      console.error("Error during registration:", error);
    });
  }

  return (
    <div className="unique-tab-content">
      <div className="unique-input-container">
        <div className="unique-input">
          <label htmlFor="firstName" className="unique-label">First Name*</label>
          <input id="firstName" value={firstName} onChange={handleFirstNameChange} />
          
          <label htmlFor="lastName" className="unique-label">Last Name*</label>
          <input id="lastName" value={lastName} onChange={handleLastNameChange} />
          
          <label htmlFor="email" className="unique-label">Email*</label>
          <input id="email" type="email" value={email} onChange={handleEmailChange} />
          
          <label htmlFor="password" className="unique-label">Password*</label>
          <input id="password" type="password" value={password} onChange={handlePasswordChange} />
          
          <div className="unique-login-button-container">
            <button className="unique-register-button" onClick={handleRegister}>
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
