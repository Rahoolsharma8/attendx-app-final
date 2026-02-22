import React from 'react';
import './App.css'; 

function App() {
  // Course List Data
  const courses = [
    { id: 1, name: 'CS1 - Computer Science', status: 'Enrolled', icon: '📚', color: '#4facfe' },
    { id: 2, name: 'CS2 - Programming', status: 'Enrolled', icon: '💻', color: '#43e97b' },
    { id: 3, name: 'CS3 - Data Structures', status: 'Enrolled', icon: '🔬', color: '#fa709a' },
    { id: 4, name: 'CS4 - Web Dev', status: 'Enrolled', icon: '🎓', color: '#667eea' },
  ];

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header">
        <div className="header-left">
          <span className="brand-logo">🎯</span>
          <h1 className="brand-title">AttendX Portal</h1>
        </div>
        <div className="header-right">
          <span className="user-initial">P</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-section">
          <h2>University Dashboard</h2>
          <p>Select your course to mark attendance</p>
        </div>

        {/* Course Cards Grid */}
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card" style={{ background: course.color }}>
              <div className="card-info">
                <h3>{course.name}</h3>
                <span className="status-badge">{course.status}</span>
              </div>
              <div className="card-icon">{course.icon}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item active">🏠<span>Home</span></div>
        <div className="nav-item">📊<span>Stats</span></div>
        <div className="nav-item">👤<span>Profile</span></div>
      </nav>
    </div>
  );
}

export default App;
