import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/current-user",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.data);
        console.log(user.Full_name);
        setError(null);
      } catch (err) {
        console.error(
          "Error fetching notes:",
          err.response?.data?.message || err.message
        );
      }
    };

    fetchDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/logout", {
        withCredentials: true,
      });
      alert("Logged out successfully");
      navigate("/");
    } catch (err) {
      alert(err.response ? err.response.data.message : "Error logging out");
    }
  };

  const GotoHomepage = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={styles.profileBanner}></div>
      <div className={styles.profileDetails} style={{ marginTop: "150px" }}>
        <i class="fa-solid fa-user-tie"></i>

        <h1>MY PROFILE</h1>

        {error ? (
          <p>Error: {error}</p>
        ) : user ? (
          <div>
            <p>Name: {user.Full_name || "N/A"}</p>
            <p>Email: {user.email || "N/A"}</p>
            {/* <button onClick={GotoHomepage}>HOME</button> */}
          </div>
        ) : (
          <p>No user information available</p>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
