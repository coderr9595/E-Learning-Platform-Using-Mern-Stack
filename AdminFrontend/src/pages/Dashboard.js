import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/add-course">Add Course</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
