import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");

  const onProfileClick = () => {
    navigate("/profile");
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">Notes App</div>

      <div className="navbar-right">
        {/* <div class="navbar-search-container">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search Notes" class="navbar-search" />
        </div> */}

        <div className="navbar-profile" onClick={onProfileClick}>
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
