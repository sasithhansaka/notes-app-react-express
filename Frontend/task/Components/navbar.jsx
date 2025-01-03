import React from 'react';
import './Navbar.css';

function Navbar({ onProfileClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Notes App</div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search Notes"
          className="navbar-search"
        />

        <div className="navbar-profile" onClick={onProfileClick}>
          <img
            src="https://via.placeholder.com/30"
            alt="User Profile"
            className="navbar-profile-img"
          />
        </div>

        <button className="navbar-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
