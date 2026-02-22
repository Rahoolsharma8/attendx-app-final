import React, { useState, useEffect } from 'react';
import { Users, Upload, ChevronLeft, Save, Database, Trash2, Calendar, LayoutDashboard, Settings as SettingsIcon, CheckCircle2, GraduationCap } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const App = () => {
  const [screen, setScreen] = useState('dashboard');
  const [selectedClass, setSelectedClass] = useState(null);
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({}); 
  
  const initialClasses = {
    CS: { CS1: [], CS2: [], CS3: [], CS4: [] },
    DS: { DS1: [], DS2: [], DS3: [], DS4: [] },
    AI: { AI1: [], AI2: [], AI3: [], AI4: [] }
  };
  const [classes, setClasses] = useState(JSON.parse(localStorage.getItem('att_classes')) || initialClasses);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (date !== today) setDate(today);
  }, [screen]);

  useEffect(() => {
    localStorage.setItem('att_classes', JSON.stringify(classes));
  }, [classes]);

  const handleFileUpload = async (dept, className, file) => {
    if (!file) return;
    const fileName = file.name.toLowerCase();
    try {
      if (fileName.endsWith('.csv') || fileName.endsWith('.txt')) {
        Papa.parse(file, { complete: (results) => processStudents(dept, className, results.data) });
      } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        processStudents(dept, className, jsonData);
      }
    } catch (e) { alert("File error!"); }
  };

  const processStudents = (dept, className, data) => {
    const students = data
      .filter(row => row.length >= 2 && row[0] && row[0] !== "RollNo")
      .map(row => ({ roll: String(row[0]).trim(), name: String(row[1]).trim() }));
    setClasses(prev => ({ ...prev, [dept]: { ...prev[dept], [className]: students } }));
  };

  const exportToExcel = async () => {
    if (!subject) return alert("Please enter Subject Name");
    
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Attendance Report');

    // Header Setup
    sheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Subject', key: 'subject', width: 20 },
      { header: 'Class', key: 'class', width: 15 },
      { header: 'Roll No', key: 'roll', width: 15 },
      { header: 'Student Name', key: 'name', width: 25 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    const students = classes[selectedClass.dept][selectedClass.name];
    
    students.forEach(s => {
      const statusValue = attendance[s.roll] === 'A' ? 'Absent' : 'Present';
      const row = sheet.addRow({
        date: date,
        subject: subject,
        class: selectedClass.name,
        roll: s.roll,
        name: s.name,
        status: statusValue
      });

      // Conditional Formatting (Coloring)
      const statusCell = row.getCell('status');
      if (statusValue === 'Present') {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC6EFCE' } }; // Light Green
        statusCell.font = { color: { argb: 'FF006100' }, bold: true }; // Dark Green Text
      } else {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC7CE' } }; // Light Red
        statusCell.font = { color: { argb: 'FF9C0006' }, bold: true }; // Dark Red Text
      }
    });

    // Header Styling
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

    // Final Save
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `UMPK_Attendance_${selectedClass.name}_${date}.xlsx`);
    setScreen('dashboard');
    setSubject('');
    setAttendance({});
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex justify-center items-start sm:py-10 font-sans">
      <div className="w-full max-w-[420px] bg-white min-h-screen sm:min-h-[850px] sm:rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border-white border-[10px]">
        
        {/* Header */}
        <div className="bg-[#1e293b] p-6 pt-12 pb-14 rounded-b-[3rem] shadow-xl">
          <div className="flex justify-between items-center text-white">
            {screen === 'marking' ? (
               <button onClick={() => setScreen('dashboard')} className="p-2 bg-white/10 rounded-xl"><ChevronLeft size={20}/></button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <span className="font-black text-xl tracking-tighter italic">UMPK</span>
              </div>
            )}
            <div className="text-[10px] bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 font-bold text-indigo-300 uppercase tracking-widest">
              Portal
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-5 -mt-8 pb-32 overflow-y-auto no-scrollbar">
          
          {screen === 'dashboard' && (
            <div className="space-y-6 pt-2">
              <div className="px-2 pt-2">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">University<br/>Dashboard</h2>
                <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">Select Class</p>
              </div>

              {Object.keys(classes).map(dept => (
                <div key={dept} className="space-y-3">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">{dept}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(classes[dept]).map(c => (
                      <div key={c} onClick={() => {
                        if(classes[dept][c].length === 0) return setScreen('settings');
                        setSelectedClass({dept, name: c}); setScreen('marking');
                      }} className="bg-white p-5 rounded-[2.2rem] border border-slate-100 shadow-md active:scale-95 transition-all">
                        <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                          <Users size={20} className="text-slate-400" />
                        </div>
                        <h3 className="font-black text-slate-800 text-lg tracking-tight">{c}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{classes[dept][c].length} Enrolled</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {screen === 'marking' && (
            <div className="space-y-4 pt-4">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-50 mb-2">
                <h2 className="text-3xl font-black text-slate-900 leading-tight">{selectedClass.name}</h2>
                <div className="mt-5 space-y-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-black text-slate-400 ml-1 tracking-widest uppercase">Subject</p>
                      <input placeholder="Enter Subject Name..." className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 font-bold outline-none text-slate-800 focus:ring-2 focus:ring-indigo-500" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-black text-slate-400 ml-1 tracking-widest uppercase">Date</p>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                        <input type="date" className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 font-bold outline-none text-slate-800" value={date} onChange={(e)=>setDate(e.target.value)} />
                      </div>
                    </div>
                </div>
              </div>

              <div className="space-y-3 pb-10">
                {classes[selectedClass.dept][selectedClass.name].map(s => (
                  <div key={s.roll} className="bg-white p-4 rounded-[2rem] flex items-center justify-between border border-slate-50 shadow-sm transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 font-black text-[10px] border border-slate-100">{s.roll.slice(-3)}</div>
                      <div>
                        <p className="font-black text-slate-800 text-sm tracking-tight">{s.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold tracking-wider">{s.roll}</p>
                      </div>
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                      <button onClick={() => setAttendance(p => ({...p, [s.roll]: 'P'}))} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${(attendance[s.roll] || 'P') === 'P' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-400'}`}>P</button>
                      <button onClick={() => setAttendance(p => ({...p, [s.roll]: 'A'}))} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${attendance[s.roll] === 'A' ? 'bg-white shadow-md text-rose-600' : 'text-slate-400'}`}>A</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={exportToExcel} className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[85%] max-w-[350px] py-5 bg-[#1e293b] text-white rounded-[2rem] font-black shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase tracking-widest border-t border-white/10">
                <Save size={20} /> Export Excel Report
              </button>
            </div>
          )}

          {screen === 'settings' && (
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-black text-slate-800 px-2 tracking-tight">Database</h2>
              {Object.keys(classes).map(dept => (
                <div key={dept} className="bg-white rounded-[2.5rem] p-6 shadow-md border border-slate-100 mb-4">
                  <h3 className="font-black text-indigo-600 text-[10px] uppercase mb-4 tracking-widest">{dept} Management</h3>
                  {Object.keys(classes[dept]).map(c => (
                    <div key={c} className="flex justify-between items-center py-4 border-b border-slate-50 last:border-0">
                      <div><p className="font-black text-slate-800 text-sm tracking-tight">{c}</p></div>
                      <div className="flex gap-2">
                        {classes[dept][c].length > 0 && (
                          <button onClick={() => setClasses(prev => ({...prev, [dept]: {...prev[dept], [c]: []}}))} className="p-2.5 text-rose-500 bg-rose-50 rounded-xl"><Trash2 size={18} /></button>
                        )}
                        <label className="bg-indigo-50 p-2.5 rounded-xl cursor-pointer text-indigo-600">
                          <Upload size={18} /><input type="file" hidden accept=".csv,.xlsx,.xls,.txt" onChange={(e) => handleFileUpload(dept, c, e.target.files[0])} />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 px-10 py-5 flex justify-between items-center">
          <button onClick={() => setScreen('dashboard')} className={`flex flex-col items-center gap-1.5 transition-all ${screen === 'dashboard' ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-slate-500'}`}>
            <LayoutDashboard size={22} strokeWidth={3} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
          </button>
          
          <div className="w-14 h-14 bg-[#1e293b] rounded-2xl -mt-12 shadow-2xl flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer border-[4px] border-white" onClick={() => setScreen('dashboard')}>
            <CheckCircle2 size={24} />
          </div>

          <button onClick={() => setScreen('settings')} className={`flex flex-col items-center gap-1.5 transition-all ${screen === 'settings' ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-slate-500'}`}>
            <SettingsIcon size={22} strokeWidth={3} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Database</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;