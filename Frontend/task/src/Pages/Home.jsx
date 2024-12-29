import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_note from "../../Components/Add_note";
import Verifedac from "../../Components/verifedac";

function Home() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
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

  useEffect(() => {
    const fetchNotes = async () => {
      
        const data = { userId: user.id };

        try {
          const response = await axios.post(
            "http://localhost:5002/api/Notes/get-notes",
            data,);
          setNotes(response.data); 
        } catch (err) {
          const errorMessage = err.response
            ? err.response.data.message
            : "An error occurred";
          setError(errorMessage);
        }
      
    };

      fetchNotes();
  }, [user]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <Add_note />
          <Verifedac/>
          <h2>My Notes</h2>
          {notes.length > 0 ? (
            <ul>
              {notes.map((note) => (
                <li key={note._id}>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <small>
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notes found.</p>
          )}
        </div>
      )}
      
    </div>
  );
}

export default Home;
