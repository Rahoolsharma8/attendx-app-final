import React from 'react';
import './index.css'; // Hum sirf index.css use karenge

function App() {
  return (
    <div className="mobile-screen">
      <header className="attendx-header">
        <div className="logo-section">
          <span className="logo-icon">🎯</span>
          <h1 className="brand-name">AttendX</h1>
        </div>
      </header>

      <main className="content">
        <div className="welcome-banner">
          <p>Hello, Parshant!</p>
          <h2>Make your mark today</h2>
        </div>

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

        <div className="mark-area">
          <button className="main-action-btn">
            <span className="btn-text">MARK ATTENDANCE</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
