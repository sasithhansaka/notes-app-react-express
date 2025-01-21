import axios from "axios";
import React, { useEffect, useState } from "react";

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
      console.error(
        "Error fetching notes:",
        err.response?.data?.message || err.message
      );
    }
    
  };

  return (
    <div>
      <form onSubmit={Addnote} className="add-note-form">
        <input
          type="text"
          value={title}
          onChange={handle_title}
          placeholder="title"
        ></input>
        <input
          type="text"
          placeholder="content"
          onChange={handle_content}
          value={content}
        ></input>
        <button type="submit">add note</button>
      </form>
    </div>
  );
}

export default Add_note;
