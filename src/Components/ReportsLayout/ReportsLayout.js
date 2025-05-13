import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  // Assuming report files are named as `report_<serialNumber>.pdf` in the public folder
  const reports = [
    { serialNumber: '001', doctorName: 'Dr. James Brown', speciality: 'Cardiologist' },
    { serialNumber: '002', doctorName: 'Dr. Jameson Daniels', speciality: 'Neurologist' },
    { serialNumber: '003', doctorName: 'Dr. Sam Brown', speciality: 'Pediatrician' },
  ];

  return (
    <div className="reports-layout-wrapper">
      <div className="reports-layout">
        <h2>Your Reports</h2>
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Speciality</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.serialNumber}>
                <td>{report.serialNumber}</td>
                <td>{report.doctorName}</td>
                <td>{report.speciality}</td>
                <td>
                  <a 
                    href={`/reports/report_${report.serialNumber}.pdf`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn view-report"
                  >
                    View Report
                  </a>
                  <a 
                    href={`/reports/report_${report.serialNumber}.pdf`} 
                    download={`report_${report.serialNumber}.pdf`} 
                    className="btn download-report"
                  >
                    Download Report
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsLayout;
