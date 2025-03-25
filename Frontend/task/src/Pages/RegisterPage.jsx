import React from "react";
import styles  from "./RegisterPage.module.css";
import RegisterComponent from "../components/RegisterPage/RegisterComponent";

function Signup() {

  return (
    <div style={{ display: "flex" }}>
      <div className={styles.brandContainer}>

      </div>
      <div className={styles.registerComponent}>
        <RegisterComponent/>
      </div>
    </div>
  );
}

export default Signup;
