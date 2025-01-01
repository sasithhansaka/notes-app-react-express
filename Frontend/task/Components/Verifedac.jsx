import axios from "axios";
import React, { useEffect, useState } from "react";

function Verifedac() {
  const [user, setUser] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/users/currentUser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        const errorMessage = err.response
          ? err.response.data.message
          : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchDetails();
    } else {
      setError("No access token found. Please log in.");
      setLoading(false);
    }
  }, [accessToken]);

  const submit_to_verified = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("User data is not loaded yet. Please try again.");
      return;
    }

    const data = {
        to:"sasithhansaka285@gmail.com"
    };
    try {
      const response = await axios.post(
        "http://localhost:5002/api/emails/send-email",
        data
      );
    } catch (err) {
      console.error("Error Details:", err);

      const errorMessage = err.response
        ? `Error: ${err.response.data.message}\nStatus Code: ${
            err.response.status
          }\nDetails: ${JSON.stringify(err.response.data, null, 2)}`
        : `An error occurred: ${err.message}`;

      alert(errorMessage);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/emails/verify-code', {
        email:user.email,
        code,
      });
      alert('Verification successful!');
    } catch (err) {
      const errorMessage = err.response
        ? `Error: ${err.response.data.message}\nStatus Code: ${
            err.response.status
          }\nDetails: ${JSON.stringify(err.response.data, null, 2)}`
        : `An error occurred: ${err.message}`;

      alert(errorMessage);
    }
  };

  return (
    <div>
      <form onClick={submit_to_verified}>
        <button>verify</button>
      </form>
      <div>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={verifyCode}>Verify Code</button>
      </div>
    </div>
  );
}

export default Verifedac;
