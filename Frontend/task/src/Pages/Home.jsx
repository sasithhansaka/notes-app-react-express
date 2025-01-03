import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_note from "../../Components/Add_note";
import Verifedac from "../../Components/verifedac";
import Navbar from "../../Components/navbar";
import "./Home.css";

function Home() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showPopupProfile, setShowPopupProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);

  const handleProfileClick = () => {
    setShowPopupProfile(!showPopupProfile);
  };

  const handleAddNoteClick = () => {
    setShowAddNotePopup(true);
  };

  const handleClosePopup = () => {
    setShowAddNotePopup(false);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseNotePopup = () => {
    setSelectedNote(null);
  };

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
      console.log(user.id);
      if (!user) return;

      const data = { userId: user.id };

      try {
        const response = await axios.post(
          "http://localhost:5002/api/Notes/get-notes",
          data
        );
        setNotes(response.data.data);
      } catch (err) {
        const errorMessage = err.response
          ? err.response.data.message
          : "An error occurred";
      }
    };

    fetchNotes();
  }, [user]);

  const handleDeleteNote = async (noteId) => {
    if (!user) {
      alert("User data is not loaded.");
      return;
    }

    console.log("Deleting note with User ID:", user.id, "Note ID:", noteId);

    try {
      const response = await axios.delete(
        "http://localhost:5002/api/Notes/delete-note",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            userId: user.id,
            noteId: noteId,
          },
        }
      );

      alert("Note deleted successfully!");
      setNotes(notes.filter((note) => note._id !== noteId));
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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <Navbar onProfileClick={handleProfileClick} />

          {showPopupProfile && (
            <div className="popup">
              <div className="profile-icon">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="profile-icon-img"
                />
              </div>
              <h3>{user.Full_name}</h3>
              <p>{user.email}</p>

              {user.verified === "true" ? (
                <p className="verified-badge">✅ Verified Profile</p>
              ) : (
                <button className="verify-button">
                  <Verifedac />
                </button>
              )}

              <button>logout</button>
            </div>
          )}

          <Add_note />
          {notes.length > 0 ? (
            <ul className="notes-container">
              {notes.map((note) => (
                <li key={note._id} className="note-item">
                  <button onClick={() => handleNoteClick(note)}>tttttt</button>
                  <div style={{ display: "flex" }}>
                    <h3>{note.title}</h3>
                    <button>pin</button>
                  </div>
                  <p>{note.content}</p>
                  {/* <p>{note._id}</p> */}
                  <div style={{ display: "flex" }}>
                    <small>
                      Created: {new Date(note.createdAt).toLocaleString()}
                    </small>
                    <button onClick={() => handleDeleteNote(note._id)}>
                      Delete
                    </button>
                    <button>update</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notes found.</p>
          )}
        </div>
      )}

      <button className="add-note-button" onClick={handleAddNoteClick}>
        Add Note
      </button>

      {showAddNotePopup && (
        <div className="addnote-popup">
          <div className="addnote-popup-content">
            <Add_note />
            <button type="button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {selectedNote && (
        <div className="note-detail-popup">
          <div className="note-detail-popup-content">
            <h3>{selectedNote.title}</h3>
            <p>{selectedNote.content}</p>
            <p>Created: {new Date(selectedNote.createdAt).toLocaleString()}</p>
            <button onClick={handleCloseNotePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
