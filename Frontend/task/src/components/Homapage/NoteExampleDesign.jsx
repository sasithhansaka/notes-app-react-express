import React from "react";
import styles from "./NoteExample.module.css";

function NoteExampleDesign({ imageSrc, title, description, tags }) {
  return (
    <div className={styles.noteExample}>
      <img src={imageSrc} />
      <h4>{title}</h4>
      <div className="hr-div"></div>
      <p>{description}</p>
      <h5>{tags}</h5>
    </div>
  );
}

export default NoteExampleDesign;
