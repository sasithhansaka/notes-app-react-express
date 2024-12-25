import axios from 'axios';
import React, { useState } from 'react'

function Login() {

  const [email,Set_email]= useState("");
  const [password,Set_password] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


  const handle_email = (event)=> Set_email (event.target.value);
  const Handle_password= (event)=> Set_password(event.target.value);

  const Login_user=async (event)=>{
    event.preventDefault();

    const data={
      email,
      password
    }

    try{
      const response= await axios.post("http://localhost:5002/api/users/login",data);
      console.log(response.data);
      alert("successfully Login");
    }
    catch(err){
      const errorMessage = err.response ? err.response.data.message : "An error occurred";
      alert(errorMessage); 
    }

  }
  return (
    <div>
      <form onSubmit={Login_user}>
        <input type='text'
        value={email}
        onChange={handle_email}
        placeholder='email'>
        </input>

        <input type='text'
        value={password}
        onChange={Handle_password}
        placeholder='password'>
        </input>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
