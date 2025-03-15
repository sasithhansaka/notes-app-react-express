import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Addnote.css";

function Add_note() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);

  const AddNote = async (event) => {
  
    const data = {
      title,
      content,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Notes/add-note",
        data,
        { withCredentials: true } 
      );
  
      console.log("Note added successfully:", response.data);
      
      console.log("Email sent successfully!");
  
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error adding note:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "An error occurred while adding the note.");
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
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <form onSubmit={AddNote} className="add-note-form">
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
