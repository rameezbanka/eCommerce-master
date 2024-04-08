import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const result = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = result?.email;
                if (!userId) {
                    console.log("User is not loggedIn");
                    return;
                } 

                const response = await fetch(`http://localhost:8080/api/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
                }
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            {result?.email ? (
                userData ? (
                    <div className="user-details">
                        <img className="profile-pic" src={userData.profilePic} alt="Profile Pic" />
                        <p>First Name: {userData.firstName}</p>
                        <p>Last Name: {userData.lastName}</p>
                        <p>Email: {userData.email}</p>
                        {/* Add other user details as needed */}
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )
            ) : (
                <p>Please login first.</p>
            )}
        </div>
    );
};

export default ProfilePage;
