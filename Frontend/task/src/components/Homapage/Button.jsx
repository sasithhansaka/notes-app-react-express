import React from "react";
import styles from "./Button.module.css";

function Button({ type, text }) {
  return (
    <div>
      <button className={styles.addNote__button} type={type}>{text}</button>
    </div>
  );
}

export default Button;
