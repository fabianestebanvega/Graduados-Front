// src/components/JobCard.jsx
import React from 'react';
import '../../App.css'
const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p><strong>Descripción:</strong> {job.description}</p>
      <p><strong>Empresa:</strong> {job.company}</p>
      <p><strong>Ubicación:</strong> {job.location}</p>
    </div>
  );
};

export default JobCard;
