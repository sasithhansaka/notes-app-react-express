import React from "react";
import "./NoteList.css";

function NoteList({ notes, handleDeleteNote }) {
  return (
    <div>
      {notes.length > 0 ? (
        <ul className="notes-container">
          {notes.map((note) => (
            <li key={note._id} className="note-item">
              <div style={{ display: "flex", gap: "170px" }}>
                <small>
                  {new Date(note.createdOn).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                  })}
                </small>
                <div>
                  <button className="pin-button">
                    <i class="fa-solid fa-thumbtack"></i>
                  </button>
                  <button className="edit-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
              <div>
                <h3>{note.title}</h3>
              </div>
              <div className="hr-div"></div>
              <p>{note.content}</p>

              <div className="div-time">
                <small>
                  {new Date(note.createdOn).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  {new Date(note.createdOn).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </small>

                <button
                  onClick={() => handleDeleteNote(note._id)} // Pass the note id here
                  className="delete-button"
                >
                  <i class="fa-regular fa-trash-can"></i>{" "}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ display: "flex" }}>
          <p
            style={{
              color: "white",
              marginLeft: "600px",
              marginTop: "100px",
              marginRight: "20px",
              marginBottom: "100px",
            }}
          >
            NO NOTES FOUND.
          </p>
          {/* <img
            style={{
              objectFit: "contain",
              width: "50px",
              height: "40px",
              marginTop: "90px",
            }}
            src="./src/images/Lost and Found.png"
          /> */}
        </div>
      )}
    </div>
  );
}

export default NoteList;
