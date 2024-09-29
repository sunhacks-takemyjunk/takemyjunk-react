import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button className="dashboard-button" onClick={() => navigate('/buy')}>Buy</button>
      <button className="dashboard-button" onClick={() => navigate('/sell')}>Sell</button>
    </div>
  );
};

export default Dashboard;
