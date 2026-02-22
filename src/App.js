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
        <span style={{fontSize: '24px'}}>🎓</span>
        <h1>UMPK Portal</h1>
      </header>

      <main className="main-content">
        <div className="title-section">
          <h2 style={{margin: '0', fontSize: '28px'}}>Database</h2>
          <p style={{color: '#666', marginTop: '5px'}}>CS Management</p>
        </div>

        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card" style={{backgroundColor: course.color}}>
              <div className="card-text">
                <h3 style={{margin: '0', color: 'white'}}>{course.name}</h3>
                <span style={{fontSize: '14px', opacity: 0.8, color: 'white'}}>Enrolled</span>
              </div>
              <div className="card-icon">{course.icon}</div>
            </div>
          ))}
        </div>
      </main>

      <nav className="bottom-nav">
        <div className="nav-item">🏠</div>
        <div className="nav-item">📚</div>
        <div className="nav-item">👤</div>
      </nav>
    </div>
  );
}

export default App; // <--- Ye line check karein, ye hona zaroori hai!
