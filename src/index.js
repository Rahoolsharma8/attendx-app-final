import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

function App() {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [userName, setUserName] = useState("Parshant");

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-content">
          <h1>AttendX</h1>
          <p className="subtitle">{date}</p>
        </div>
        <div className="profile-circle">{userName.charAt(0)}</div>
      </header>

      <main className="main-content">
        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <span>Total Days</span>
            <h2>24</h2>
          </div>
          <div className="stat-card green">
            <span>Present</span>
            <h2>20</h2>
          </div>
          <div className="stat-card red">
            <span>Absent</span>
            <h2>4</h2>
          </div>
        </div>

        {/* Action Card */}
        <div className="card attendance-card">
          <h3>Daily Attendance</h3>
          <p>Mark your status for today</p>
          <div className="button-group">
            <button className="btn-primary">Present</button>
            <button className="btn-outline">Absent</button>
          </div>
        </div>

        {/* Recent History */}
        <div className="history-section">
          <h3>Recent History</h3>
          <div className="history-item">
            <div className="date-box">21 Feb</div>
            <div className="status present">Present</div>
          </div>
          <div className="history-item">
            <div className="date-box">20 Feb</div>
            <div className="status absent">Absent</div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button className="nav-item active">🏠 Home</button>
        <button className="nav-item">📊 Stats</button>
        <button className="nav-item">⚙️ Settings</button>
      </nav>
    </div>
  );
}

export default App;
