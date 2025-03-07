import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  
  const [email, Set_email] = useState("");
  const [password, Set_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handle_email = (event) => Set_email(event.target.value);
  const Handle_password = (event) => Set_password(event.target.value);

  const Gotoregister= ()=>{
    navigate("/register")
  }

  const Login_user = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5002/api/users/login",
        data
      );

      alert("successfully Login");
      const { accessToken } = response.data;

      sessionStorage.setItem("accessToken", accessToken);
      navigate("/dashboard");

      console.log(accessToken);
      // sessionStorage.setItem("accessToken", accessToken);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="login-register-page-image"></div>
      <div className="login-register-div" style={{marginTop:'150px'}}>
        <h1>Note app</h1>
        <h3>Login</h3>
        <p>Login to your Note account.</p>
        <label>Email</label>
        <form onSubmit={Login_user}>
          <input
            type="text"
            value={email}
            onChange={handle_email}
            placeholder="Your email address"
          ></input>
          <br></br>
          <label>Password</label>
          <br></br>

          <input
            type="text"
            value={password}
            onChange={Handle_password}
            placeholder="Your password"
          ></input>
          <br></br>

          <button type="submit">Login</button>
        </form>
        <p style={{cursor:'pointer'}} onClick={Gotoregister}>Don't have a account?Go to register</p>

      </div>

    </div>
  );
}

export default Login;
