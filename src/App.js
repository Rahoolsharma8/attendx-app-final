import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, ChevronDown, ChevronUp, 
  CheckCircle2, FileText, Calendar, ArrowLeft, Trash2 
} from 'lucide-react';
// PDF Libraries
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// --- STUDENT DATABASE ---
const STUDENT_DATABASE = {
  'CS1': [{ id: 'CS1-01', name: 'Parshant Kumar' }, { id: 'CS1-02', name: 'Ali Ahmed' }, { id: 'CS1-03', name: 'Suresh Raina' }],
  'CS2': [{ id: 'CS2-01', name: 'Zeeshan Khan' }, { id: 'CS2-02', name: 'Ayesha Gul' }],
  'CS3': [{ id: 'CS3-01', name: 'Hamza Malik' }, { id: 'CS3-02', name: 'Danish Ali' }],
  'CS4': [{ id: 'CS4-01', name: 'Kamran Akmal' }, { id: 'CS4-02', name: 'Bilal Hassan' }],
  'DS1': [{ id: 'DS1-01', name: 'Data Master' }, { id: 'DS1-02', name: 'Analyst Baig' }],
  'AI1': [{ id: 'AI1-01', name: 'Neural Net' }, { id: 'AI1-02', name: 'GPT Expert' }],
};

