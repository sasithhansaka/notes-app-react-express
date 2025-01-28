import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_note from "../../Components/Add_note";
import Verifedac from "../../Components/verifedac";
import Navbar from "../../Components/navbar";
import "./Home.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { data } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date());

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const accessToken = sessionStorage.getItem("accessToken");

  const handleProfileClick = () => {
    setShowPopupProfile(!showPopupProfile);
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
        console.log(response.data);
      } catch (err) {
        console.error(
          "Error fetching notes:",
          err.response?.data?.message || err.message
        );
      }
    };

    if (accessToken) {
      fetchDetails();
    } else {
      // setError("Nlease log in.");
      // setLoading(false);
    }
  }, [accessToken]);

  // useEffect(() => {
  //   // const fetchNotes = async () => {
  //   //   console.log(user.id);
  //   //   if (!user) return;
  //   //   const data = { userId: user.id };
  //   //   try {
  //   //     const response = await axios.post(
  //   //       "http://localhost:5002/api/Notes/get-notes",
  //   //       data
  //   //     );
  //   //     setNotes(response.data.data);
  //   //   } catch (err) {
  //   //     const errorMessage = err.response
  //   //       ? err.response.data.message
  //   //       : "An error occurred";
  //   //   }
  //   // };
  //   // fetchNotes();
  // }, [user]);

  useEffect(() => {
    const fetchNotes = async () => {
      console.log(user.id);

      if (!user) {
        alert("login");
        return;
      }
      const data = { userId: user.id };

      try {
        const response = await axios.post(
          "http://localhost:5002/api/Notes/get-notes",
          data
        );

        setNotes(response.data.data);
      } catch (err) {
        console.error(
          "Error fetching notes:",
          err.response?.data?.message || err.message
        );
      }
    };

    fetchNotes();
  }, [user]);

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate(); // Get days in the current month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the first day of the month
    const daysArray = Array.from(
      { length: daysInCurrentMonth },
      (_, i) => i + 1
    );

    setDaysInMonth(daysArray);
    setMonthName(currentDate.toLocaleString("default", { month: "long" }));

    // Add empty days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.unshift(null); // Null means empty space
    }
  }, [currentDate]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDeleteNote = async (noteid) => {
    if (!noteid || !user.id) {
      console.log("userid ,notid not added");
    }

    const data = {
      noteId: noteid,
      userId: user.id,
    };

    try {
      console.log(data);
      const response = await axios.delete(
        "http://localhost:5002/api/Notes/delete-note",
        { data }
      );

      console.log("note deleted", response.data);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteid));
    } catch (err) {
      console.error(
        "Error fetching notes:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div>
      <Navbar onProfileClick={handleProfileClick} />

      {/* 
      <button className="add-note-button" onClick={handleAddNoteClick}>
      </button> */}

      <div>
        <div className="header-container">
          <div className="note-advertisement-div">
            <div className="manage-disc">
              <h3>MANAGE YOUR NOTE APP </h3>
              <p>
                Manage Your Notes App is a versatile and easy-to-use tool
                designed for users who want to organize, store, and access their
                personal notes efficiently,Create and edit notes. Whether you're
                jotting down ideas, managing a to-do list, or keeping track of
                personal or professional information.
              </p>
            </div>
            <div className="manage-advertisement-note">
              <img src="./src/images/ozee.webp" />
              <h4>MANAGE YOUR NOTE APP</h4>
              <div className="hr-div"></div>

              <p>
                fp is a versatile and easy-to-use tool designed for users who
                want to organize, store,
              </p>

              <p>#tive #tie #tiy </p>
            </div>
          </div>
          <div className="note-add-calender-div">
            <div style={{ display: "flex", gap: "5px" }}>
              <div className="note-add">
                <p>ADD NOTE</p>
              </div>
              <div className="note-add">
                <p>ADD NOTE</p>
              </div>
              <div className="note-add">
                <p>ADD NOTE</p>
              </div>
            </div>

            <div className="note-calender-div">
              <div className="calendar-container">
                <div className="calendar-header">
                  <button onClick={goToPreviousMonth}>&lt;</button>
                  <h2>
                    {monthName} {currentDate.getFullYear()}
                  </h2>
                  <button onClick={goToNextMonth}>&gt;</button>
                </div>
                <div className="calendar-body">
                  <div className="calendar-weekdays">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  <div className="calendar-days">
                    {daysInMonth.map((day, index) => (
                      <div
                        key={index}
                        className={`calendar-day ${day ? "" : "empty"}`}
                      >
                        {day || ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <Add_note /> */}
            </div>
          </div>
        </div>

        <h2 className="Note-title">MY NOTES</h2>
      </div>
      {notes.length > 0 ? (
        <ul className="notes-container">
          {notes.map((note) => (
            <li key={note._id} className="note-item">
              <div style={{ display: "flex", gap: "170px" }}>
                <small>
                  {new Date(note.createdAt).toLocaleDateString("en-US", {
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
                  {new Date(note.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  {new Date(note.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </small>

                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="delete-button"
                >
                  <i class="fa-regular fa-trash-can"></i>{" "}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}

export default Home;
