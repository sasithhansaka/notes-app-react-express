import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     try {
  //       if (!accessToken) {
  //         setError("Please log in to view your profile.");
  //         return;
  //       }

  //       const response = await axios.get(
  //         "http://localhost:5002/api/users/currentUser",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       setUser(response.data);
  //       console.log(response.data);
  //       setError(null);
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message || "Failed to fetch user details."
  //       );
  //     }
  //   };

  //   fetchDetails();
  // }, [accessToken]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });
      alert("Logged out successfully");
      navigate("/")
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
        />

        <h1>MY ACCOUNT</h1>
        
          {/* <div>
            <p>First Name: {user.Full_name.split(" ")[0]}</p>
            <p>Last Name: {user.Full_name.split(" ")[1]}</p>
            <p>Email: {user.email}</p>
            <button onClick={GotoHomepage}>HOME</button>
          </div> */}
          <button onClick={handleLogout}></button>

      </div>
    </div>
  );
}

export default Profile;
