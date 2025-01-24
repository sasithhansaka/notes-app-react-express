import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Addnote.css";

function Add_note() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");

  const [title, Set_title] = useState("");
  const [content, set_content] = useState("");

  const handle_title = (event) => Set_title(event.target.value);
  const handle_content = (event) => set_content(event.target.value);

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
      }
    };

    if (accessToken) {
      fetchDetails();
    } else {
      setError("No access token found. Please log in.");
      setLoading(false);
    }
  }, [accessToken]);

  const Addnote = async (event) => {
    if (!user) {
      console.log("user not login yet");
      return;
    }

    const data = {
      title,
      content,
      userId: user.id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5002/api/Notes/add-note",
        data
      );

      alert("note added ");
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={Addnote} className="add-note-form">
        <p>ADD YOUR NOTE</p>
        <label>TITLE</label>
        <input
          type="text"
          value={title}
          onChange={handle_title}
          placeholder="ADD TITLE HERE"
        ></input>
        <label>CONTENT</label>
        <textarea
          placeholder="Add more content here..."
          onChange={handle_content}
          value={content}
          rows="5" // Adjust the rows for the height of the textarea
          cols="30" // Optional: adjust the width
        ></textarea>
        <button type="submit">ADD NOTE</button>
      </form>
    </div>
  );
}

export default Add_note;
