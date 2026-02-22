import React from 'react';
import './App.css';

function App() {
  const courses = [
    { id: 1, name: 'CS1', color: '#66bb6a', icon: '📚' },
    { id: 2, name: 'CS2', color: '#42a5f5', icon: '💻' },
    { id: 3, name: 'CS3', color: '#ff7043', icon: '🔬' },
    { id: 4, name: 'CS4', color: '#9575cd', icon: '🎓' },
  ];

  return (
    <div className="app-container">
      <header className="header">
        <span>🎓</span>
        <h1>UMPK Portal</h1>
      </header>

      <main className="main-content">
        <div className="title-section">
          <h2>Database</h2>
          <p>CS Management</p>
        </div>

        <div className="course-list">
          {courses.map(course => (
            <div key={course.id} className="course-card" style={{backgroundColor: course.color}}>
              <div className="card-text">
                <h3>{course.name}</h3>
                <span>Enrolled</span>
              </div>
              <div className="card-icon">{course.icon}</div>
            </div>
          ))}
        </div>
      </main>

      <nav className="bottom-nav">
        <span>🏠</span>
        <span>📚</span>
        <span>👤</span>
      </nav>
    </div>
  );
}

export default App;
