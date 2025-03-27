import React from "react";
import styles from "./LoginPage.module.css";
import LoginComponent from "../components/LoginPage/loginComponent";

function LoginPage() {
  return (
    <div style={{ display: "flex" }}>
      <div className={styles.brandContainer}></div>
      <div className={styles.loginComponent}>
       <LoginComponent/>
      </div>
    </div>
  );
}

export default LoginPage;
