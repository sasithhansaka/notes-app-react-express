import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterComponent.module.css";

function RegisterComponent() {
  const [Full_name, Set_FullName] = useState("");
  const [email, set_email] = useState("");
  const [password, Set_password] = useState("");

  const navigate = useNavigate();

  const Handle_FullName = (event) => Set_FullName(event.target.value);
  const Handle_email = (event) => set_email(event.target.value);
  const Handle_password = (event) => Set_password(event.target.value);

  const Gotoregister = () => {
    navigate("/");
  };

  const Handleregister = async (event) => {
    if (!Full_name || !email || !password) {
      alert("please fill all the fields");
      return;
    }

    event.preventDefault();
    const data = {
      Full_name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        data,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      alert("Registration successful");

      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.registerComponent}>
      <h1>Note app</h1>
        <h3>Register</h3>
        <p>Register to your Note account.</p>
        <label>Full Name</label>

        <br></br>
        <form onSubmit={Handleregister}>
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
          <p style={{ cursor: "pointer" }} onClick={Gotoregister}>
            Already have a account?Go to login
          </p>
        </form>
    </div>
  );
}

export default RegisterComponent;
