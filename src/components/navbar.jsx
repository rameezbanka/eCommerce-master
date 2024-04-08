import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./navbar.css";
import LoginModal from "../pages/login/Login";
import RegisterModal from "../pages/register/Register";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const Navbar = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    

    useEffect(() => {
        
        const userData = localStorage.getItem('userData');
        if (userData) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (isLoginModalOpen || isRegistrationModalOpen) &&
                !event.target.closest(".header-modal-content") &&
                !event.target.classList.contains("login")
            ) {
                setIsLoginModalOpen(false);
                setIsRegistrationModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isLoginModalOpen, isRegistrationModalOpen]);

    const loginHandler = () => {
        setIsLoginModalOpen(true);
        setIsRegistrationModalOpen(false);
    };

    const registrationHandler = () => {
        setIsLoginModalOpen(false);
        setIsRegistrationModalOpen(true);
    };

    const modalCloseHandler = () => {
        setIsLoginModalOpen(false);
        setIsRegistrationModalOpen(false);
    };

    const handleLogOut = async() => {
        try {
            const response = await fetch("http://localhost:8080/api/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
            
              body: JSON.stringify({
                
              })
            });
      
            if (response.ok) {
              localStorage.removeItem('userData');
              window.location.href = '/';
            } else {
              console.error("Logout failed");
            }
          } catch (error) {
            console.error("Error logging out:", error);
          }
        setIsLoggedIn(false); 
        
    };

    

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="navbar">
            <div className="links left">
                <Link to="/"> Shop </Link>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange}></input>
                <SearchIcon />
            </div>
            <div className="links right">
                {isLoggedIn ? (
                    <button className="login" onClick={handleLogOut}>Logout</button>
                ) : (
                    <button className="login" onClick={loginHandler}>Login</button>
                )}
                {isLoggedIn && (
                    <Link to="/cart">
                    <AddShoppingCartIcon />
                </Link>
                )}
                {isLoggedIn && (
                    <Link to = "profile">
                        <AccountCircleIcon />
                    </Link>
                )
                }
            </div>
            {(isLoginModalOpen || isRegistrationModalOpen) && (
                <div className="header-modal">
                    <div className="header-modal-content">
                        <div className="header-auth-container">
                            <div className="header-auth-options">
                                {isLoggedIn ? (
                                    <div>
                                        <button className="button2" onClick={handleLogOut}>Logout</button>
                                    </div>
                                ) : (
                                    <button className="button2" onClick={loginHandler}>Login</button>
                                )}
                                <button className="button2" onClick={registrationHandler}>Register</button>
                            </div>
                        </div>
                        {isLoginModalOpen && <LoginModal onClose={modalCloseHandler} onSuccess={() => setIsLoggedIn(true)} />}
                        {isRegistrationModalOpen && <RegisterModal onClose={modalCloseHandler} />}
                    </div>
                </div>
            )}

          
        </div>
    );
};