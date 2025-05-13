// src/Components/Notification/Notification.js
import React, { useEffect, useState } from 'react';
import './Notification.css'; // Import CSS for Notification styling

const Notification = () => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(true); // State to control visibility of notification
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    // Fetch appointment data from localStorage
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
    
    // Set appointment data if it exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  // Handler to remove notification when appointment is canceled
  const handleCancelAppointment = () => {
    // Remove appointment data from localStorage
    localStorage.removeItem('appointmentData');
    // Hide the notification
    setIsNotificationVisible(false);
  };

  // Show notification only if there's appointment data and the notification should be visible
  if (!isNotificationVisible || !appointmentData) return null;

  return (
    <div className="notification-container">
      <div className="notification-content">
        <h3 className="notification-title">Appointment Notification</h3>
        <p className="notification-message">
          <strong>Patient:</strong> {appointmentData.username} <br />
          <strong>Doctor:</strong> {appointmentData.doctorName} <br />
          <strong>Date:</strong> {appointmentData.date} <br />
          <strong>Time:</strong> {appointmentData.time}
        </p>
        <button className="notification-button" onClick={handleCancelAppointment}>
          Cancel Appointment
        </button>
      </div>
    </div>
  );
};

export default Notification;
