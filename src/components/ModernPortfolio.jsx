import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight, 
  Cpu, Database, Server, Download,
  ArrowRight, Code, Globe,
  CheckCircle2, TrendingUp, Shield, 
  Menu, X, ChevronRight, Zap, Target,
  Award, Star, Activity, Binary, Network,
  Search, ShieldCheck, Box, Workflow
} from 'lucide-react';
import profileImg from "../assets/profile.png";

const ModernPortfolio = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const experience = [
    {
      company: "URM ENROLL",
      location: "Berlin (Remote)",
      role: "Backend Team Lead Intern",
      period: "Jan 2026 – Feb 2026",
      desc: "Architected core backend systems for an international student recruitment SaaS platform.",
      impact: [
        "Architected PostgreSQL 16 with Row-Level Security (RLS) for multi-tenant isolation.",
        "Built AI CV parsing with Edge Functions (Deno/TS), 70% extraction accuracy.",
        "Developed weighted matching engine (0–100 score) for student placement.",
        "Automated compliance tracking processing 500+ documents."
      ],
      stack: ["NestJs", "PostgreSQL", "Supabase", "Deno", "TypeScript"]
    },
    {
      company: "ADADK",
      location: "Berlin (Remote)",
      role: "Full Stack Developer Intern",
      period: "Dec 2025 – Jan 2026",
      desc: "Engineered an IoT smart water management system for real-time leak detection.",
      impact: [
        "Developed RESTful APIs for telemetry ingestion (100+ IoT devices).",
        "Architected multi-tenant database for properties, devices, and technicians.",
        "Built real-time alerts using WebSockets (Socket.io) and Redis.",
        "Implemented JWT & Google OAuth for secure access control."
      ],
      stack: ["NestJs", "PostgreSQL", "Socket.io", "Redis", "TypeORM"]
    },
    {
        company: "INJAZ Lebanon",
        location: "Beirut, Lebanon",
        role: "Project Management & Support Intern",
        period: "Nov 2025 – Dec 2025",
        desc: "Optimized operational workflows through Python-based data automation.",
        impact: [
          "Developed Python/Pandas scripts reducing manual data entry by 40%.",
          "Automated compliance reporting for 200+ student records.",
          "Coordinated supplier documentation for on-time project delivery."
        ],
        stack: ["Python", "Pandas", "OpenPyXL", "Data Analytics"]
    },
    {
        company: "IDS FINTECH",
        location: "Beirut, Lebanon",
        role: "Full Stack Developer Intern",
        period: "July 2024 – Aug 2024",
        desc: "Enhanced banking application performance and user interaction.",
        impact: [
          "Optimized SQL/Entity Framework queries, reducing API latency by 35%.",
          "Delivered UI features using Angular and DevExtreme.",
          "Increased engagement by 30% through improved responsiveness."
        ],
        stack: [".NET Core", "C#", "Angular", "SQL Server", "Dapper"]
    }
  ];

  const projects = [
    {
      title: "Fillia",
      award: "3rd Place @ Graduation Project Competition",
      desc: "Crisis-affected donation platform with AI fraud detection.",
      stack: ["React", "Node.js", "MongoDB", "AI Validation"],
      metric: "22% Matching Success Increase"
    },
    {
      title: "Table Booking System",
      desc: "End-to-end reservation engine with real-time sync.",
      stack: ["Angular", ".NET Core", "SQL Server", "Azure"],
      metric: "99.9% Booking Accuracy"
    },
    {
      title: "Buildings Management Hub",
      desc: "Multi-tenant property platform with RBAC security.",
      stack: ["Flask", "MySQL", "Angular", "JWT"],
      metric: "Automated Admin Workflows"
    }
  ];

  const skills = {
    "Backend & Architecture": ["Node.js", "NestJS", ".NET Core", "PostgreSQL", "SQL Server", "Redis"],
    "Frontend & Interface": ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS", "Framer Motion"],
    "Cloud & Infrastructure": ["Azure", "Docker", "Supabase", "Git", "REST APIs", "Microservices"]
  };

  return (
    <div className="bg-[#ffffff] text-[#1a1a1a] min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter uppercase">Alaa Asaad</div>
        <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <a href="#experience" className="hover:text-black transition-colors">Experience</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#stack" className="hover:text-black transition-colors">Stack</a>
          <a href="mailto:alaa.b.asaad@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">Contact</a>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={20} />
        </button>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl space-y-8">
          <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Based in Beirut, Lebanon
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] text-slate-900">
            Building scalable systems with <span className="text-blue-600 italic">architectural precision.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl font-light">
            Full-stack developer focused on high-availability backends, 
            AI-driven automation, and modular software architecture.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
             <a href="mailto:alaa.b.asaad@gmail.com" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                Get in touch <Mail size={18} />
             </a>
             <a href="/Alaa Asaad_CV.pdf" className="px-8 py-4 border border-slate-200 text-slate-900 font-bold rounded-lg hover:border-slate-900 transition-all flex items-center gap-2">
                Download CV <Download size={18} />
             </a>
          </div>
        </div>
      </header>

      {/* Experience Section (Organized Tabs) */}
      <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Experience</h2>
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
              {experience.map((exp, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(exp.company.toLowerCase())}
                  className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === exp.company.toLowerCase() ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr,2fr] gap-12 items-start min-h-[400px]">
            {experience.map((exp, i) => (
              activeTab === exp.company.toLowerCase() && (
                <React.Fragment key={i}>
                  <div className="space-y-4">
                    <div className="text-blue-600 font-bold text-sm">{exp.period}</div>
                    <h3 className="text-3xl font-bold text-slate-900">{exp.company}</h3>
                    <p className="text-slate-500 font-medium uppercase text-xs tracking-widest">{exp.role}</p>
                    <p className="text-slate-600 leading-relaxed italic">"{exp.desc}"</p>
                  </div>
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <div className="space-y-8">
                       <div className="grid md:grid-cols-2 gap-12">
                          <div className="space-y-4">
                             <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Key Impact</h4>
                             <ul className="space-y-3">
                                {exp.impact.map((item, j) => (
                                  <li key={j} className="flex gap-3 text-sm text-slate-600 items-start">
                                     <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                                     {item}
                                  </li>
                                ))}
                             </ul>
                          </div>
                          <div className="space-y-4">
                             <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Technologies</h4>
                             <div className="flex flex-wrap gap-2">
                                {exp.stack.map((t, j) => (
                                  <span key={j} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                                    {t}
                                  </span>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex justify-between items-end border-b border-slate-100 pb-8">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Selected Works</h2>
            <p className="text-slate-500 text-sm max-w-[200px] text-right">A collection of industry and academic projects.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="group p-8 bg-white border border-slate-100 rounded-2xl hover:border-slate-900 transition-all shadow-sm hover:shadow-xl">
                 <div className="space-y-6">
                    <div className="flex justify-between items-start">
                       <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                          <Code size={18} />
                       </div>
                       <ArrowUpRight className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">{p.desc}</p>
                    </div>
                    {p.award && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <Award size={14} />
                        <span className="text-[10px] font-bold uppercase">{p.award}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                       {p.stack.map((t, j) => (
                         <span key={j} className="text-[10px] font-bold text-slate-400 uppercase">{t}</span>
                       ))}
                    </div>
                    <div className="pt-4 border-t border-slate-50">
                       <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{p.metric}</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="stack" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center space-y-4">
             <h2 className="text-4xl font-bold tracking-tight">Technical Stack</h2>
             <p className="text-slate-400">Core technologies and tools I utilize daily.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {Object.entries(skills).map(([category, items], i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest border-b border-white/10 pb-4">{category}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-100 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold text-slate-900">Let's work together.</h2>
          <p className="text-slate-600">I'm currently looking for new opportunities and collaborations in backend engineering and system architecture.</p>
          <div className="flex justify-center gap-8">
            <a href="https://github.com/AlaaAsaad03" className="text-slate-400 hover:text-slate-900 transition-colors"><Github size={24} /></a>
            <a href="https://linkedin.com/in/alaa-asaad-505740355/" className="text-slate-400 hover:text-slate-900 transition-colors"><Linkedin size={24} /></a>
            <a href="mailto:alaa.b.asaad@gmail.com" className="text-slate-400 hover:text-slate-900 transition-colors"><Mail size={24} /></a>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
          © 2026 Alaa Asaad — Built with precision
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; cursor: default !important; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default ModernPortfolio;
