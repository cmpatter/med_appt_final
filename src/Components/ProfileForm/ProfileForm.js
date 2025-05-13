import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileForm.css';

const ProfileForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [updatedDetails, setUpdatedDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editMode, setEditMode] = useState(false);
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

      if (!authtoken) {
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
        setUpdatedDetails(user);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
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

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile Updated Successfully!");
        navigate("/"); // Ensure this route change does not interfere
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              onChange={handleInputChange}
              disabled // Email field is disabled
            />
          </label>
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
          <button type="submit">Save</button>
          <button type="button" className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Welcome, {userDetails.name}</h1>
          <p><b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
