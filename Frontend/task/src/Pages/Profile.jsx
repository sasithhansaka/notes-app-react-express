import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/users/currentUser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch user details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []); 

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
        { withCredentials: true }
      );
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
      <div className="login-register-page-image"></div>
      <div className="login-register-div" style={{ marginTop: "150px" }}>
        <img
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "90%",
          }}
          src="./src/images/profile_photo.jpg"
          alt="Profile"
        />

        <h1>MY ACCOUNT</h1>

        {loading ? (
          <p>Loading profile information...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : user ? (
          <div>
            <p>Full_name: {user.Full_name?.split(" ")[0] || "N/A"}</p>
            {/* <p>Last Name: {user.Full_name?.split(" ")[1] || "N/A"}</p> */}
            <p>Email: {user.email || "N/A"}</p>
            <button onClick={GotoHomepage}>HOME</button>
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