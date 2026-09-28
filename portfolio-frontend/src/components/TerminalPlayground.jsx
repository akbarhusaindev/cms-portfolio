import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Trash2, Check, Copy } from 'lucide-react';

export default function TerminalPlayground({ data }) {
  const { about = {}, skills = [], projects = [], blogs = [], experiences = [], services = [] } = data || {};
  
  const [history, setHistory] = useState([
    { type: 'system', text: '⚡ Akbar OS Interactive Shell v2.4.0 (x86_64-darwin)' },
    { type: 'system', text: 'Type "help" or click any command chip below to explore.' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const quickCommands = ['help', 'skills', 'projects', 'about', 'experience', 'blogs', 'status', 'clear'];

  const executeCommand = (cmdText) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;

    const cmd = rawCmd.toLowerCase();
    setCommandHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    // Add user command line to history
    const newHistory = [...history, { type: 'user', text: `$ ${rawCmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  • about       : View engineer profile, bio & contact information
  • skills      : Output verified technical skills matrix
  • projects    : List featured engineering projects & repositories
  • experience  : Print career milestones and experience timeline
  • blogs       : List recent technical articles & insights
  • services    : Overview of solutions & architectural services
  • status      : Live backend API & database health status
  • whoami      : Print current visitor session identity
  • sudo        : Request superuser access
  • clear       : Clear the terminal screen`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `[PROFILE: Akbar Husain]
Role     : Full-Stack Software Engineer & System Architect
Core     : Java 21, Spring Boot, React 19, PostgreSQL, REST APIs
Email    : ${about?.email || 'akbarhusain@example.com'}
Phone    : ${about?.phone || '+1 (555) 000-0000'}
Bio      : ${about?.bio || 'Full-Stack Developer building scalable web applications with custom CMS.'}`
        });
        break;

      case 'skills':
        if (skills.length > 0) {
          const formatted = skills.map(s => `  • ${s.name.padEnd(22)} [${s.category || 'Tech'}] ${s.proficiency ? `(${s.proficiency})` : ''}`).join('\n');
          newHistory.push({ type: 'output', text: `Verified Skills (${skills.length}):\n${formatted}` });
        } else {
          newHistory.push({ type: 'output', text: 'No skills recorded in CMS yet. Add skills in Admin Panel.' });
        }
        break;

      case 'projects':
        if (projects.length > 0) {
          const formatted = projects.map((p, idx) => `  [${idx + 1}] ${p.title}\n      Tech: ${p.technologies || 'Full Stack'}\n      Desc: ${p.description || 'Production Application'}\n      Live: ${p.liveUrl || 'N/A'}`).join('\n\n');
          newHistory.push({ type: 'output', text: `Featured Projects (${projects.length}):\n${formatted}` });
        } else {
          newHistory.push({ type: 'output', text: 'No projects recorded in CMS yet. Add projects in Admin Panel.' });
        }
        break;

      case 'experience':
        if (experiences.length > 0) {
          const formatted = experiences.map(e => `  • ${e.role} @ ${e.company} (${e.duration || 'Present'})\n    ${e.description || ''}`).join('\n\n');
          newHistory.push({ type: 'output', text: `Career Journey (${experiences.length}):\n${formatted}` });
        } else {
          newHistory.push({ type: 'output', text: 'No experience records in CMS yet. Add experience in Admin Panel.' });
        }
        break;

      case 'blogs':
        if (blogs.length > 0) {
          const formatted = blogs.map((b, idx) => `  [${idx + 1}] ${b.title} (${b.publishedDate || 'Recent'})\n      ${b.content?.slice(0, 80)}...`).join('\n\n');
          newHistory.push({ type: 'output', text: `Published Articles (${blogs.length}):\n${formatted}` });
        } else {
          newHistory.push({ type: 'output', text: 'No articles published in CMS yet. Add blogs in Admin Panel.' });
        }
        break;

      case 'services':
        if (services.length > 0) {
          const formatted = services.map(s => `  • ${s.title}: ${s.description}`).join('\n');
          newHistory.push({ type: 'output', text: `Services Offered (${services.length}):\n${formatted}` });
        } else {
          newHistory.push({ type: 'output', text: 'No services listed in CMS yet. Add services in Admin Panel.' });
        }
        break;

      case 'status':
        newHistory.push({
          type: 'output',
          text: `[SYSTEM STATUS]
• Backend Engine  : Spring Boot 4.1.0-M2 (Running on port 8080)
• Database        : PostgreSQL 16 (Connection Pool Active)
• CMS Admin Panel : React 19 + Tailwind v4 (Operational)
• Frontend Client : Connected & Syncing Live Data
• Latency         : <12ms (Optimal)`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: 'visitor@portfolio-guest (Role: Recruiter / Engineer / Tech Enthusiast)'
        });
        break;

      case 'sudo':
        newHistory.push({
          type: 'output',
          text: '🔐 [ACCESS GRANTED] Superuser privileges enabled. You are now authorized to hire Akbar Husain for high-impact roles!'
        });
        break;

      case 'clear':
        setHistory([
          { type: 'system', text: '⚡ Terminal screen reset. Type "help" for options.' }
        ]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${rawCmd}". Type "help" to see available commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="terminal" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <Terminal size={13} />
            <span>INTERACTIVE DEVELOPER CONSOLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore My Portfolio <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Via CLI</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mt-2">
            Inspect real-time system metrics, skills, and portfolio data directly from this interactive terminal.
          </p>
        </div>

        {/* macOS Style Terminal Window */}
        <div className="relative rounded-2xl bg-[#090d16]/95 border border-slate-700/60 shadow-2xl shadow-black/80 overflow-hidden font-mono backdrop-blur-xl">
          
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors inline-block cursor-pointer"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors inline-block cursor-pointer"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors inline-block cursor-pointer"></span>
              <span className="text-xs text-slate-400 ml-2 font-mono">akbar@portfolio:~ (zsh)</span>
            </div>

            <button
              onClick={() => executeCommand('clear')}
              title="Clear Terminal"
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-slate-800/50"
            >
              <Trash2 size={12} />
              <span>Clear</span>
            </button>
          </div>

          {/* Terminal Body */}
          <div 
            onClick={() => inputRef.current?.focus()}
            className="p-5 min-h-[280px] max-h-[380px] overflow-y-auto space-y-3 text-xs sm:text-sm cursor-text scrollbar-thin"
          >
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'system' && (
                  <p className="text-amber-400/90 font-mono">{item.text}</p>
                )}
                {item.type === 'user' && (
                  <p className="text-emerald-400 font-bold font-mono">{item.text}</p>
                )}
                {item.type === 'output' && (
                  <pre className="text-slate-300 font-mono whitespace-pre-wrap pl-2 border-l-2 border-amber-500/30 my-1 py-0.5">
                    {item.text}
                  </pre>
                )}
                {item.type === 'error' && (
                  <p className="text-rose-400 font-mono pl-2 border-l-2 border-rose-500/40">{item.text}</p>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Command Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 bg-[#060a12] border-t border-slate-800">
            <span className="text-emerald-400 font-bold mr-2 text-sm select-none">➜</span>
            <span className="text-amber-400 font-medium mr-2 text-xs select-none">~/portfolio</span>
            <span className="text-slate-500 mr-2 select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command (e.g. skills, projects, status, help)..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-xs sm:text-sm font-mono"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition"
              aria-label="Send command"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>

          {/* Quick Command Chips Toolbar */}
          <div className="px-4 py-2.5 bg-[#0b111e] border-t border-slate-800/60 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono mr-1">Quick Run:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700/50 hover:border-amber-500/40 transition-all duration-150"
              >
                {cmd}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
