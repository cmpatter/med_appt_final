import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, date, time });
    setName('');
    setPhoneNumber('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h2>Book Appointment with Dr. {doctorName}</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Appointment Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Appointment Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
