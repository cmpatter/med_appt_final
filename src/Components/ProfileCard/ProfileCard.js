import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import ReportsLayout from "../ReportsLayout/ReportsLayout";
import "./ProfileCard.css";

const ProfileCard = ({ onProfileUpdate }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Email": email,
        },
      });
      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails({
          name: user.name || '',
          phone: user.phone || '',
          email: user.email || ''
        });
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile Updated Successfully!");
        if (onProfileUpdate && typeof onProfileUpdate === 'function') {
          onProfileUpdate(updatedDetails.name); // Notify App.js of the profile update
        }
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEditMode = (e) => {
    e.stopPropagation();
    setEditMode(prevEditMode => !prevEditMode);
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const handleShowReports = () => {
    navigate('/reports'); // Navigate to the ReportsLayout page
  };

  return (
    <div className="profile-card">
      <img
        src="https://via.placeholder.com/80"
        alt="Profile"
        className="profile-pic"
      />
      <h3>Your Profile</h3>
      {editMode ? (
        <form onSubmit={handleSubmit} onClick={handleFormClick}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              disabled
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={toggleEditMode}>Cancel</button>
        </form>
      ) : (
        <div className="profile-details">
          <p><b>Name:</b> {userDetails.name}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          <p><b>Email:</b> {userDetails.email}</p>
          <div>
            <button type="button" onClick={toggleEditMode}>
              Edit
            </button>
            <button type="button" onClick={handleShowReports}>
              Show Reports
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
