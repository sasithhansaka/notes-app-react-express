import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/HomaPage/Navbar";
import Add_note from "../components/Homapage/Add_note";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "./HomePage.module.css";

import NoteheaderDashboard from "../components/Homapage/NoteheaderDashboard";
import ButtonGroup from "../components/Homapage/ButtonGroup";
import NoteList from "../components/Homapage/NoteList";
import NoteCalender from "../components/Homapage/NoteCalender";



function Home() {
  const [activeComponent, setActiveComponent] = useState("add_note");
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date());

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleProfileClick = () => {
    setShowPopupProfile(!showPopupProfile);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      console.log(document.cookie);

      try {
        const response = await axios.get(
          "http://localhost:3000/api/Notes/get-notes",
          {
            withCredentials: true,
          }
        );

        if (response.data.message === "No note found") {
          return;
        }

        setNotes(response.data.data);
      } catch (err) {
        console.error(
          "Error fetching notes:",
          err.response?.data?.message || err.message
        );
      }
    };

    fetchNotes();
  }, []);

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
    console.log("noteid", noteid);
    if (!noteid) {
      console.log("notid not added");
    }

    const data = {
      noteId: noteid,
    };

    try {
      console.log(data);
      const response = await axios.delete(
        "http://localhost:3000/api/Notes/delete-note",
        {
          data: data,
          withCredentials: true,
        }
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

      <div>
        <div className={styles.headerDashboard}>
          {/* <div className={styles.DashboardContent}> */}
          <NoteheaderDashboard
            label1="MANAGE YOUR NOTE APP "
            label2="Manage Your Notes App is a versatile and easy-to-use tool
                designed for users who want to organize, store, and access their
                personal notes efficiently,Create and edit notes. Whether you're
                jotting down ideas, managing a to-do list, or keeping track of
                personal or professional information."
          />

          <div>
            <ButtonGroup setActiveComponent={setActiveComponent} />
            <div>
              {activeComponent === "add_note" && <Add_note />}

              {activeComponent === "view_calender" && <NoteCalender />}
            </div>
          </div>
        </div>

        <h2 className={styles.Note_title}>MY NOTES</h2>
      </div>
      <NoteList notes={notes} handleDeleteNote={handleDeleteNote} />
    </div>
  );
}

export default Home;
