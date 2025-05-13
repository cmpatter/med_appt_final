import React, { useState } from 'react';
import DoctorCard from '../DoctorCard/DoctorCard';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import './BookingConsultation.css';

// Sample array of doctors
const doctors = [
  { name: 'Dr. James Brown', speciality: 'Cardiologist', experience: 10, ratings: 4.5, profilePic: null },
  { name: 'Dr. Jameson Daniels', speciality: 'Neurologist', experience: 8, ratings: 4.7, profilePic: null },
  { name: 'Dr. Sam Brown', speciality: 'Pediatrician', experience: 15, ratings: 4.8, profilePic: null },
];

const BookingConsultation = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="searchpage-container">
      <FindDoctorSearch onDoctorSelect={handleDoctorSelect} />
      <div className="search-results-container">
        <h2>Available Doctors</h2>
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            name={doctor.name}
            speciality={doctor.speciality}
            experience={doctor.experience}
            ratings={doctor.ratings}
            profilePic={doctor.profilePic}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingConsultation;
