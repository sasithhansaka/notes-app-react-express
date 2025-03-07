import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  
  const [Full_name, Set_FullName] = useState("");
  const [email, set_email] = useState("");
  const [password, Set_password] = useState("");

  const navigate = useNavigate()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const Handle_FullName = (event) => Set_FullName(event.target.value);
  const Handle_email = (event) => set_email(event.target.value);
  const Handle_password = (event) => Set_password(event.target.value);

  const Gotoregister= ()=>{
    navigate("/")
  }

  const HandleLogin = async (event) => {
    event.preventDefault();
    const data = {
      Full_name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5002/api/users/register",
        data
      );

      console.log(response.data);
      alert("successs");
    } catch (err) {
      console.error(
        "Error fetching notes:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="login-register-page-image"></div>
      <div className="login-register-div">
        <h1>Note app</h1>
        <h3>Register</h3>
        <p>Register to your Note account.</p>
        <label>Full Name</label>

        <br></br>
        <form onSubmit={HandleLogin}>
          <input
            type="text"
            onChange={Handle_FullName}
            value={Full_name}
            placeholder="Your Full Name"
          />
          <br></br>

          <label>Email</label>
          <br></br>

          <input
            type="email"
            onChange={Handle_email}
            value={email}
            placeholder="Your email address"
          />
          <br></br>
          
          <label>Password</label>
          <br></br>

          <input
            type="password"
            onChange={Handle_password}
            value={password}
            placeholder="Your Password"
          />
          <br></br>

          <button type="submit">Register</button>
          <p style={{cursor:'pointer'}} onClick={Gotoregister}>Already have a account?Go to login</p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
