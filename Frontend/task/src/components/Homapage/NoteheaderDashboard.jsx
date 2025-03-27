import React from "react";
import styles from "./NoteheaderDashboard.module.css";
import NoteExampleDesign from "./NoteExampleDesign";

function NoteheaderDashboard({ label1, label2 }) {
  return (
    <div className={styles.dashboardContent}>
      <div className={styles.dashboardDescription}>
        <h3>{label1}</h3>
        <p>{label2}</p>
      </div>
      <div className="noteExample">
      <NoteExampleDesign
        imageSrc="./src/images/ozee.webp"
        title="MANAGE YOUR NOTE APP"
        description=" Manage Your Notes App is a versatile and easy-to-use tool
                designed for users who want to organize, store, and access their
                personal notes efficiently,Create and edit notes."
        tags="#tive #tie #tiy"
      />
      </div>
    </div>
  );
}

export default NoteheaderDashboard;
