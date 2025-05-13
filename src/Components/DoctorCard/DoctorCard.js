import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';
import './DoctorCard.css';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
  };

  // Inline SVG for placeholder
  const svgPlaceholder = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `;

  return (
    <div className="doctor-card">
      {profilePic ? (
        <img src={profilePic} alt={`${name}'s profile`} className="profile-pic" />
      ) : (
        <div
          className="profile-pic"
          dangerouslySetInnerHTML={{ __html: svgPlaceholder }}
        />
      )}
      <h3>{name}</h3>
      <p>{speciality}</p>
      <p>{experience} years experience</p>
      <p>Ratings: {ratings}</p>

      {/* Booking/Cancellation Button */}
      <div className="doctor-card-options-container">
        <Popup
          open={showModal}
          onClose={() => setShowModal(false)}
          modal
        >
          <div className="modal-content">
            {appointments.length > 0 ? (
              <>
                <h3>Appointment Booked!</h3>
                {appointments.map((appointment) => (
                  <div className="appointment-info" key={appointment.id}>
                    <p>Name: {appointment.name}</p>
                    <p>Phone Number: {appointment.phoneNumber}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                    <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                  </div>
                ))}
              </>
            ) : (
              <AppointmentForm 
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}
              />
            )}
          </div>
        </Popup>

        <button 
          className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
          onClick={handleBooking}
        >
          {appointments.length > 0 ? (
            <div>Cancel Appointment</div>
          ) : (
            <div>Book Appointment</div>
          )}
          <div>No Booking Fee</div>
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
