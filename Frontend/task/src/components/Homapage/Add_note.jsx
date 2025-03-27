import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Addnote.module.css";
import Button from "./Button";

import InputField from "./InputField";

function Add_note() {
  // const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);

  const handleSubmit = async (event) => {
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
      console.error(
        "Error adding note:",
        err.response?.data?.message || err.message
      );
      alert(
        err.response?.data?.message ||
          "An error occurred while adding the note."
      );
    }
  };

  const sendEmail = async () => {
    const data = {
      noteTitle: title,
      noteContent: content,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/emails/send-email",
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
        <form onSubmit={handleSubmit} className={styles.noteAdd_Form}>
          <p>ADD YOUR NOTE</p>
          <label>TITLE</label>
          <InputField
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="ADD TITLE HERE"
          />

          <label>CONTENT</label>

          <InputField
            type="textarea"
            value={content}
            onChange={handleContentChange}
            placeholder="ADD MORE CONTENT HERE...."
          />

        
          <Button type="submit" text="ADD NOTE" />
        </form>
      )}
    </div>
  );
}

export default Add_note;
