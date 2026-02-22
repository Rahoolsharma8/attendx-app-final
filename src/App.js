import React from 'react';
import './App.css';

function App() {
  const courses = [
    { id: 1, name: 'CS1 - Database', color: '#4CAF50', icon: '📚' },
    { id: 2, name: 'CS2 - Networking', color: '#2196F3', icon: '💻' },
    { id: 3, name: 'CS3 - Algorithms', color: '#FF5722', icon: '🔬' },
    { id: 4, name: 'CS4 - Web Tech', color: '#673AB7', icon: '🎓' },
  ];

  return (
    <div className="app-container">
      <header className="header">
        <span style={{fontSize: '24px'}}>🎯</span>
        <h1 style={{fontSize: '20px'}}>AttendX Portal</h1>
      </header>

      <main className="main-content">
        <h2>Dashboard</h2>
        <p style={{color: '#666'}}>Welcome back, Parshant</p>

        <div className="course-list">
          {courses.map(course => (
            <div key={course.id} className="course-card" style={{backgroundColor: course.color}}>
              <div>
                <h3 style={{margin: 0}}>{course.name}</h3>
                <span style={{fontSize: '12px', opacity: 0.8}}>Enrolled</span>
              </div>
              <span style={{fontSize: '30px'}}>{course.icon}</span>
            </div>
          ))}
        </div>
      </main>

      <nav className="bottom-nav">
        <span>🏠</span>
        <span>📊</span>
        <span>👤</span>
      </nav>
    </div>
  );
}

export default App;
