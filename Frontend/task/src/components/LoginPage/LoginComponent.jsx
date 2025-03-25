import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginComponent.module.css";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const goToRegister = () => {
    navigate("/register");
  };

  const loginUser = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        data,
        { withCredentials: true }
      );

      console.log("Full Response:", response);

      const accessToken = response.data.data?.accessToken;
      const refreshToken = response.data.data?.refreshToken;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      alert("Successfully Logged In");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.loginComponent}>
      <h1>Note app</h1>
      <h3>Login</h3>
      <p>Login to your Note account.</p>
      <label>Email</label>

      <form onSubmit={loginUser}>
        <input
          type="text"
          value={email}
          onChange={handleEmail}
          placeholder="Your email address"
        ></input>
        <br></br>
        <label>Password</label>
        <br></br>

        <input
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Your password"
        ></input>
        <br></br>
        <button type="submit">Login</button>
      </form>

      <p style={{ cursor: "pointer" }} onClick={goToRegister}>
        Don't have an account? Go to register
      </p>
    </div>
  );
}

export default LoginComponent;
