import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from '../ProfileCard/ProfileCard'; // Ensure this path is correct

const Navbar = ({ isLoggedIn, username, setIsLoggedIn, setUsername }) => {
  const [click, setClick] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State for profile dropdown

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("email");
    localStorage.removeItem("doctorData");

    // Remove the reviewFormData from local storage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    });

    setIsLoggedIn(false);
    setUsername("");
  };

  const toggleProfileDropdown = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? "nav__links active" : "nav__links"}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/find-doctor">Find Doctor</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>
        <li className="link">
          <Link to="/instant-consultation">Instant Consultation</Link>
        </li>
        <li className="link">
          <Link to="/reports">Your Reports</Link> {/* Add link to ReportsLayout */}
        </li>
        {isLoggedIn ? (
          <>
            <li className="link welcome-user" onClick={toggleProfileDropdown}>
              <span>Welcome, {username}</span>
              {showProfile && <ProfileCard />} {/* Render ProfileCard on toggle */}
            </li>
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/Sign_Up">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/Login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
