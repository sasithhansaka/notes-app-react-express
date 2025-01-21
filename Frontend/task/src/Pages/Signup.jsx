import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [Full_name, Set_FullName] = useState("");
  const [email, set_email] = useState("");
  const [password, Set_password] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const Handle_FullName = (event) => Set_FullName(event.target.value);
  const Handle_email = (event) => set_email(event.target.value);
  const Handle_password = (event) => Set_password(event.target.value);

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
      const errorMessage = err.response ? err.response.data.message : "An error occurred";
      alert(errorMessage); 
    }
  };

  return (
    <div>
      <form onSubmit={HandleLogin}>
        <input
          type="text"
          onChange={Handle_FullName}
          value={Full_name}
          placeholder="Full name"
        />
        <input
          type="email"
          onChange={Handle_email}
          value={email}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={Handle_password}
          value={password}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>

   
    </div>
  );
}

export default Signup;
