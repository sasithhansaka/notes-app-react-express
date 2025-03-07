import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Addnote.css";

function Add_note() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);

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
        setLoading(false);
      } catch (err) {
        const errorMessage = err.response
          ? err.response.data.message
          : "An error occurred";
        setError(errorMessage);
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

  const Addnote = async (event) => {

    if (!user) {
      alert("User not logged in yet");
      return;
    }

    const data = {
      title,
      content,
      userId: user.id,
    };

    try {
      await axios.post("http://localhost:5002/api/Notes/add-note", data);
      await sendEmail();
      console("Note added successfully and email sent!");
      setTitle("");
      setContent("");
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  const sendEmail = async () => {
    if (!user) {
      alert("Please login");
      return;
    }

    const data = {
      to: user.email,
      noteTitle: title,
      noteContent: content,
    };

    try {
      const response = await axios.post(
        "http://localhost:5002/api/emails/send-email",
        data
      );
      console.log("Email sent successfully");
      console.log(response.data);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <form onSubmit={Addnote} className="add-note-form">
          <p>ADD YOUR NOTE</p>
          <label>TITLE</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="ADD TITLE HERE"
            required
          />
          <label>CONTENT</label>
          <textarea
            placeholder="Add more content here..."
            onChange={handleContentChange}
            value={content}
            rows="5"
            cols="30"
            required
          ></textarea>
          <button type="submit">ADD NOTE</button>
        </form>
      )}
    </div>
  );
}

export default Add_note;
