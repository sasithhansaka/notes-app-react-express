import React, { useState, useEffect } from "react";
import styles from "./NoteCalender.module.css";

function NoteCalender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.unshift(null);
    }

    setDaysInMonth(daysArray);
    setMonthName(currentDate.toLocaleString("default", { month: "long" }));
    setYear(year);
  }, [currentDate]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>
          {monthName} {year}
        </h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className={styles.calendarGrid}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`${styles.dayCell} ${day ? "" : styles.emptyCell}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteCalender;