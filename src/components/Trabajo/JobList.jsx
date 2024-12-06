// src/components/JobList.jsx
import React from 'react';
import JobCard from './JobCard';
import '../../App.css'

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
