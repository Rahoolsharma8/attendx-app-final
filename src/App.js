import React from 'react';
import './App.css'; // Yeh line ab error nahi degi kyunki aapne file bana li hai

function App() {
  return (
    <div className="mobile-screen">
      {/* Top Header Section */}
      <header className="attendx-header">
        <div className="logo-section">
          <span className="logo-icon">🎯</span>
          <h1 className="brand-name">AttendX</h1>
        </div>
      </header>

      <main className="content">
        {/* Welcome Text */}
        <div className="welcome-banner">
          <p style={{color: '#64748b', margin: 0}}>Hello, Parshant!</p>
          <h2>Make your mark today</h2>
        </div>

        {/* Stats Grid */}
        <div className="stats-row">
          <div className="stat-card">
            <span style={{fontSize: '12px', color: '#94a3b8'}}>Present</span>
            <span className="value green">22</span>
          </div>
          <div className="stat-card">
            <span style={{fontSize: '12px', color: '#94a3b8'}}>Absent</span>
            <span className="value red">02</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mark-area">
          <button className="main-action-btn">
            MARK ATTENDANCE
          </button>
        </div>

        {/* Simple History Placeholder */}
        <div style={{marginTop: '30px'}}>
          <h4 style={{color: '#1e293b'}}>Recent Activity</h4>
          <div style={{background: 'white', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span>Feb 22, 2026</span>
            <span style={{color: '#10b981', fontWeight: 'bold'}}>Present</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