const DEPARTMENTS = [
  { id: 'CS', name: 'Computer Science', classes: ['CS1', 'CS2', 'CS3', 'CS4'] },
  { id: 'DS', name: 'Data Science', classes: ['DS1', 'DS2', 'DS3', 'DS4'] },
  { id: 'AI', name: 'Artificial Intelligence', classes: ['AI1', 'AI2', 'AI3', 'AI4'] }
];

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [activeDept, setActiveDept] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('attendx_history');
    if (saved) setHistory(JSON.parse(saved));
    setTimeout(() => setScreen('home'), 2500);
  }, []);

  // --- PDF GENERATION FUNCTION ---
  const generatePDFReport = (record) => {
    const doc = new jsPDF();
    
    // Header Style
    doc.setFillColor(15, 23, 42); // Slate 950
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("AttendX Pro: UMPK Edition", 105, 18, { align: "center" });
    doc.setFontSize(12);
    doc.text("University of Mirpurkhas - CS Department", 105, 28, { align: "center" });

    // Report Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Attendance Report", 14, 50);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Subject: ${record.subject}`, 14, 60);
    doc.text(`Class: ${record.class}`, 14, 67);
    doc.text(`Date: ${record.date}`, 14, 74);
    doc.text(`Present: ${record.present} | Absent: ${record.absent}`, 14, 81);

    // Table Data
    const students = STUDENT_DATABASE[record.class] || [];
    const tableData = students.map(s => [
      s.id, 
      s.name, 
      record.details[s.id] === 'P' ? 'Present' : (record.details[s.id] === 'A' ? 'Absent' : 'Not Marked')
    ]);

    doc.autoTable({
      startY: 90,
      head: [['Roll No', 'Student Name', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255] },
      styles: { fontSize: 10 },
    });

    // Footer
    doc.setFontSize(10);
    doc.text("Developed by UMPK CS Department", 105, 285, { align: "center" });

    doc.save(`Attendance_${record.class}_${record.subject.replace(/\s+/g, '_')}.pdf`);
  };

  const saveToHistory = () => {
    if (!subject) { alert('Enter Subject Name'); return; }
    
    const currentStudents = STUDENT_DATABASE[selectedClass] || [];
    const pCount = Object.values(attendance).filter(v => v === 'P').length;
    const aCount = currentStudents.length - pCount;

    const newRecord = {
      id: Date.now(),
      subject,
      class: selectedClass,
      date: new Date().toLocaleDateString(),
      present: pCount,
      absent: aCount,
      details: attendance
    };

    const updatedHistory = [newRecord, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('attendx_history', JSON.stringify(updatedHistory));
    
    // Triggers PDF Download
    generatePDFReport(newRecord);
    
    alert('Attendance Saved & PDF Downloaded!');
    setScreen('home');
    setAttendance({});
    setSubject('');
  };

  const deleteRecord = (id) => {
    const filtered = history.filter(item => item.id !== id);
    setHistory(filtered);
    localStorage.setItem('attendx_history', JSON.stringify(filtered));
  };

  if (screen === 'splash') {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
        <div className="animate-pulse flex flex-col items-center text-center">
          <GraduationCap size={80} className="text-blue-500 mb-4" />
          <h1 className="text-4xl font-black tracking-tight">AttendX Pro</h1>
          <p className="text-slate-400 mt-2 font-medium">University of Mirpurkhas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[450px] mx-auto min-h-screen bg-slate-50 font-sans relative flex flex-col shadow-2xl">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl text-white p-6 rounded-b-[2.5rem] shadow-lg border-b border-white/10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight">AttendX Pro</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">UMPK CS Dept</p>
          </div>
          {screen !== 'home' && (
            <button onClick={() => setScreen('home')} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
              <ArrowLeft size={20} />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        {screen === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-indigo-700 to-indigo-950 p-8 rounded-[2.5rem] text-white mb-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h2 className="text-2xl font-bold">Hi, Teacher!</h2>
              <p className="text-indigo-200 mt-1 text-sm">Pick a class to start marking.</p>
              <button onClick={() => setScreen('history')} className="mt-6 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-2xl text-xs font-bold flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-all">
                <FileText size={14} /> ATTENDANCE LOGS
              </button>
            </div>

            <div className="space-y-4">
              {DEPARTMENTS.map((dept) => (
                <div key={dept.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 transition-all">
                  <button onClick={() => setActiveDept(activeDept === dept.id ? null : dept.id)} className="w-full p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <span className="font-bold text-slate-800">{dept.name}</span>
                    {activeDept === dept.id ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-slate-400" />}
                  </button>
                  {activeDept === dept.id && (
                    <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50/50">
                      {dept.classes.map(cls => (
                        <button key={cls} onClick={() => { setSelectedClass(cls); setScreen('marking'); }} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-left hover:border-blue-500 transition-all active:scale-95 group">
                          <span className="block font-black text-blue-600 mb-1">{cls}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{STUDENT_DATABASE[cls]?.length || 0} Students</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === 'marking' && (
          <div className="animate-in slide-in-from-right-10 duration-500 pb-32">
            <div className="bg-white p-7 rounded-[2.5rem] shadow-sm mb-6 border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 mb-4 tracking-tight uppercase">{selectedClass} Session</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Subject Name..." value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all" />
                <div className="flex items-center gap-3 p-5 bg-slate-50 rounded-[1.5rem] text-slate-500 text-sm font-bold">
                  <Calendar size={18} className="text-blue-500" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {(STUDENT_DATABASE[selectedClass] || []).map((student) => (
                <div key={student.id} className="bg-white p-5 rounded-[2rem] flex justify-between items-center shadow-sm border border-slate-100 group transition-all">
                  <div>
                    <p className="text-[10px] font-black text-blue-500 tracking-widest">{student.id}</p>
                    <p className="font-bold text-slate-800 leading-tight">{student.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setAttendance({...attendance, [student.id]: 'P'})} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-black text-sm ${attendance[student.id] === 'P' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>P</button>
                    <button onClick={() => setAttendance({...attendance, [student.id]: 'A'})} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-black text-sm ${attendance[student.id] === 'A' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 scale-110' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>A</button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={saveToHistory} className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[85%] max-w-[380px] bg-slate-950 text-white p-6 rounded-[2.5rem] font-black text-sm tracking-widest shadow-2xl flex items-center justify-center gap-3 hover:bg-indigo-600 active:scale-95 transition-all">
              <CheckCircle2 size={20} /> SUBMIT & DOWNLOAD REPORT
            </button>
          </div>
        )}

        {screen === 'history' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-black mb-6 text-slate-800 tracking-tight">Logs History</h2>
            {history.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-slate-300" />
                </div>
                <p className="text-slate-400 font-bold text-sm tracking-tight">No attendance records yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((record) => (
                  <div key={record.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-slate-800 tracking-tight">{record.subject}</h4>
                      <button onClick={() => deleteRecord(record.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 mb-4">{record.class} • {record.date}</p>
                    <div className="flex gap-4">
                      <div className="flex-1 bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                        <p className="text-[10px] font-black text-emerald-600 uppercase">Present</p>
                        <p className="text-lg font-black text-emerald-700 leading-none">{record.present}</p>
                      </div>
                      <div className="flex-1 bg-rose-50 p-3 rounded-2xl border border-rose-100">
                        <p className="text-[10px] font-black text-rose-600 uppercase">Absent</p>
                        <p className="text-lg font-black text-rose-700 leading-none">{record.absent}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="p-6 text-center bg-white border-t border-slate-100">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Developed by UMPK CS Department
        </p>
      </footer>
    </div>
  );
}
