import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ShieldCheck, Cpu, Database, Globe, Command } from 'lucide-react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'AlaaOS [Version 3.0.1 ALPHA]' },
    { type: 'system', content: 'Connection: SECURE // Handshake: VERIFIED' },
    { type: 'info', content: 'System initialized. Type "help" to list directives.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const commands = {
    help: 'Available: profile, stack, achievements, contact, clear',
    profile: 'ALAA ASAAD: Full-Stack Developer | Specialized in Backend Architecture, AI Integration, and Scalable Web Systems.',
    stack: 'CORE: React, Angular, .NET Core, Node.js, NestJS. DB: PostgreSQL, SQL Server, MongoDB, MySQL. VOID: Deno, Docker, Azure, Python.',
    achievements: 'URM: 70% AI Accuracy | IDS: 35% DB Optimization | INJAZ: 40% Automation | ADADK: 100+ IoT Node Lifecycle.',
    contact: 'COMM_LINK: alaa.b.asaad@gmail.com | GITHUB: AlaaAsaad03 | LINKEDIN: alaa-asaad',
    clear: 'clear'
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, { type: 'input', content: `guest@kernel:~$ ${input}` }];

    if (cmd === 'clear') {
      setHistory([]);
    } else if (commands[cmd]) {
      newHistory.push({ type: 'output', content: commands[cmd] });
      setHistory(newHistory);
    } else if (cmd !== '') {
      newHistory.push({ type: 'error', content: `Unknown directive: "${cmd}". Type "help" for guidance.` });
      setHistory(newHistory);
    }
    setInput('');
  };

  return (
    <div className="w-full glass-card overflow-hidden font-mono text-[13px] border-white/5 shadow-2xl">
      <div className="bg-white/[0.03] px-5 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <Command size={10} />
          <span>Kernel Console</span>
        </div>
        <div className="w-10" />
      </div>
      
      <div 
        ref={scrollRef}
        className="p-6 h-64 overflow-y-auto space-y-2 no-scrollbar bg-black/40"
      >
        <AnimatePresence mode="popLayout">
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                ${line.type === 'system' ? 'text-slate-600' : ''}
                ${line.type === 'error' ? 'text-rose-400' : ''}
                ${line.type === 'input' ? 'text-white' : 'text-slate-400'}
                ${line.type === 'output' ? 'text-brand-primary font-bold' : ''}
                ${line.type === 'info' ? 'text-brand-secondary' : ''}
              `}
            >
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 flex gap-3 bg-black/40">
        <span className="text-brand-primary">➜</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-white caret-brand-primary"
          spellCheck="false"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
