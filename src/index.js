import React from 'react';
import './App.css';

function App() {
  return (
    <div className="mobile-screen">
      {/* Real App Header */}
      <header className="attendx-header">
        <div className="logo-section">
          <span className="logo-icon">🎯</span>
          <h1 className="brand-name">AttendX</h1>
        </div>
        <button className="notif-btn">🔔</button>
      </header>

      <main className="content">
        {/* User Welcome */}
        <div className="welcome-banner">
          <p>Hello, Parshant!</p>
          <h2>Make your mark today</h2>
        </div>

        {/* Quick Stats Grid */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="label">Present</span>
            <span className="value green">22</span>
          </div>
          <div className="stat-card">
            <span className="label">Absent</span>
            <span className="value red">02</span>
          </div>
        </div>

        {/* Action Button Section */}
        <div className="mark-area">
          <button className="main-action-btn">
            <span className="btn-text">MARK ATTENDANCE</span>
            <span className="btn-subtext">Click to scan or mark</span>
          </button>
        </div>

        {/* Activity List */}
        <div className="history-list">
          <h3>Recent History</h3>
          <div className="history-card">
            <div className="date-info">
              <p className="day">Mon</p>
              <p className="num">22</p>
            </div>
            <div className="status-info">
              <p className="title">Main Office</p>
              <p className="time">09:15 AM</p>
            </div>
            <span className="status-tag present">Present</span>
          </div>
        </div>
      </main>

      {/* Floating Bottom Nav */}
      <nav className="bottom-navbar">
        <div className="nav-icon active">🏠</div>
        <div className="nav-icon">📅</div>
        <div className="nav-icon">📊</div>
        <div className="nav-icon">⚙️</div>
      </nav>
    </div>
  );
}

export default App;
