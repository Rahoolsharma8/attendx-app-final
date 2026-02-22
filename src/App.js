import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [screen, setScreen] = useState('splash'); 
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState({});

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => setScreen('home'), 2500);
    return () => clearTimeout(timer);
  }, []);

  const departments = [
    { name: 'CS - Computer Science', classes: ['CS1', 'CS2', 'CS3', 'CS4'] },
    { name: 'DS - Data Science', classes: ['DS1', 'DS2'] },
    { name: 'AI - Artificial Intelligence', classes: ['AI1', 'AI2'] }
  ];

  const markAttendance = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  // 1. SPLASH SCREEN
  if (screen === 'splash') {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <span className="splash-logo">🎯</span>
          <h1 className="fade-in">AttendX Pro</h1>
          <p className="fade-in-delayed">UMPK Edition</p>
        </div>
      </div>
    );
  }

  // 2. HOME SCREEN (DEPARTMENT DROPDOWNS)
  if (screen === 'home') {
    return (
      <div className="app-container">
        <header className="pro-header">
          <div className="umpk-branding">
            <span className="logo-small">🎓</span>
            <div>
              <h3>UMPK Portal</h3>
              <p>Developed by CS Department</p>
            </div>
          </div>
        </header>

        <main className="main-content">
          <h2 className="dashboard-title">University Dashboard</h2>
          <p className="subtitle">Select Department & Class</p>

          <div className="dept-list">
            {departments.map((dept, index) => (
              <div key={index} className="dept-wrapper">
                <button 
                  className={`dept-btn glass ${selectedDept === index ? 'active-dept' : ''}`} 
                  onClick={() => setSelectedDept(selectedDept === index ? null : index)}
                >
                  {dept.name} <span>{selectedDept === index ? '▲' : '▼'}</span>
                </button>
                
                {selectedDept === index && (
                  <div className="class-dropdown animate-slide">
                    {dept.classes.map(cls => (
                      <div key={cls} className="class-item" onClick={() => {setSelectedClass(cls); setScreen('marking');}}>
                        <span>{cls}</span>
                        <span className="status-badge-pending">Pending</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
        <footer className="pro-footer">© 2024 UMPK CS Department</footer>
      </div>
    );
  }

  // 3. MARKING INTERFACE
  if (screen === 'marking') {
    return (
      <div className="app-container">
        <header className="pro-header">
          <button className="back-btn" onClick={() => setScreen('home')}>←</button>
          <div className="header-info">
            <h3>Marking {selectedClass}</h3>
            <p>CS Department, UMPK</p>
          </div>
        </header>

        <main className="main-content">
          <div className="input-group glass">
            <input type="text" placeholder="Subject Name (e.g. Programming)" className="pro-input" />
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="pro-input" />
          </div>

          <div className="student-list">
             {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className={`student-card glass ${attendance[i] === 'P' ? 'border-p' : attendance[i] === 'A' ? 'border-a' : ''}`}>
                 <div className="student-info">
                   <p className="roll">Roll #00{i}</p>
                   <p className="name">Student Name {i}</p>
                 </div>
                 <div className="pa-buttons">
                   <button 
                     className={`btn-p ${attendance[i] === 'P' ? 'active-p' : ''}`} 
                     onClick={() => markAttendance(i, 'P')}>P</button>
                   <button 
                     className={`btn-a ${attendance[i] === 'A' ? 'active-a' : ''}`} 
                     onClick={() => markAttendance(i, 'A')}>A</button>
                 </div>
               </div>
             ))}
          </div>

          <button className="submit-btn" onClick={() => alert('PDF Report Generated for ' + selectedClass)}>
            SUBMIT & GENERATE PDF
          </button>
        </main>
      </div>
    );
  }
}

export default App;
