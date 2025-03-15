import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_note from "../../Components/Add_note";
import Verifedac from "../../Components/verifedac";
import Navbar from "../../Components/navbar";
import "./Home.css";
import "react-calendar/dist/Calendar.css";

function Home() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date());

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");


   // Function to fetch the accessToken and refreshToken from cookies
  //  const getTokenFromCookies = () => {
  //   // Example using 'document.cookie'. Replace with your actual cookie names if needed.
  //   const cookies = document.cookie.split('; ');
  //   let accessToken = '';
  //   let refreshToken = '';
  //   cookies.forEach(cookie => {
  //     if (cookie.startsWith('accessToken=')) {
  //       accessToken = cookie.split('=')[1];
  //     }
  //     if (cookie.startsWith('refreshToken=')) {
  //       refreshToken = cookie.split('=')[1];
  //     }
  //   });
  //   return { accessToken, refreshToken };
  // };





  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // const accessToken = sessionStorage.getItem("accessToken");

  const handleProfileClick = () => {
    setShowPopupProfile(!showPopupProfile);
  };


  useEffect(() => {

    const fetchNotes = async () => {
      console.log(document.cookie);  // To inspect the cookies


      // const { accessToken, refreshToken } = getTokenFromCookies();

      // // Log the tokens to the console
      // console.log("Access Token:", accessToken);
      // console.log("Refresh Token:", refreshToken);

      try {
        const response = await axios.get("http://localhost:3000/api/Notes/get-notes", {
          withCredentials: true, 
        });
    
        setNotes(response.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          console.error("Error fetching notes: Unauthorized user. Please log in.");
        } else if (err.response?.status === 403) {
          console.error("Error fetching notes: Forbidden access.");
        } else {
          console.error("Error fetching notes:", err.response?.data?.message || err.message);
        }
      }
    };
    
    fetchNotes();
    
  });
  

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysArray = Array.from(
      { length: daysInCurrentMonth },
      (_, i) => i + 1
    );

    setDaysInMonth(daysArray);
    setMonthName(currentDate.toLocaleString("default", { month: "long" }));

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.unshift(null);
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

      
      {/* <button className="add-note-button" onClick={handleAddNoteClick}>
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
                Manage Your Notes App is a versatile and easy-to-use tool
                designed for users who want to organize, store, and access their
                personal notes efficiently,Create and edit notes.
              </p>

              <h5>#tive #tie #tiy </h5>
            </div>
          </div>
          <div className="note-add-calender-div">
            <div style={{ display: "flex", gap: "5px" }}>
              <div className="note-add">
                <p>ADD NOTE</p>
              </div>
              <div
                className="note-add"
                style={{ backgroundColor: "#89eb9071" }}
              >
                <p>ADD NOTE</p>
              </div>
              <div className="note-add">
                <p>ADD NOTE</p>
              </div>
            </div>

            <div className="note-calender-div">
              <Add_note />
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
          <img
            style={{
              objectFit: "contain",
              width: "50px",
              height: "40px",
              marginTop: "90px",
            }}
            src="./src/images/Lost and Found.png"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
