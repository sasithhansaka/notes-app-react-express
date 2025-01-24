import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null); // For storing user data
  const [error, setError] = useState(null); // For handling errors
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!accessToken) {
          setError("Please log in to view your profile.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5002/api/users/currentUser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser(response.data); // Store user data
        console.log(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch user details."
        );
      }
    };

    fetchDetails();
  }, [accessToken]);

  return (
    <div style={{ display: "flex" }}>
      <div className="login-register-page-image"></div>
      <div className="login-register-div" style={{ marginTop: "150px" }}>
        <img  style={{width:'200px',height:'200px',objectFit:'cover',borderRadius:"90%"}} src="./src/images/profile_photo.jpg" />

        <h1>MY ACCOUNT</h1>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : user ? (
          <div>
            <p>First Name: {user.Full_name.split(" ")[0]}</p>
            <p>Last Name: {user.Full_name.split(" ")[1]}</p>
            <p>Email: {user.email}</p>
            <button>NOTIFY ME</button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Profile;
