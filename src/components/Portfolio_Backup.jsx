import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight, 
  Cpu, Database, Server, Award, Star, Download,
  ArrowRight, Terminal as TerminalIcon, Sparkles, Code, Globe, Briefcase
} from 'lucide-react';
import profileImg from "../assets/profile.png";
import Terminal from './Terminal';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1
      });

      // Floating elements
      gsap.to('.floating-blob', {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Experience cards
      gsap.utils.toArray('.experience-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      // Project cards
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });
      });

      // Stats counter animation
      gsap.utils.toArray('.stat-number').forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%'
          },
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          onUpdate: function() {
            stat.textContent = Math.ceil(this.targets()[0].textContent);
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const experience = [
    {
      company: 'URM ENROLL',
      role: 'SYSTEMS ARCHITECT',
      type: 'INTERNSHIP',
      period: 'JAN 2026 — PRESENT',
      location: 'Remote',
      impact: 'Architecting scalable enrollment infrastructure with distributed synchronization patterns and real-time data pipelines.',
      achievements: [
        'Designed microservices architecture handling 10K+ concurrent users',
        'Implemented Azure-based CI/CD pipelines reducing deployment time by 60%',
        'Optimized SQL Server queries achieving 45% performance improvement'
      ],
      stack: ['Next.js', 'Azure', 'SQL Server', 'Redis', 'Docker']
    },
    {
      company: 'ADADK BERLIN',
      role: 'FULL STACK DEVELOPER',
      type: 'INTERNSHIP',
      period: 'JUN 2025 — DEC 2025',
      location: 'Berlin, Germany (Remote)',
      impact: 'Built enterprise IoT monitoring platform with real-time WebSocket infrastructure for 100+ connected devices.',
      achievements: [
        'Developed real-time dashboard with sub-second latency using NestJS',
        'Implemented Redis pub/sub for distributed event processing',
        'Created PostgreSQL data models for time-series sensor data'
      ],
      stack: ['NestJS', 'Redis', 'PostgreSQL', 'WebSocket', 'TypeScript']
    },
    {
      company: 'IDS FINTECH',
      role: 'SYSTEMS DEVELOPER',
      type: 'INTERNSHIP',
      period: 'MAR 2024 — MAY 2024',
      location: 'Beirut, Lebanon',
      impact: 'Optimized legacy financial transaction systems, achieving 35% latency reduction across critical API endpoints.',
      achievements: [
        'Refactored C# transaction engines with Dapper ORM',
        'Built Angular dashboards for real-time transaction monitoring',
        'Implemented caching strategies reducing database load by 40%'
      ],
      stack: ['C#', 'Angular', 'Dapper', 'SQL Server', 'REST APIs']
    }
  ];

  const projects = [
    {
      title: 'FILLIA AI',
      category: 'AI-Powered Matching',
      metric: '+22% Success Rate',
      desc: 'Vector-based matching algorithm for crisis relief logistics using semantic search and real-time optimization.',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
      color: 'from-violet-500'
    },
    {
      title: 'FINTECH SYNC',
      category: 'Payment Gateway',
      metric: '<100ms Latency',
      desc: 'High-concurrency payment orchestration system with distributed transaction management.',
      tech: ['Node.js', 'Redis', 'Kafka', 'MongoDB'],
      color: 'from-cyan-500'
    }
  ];

  const skills = {
    backend: ['Node.js', 'NestJS', 'C#/.NET', 'Python', 'FastAPI', 'Express'],
    frontend: ['React', 'Next.js', 'TypeScript', 'Angular', 'Tailwind CSS'],
    database: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'Supabase'],
    devops: ['Docker', 'Azure', 'CI/CD', 'Git', 'Linux'],
    architecture: ['Microservices', 'REST APIs', 'WebSocket', 'Event-Driven', 'System Design']
  };

  return (
    <div ref={containerRef} className="relative w-full bg-dark-bg selection:bg-brand-primary selection:text-white">
      <div className="noise" />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      
      {/* Custom Cursor */}
      <div 
        className="custom-cursor hidden lg:flex items-center justify-center" 
        style={{ left: mousePos.x, top: mousePos.y, transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})` }}
      >
        {isHovering && <ArrowUpRight size={10} className="text-black" />}
      </div>
      <div 
        className="cursor-follower hidden lg:block" 
        style={{ left: mousePos.x, top: mousePos.y, transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})` }} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-white font-black tracking-tighter text-xl">ASAAD.</span>
        </div>
        <div className="pointer-events-auto flex gap-4">
          <a href="#contact" className="glass-card px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-brand-primary transition-all duration-300">
            Connect
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex items-center gap-4 mb-8 hero-title">
            <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-transparent" />
            <span className="text-brand-primary font-mono text-[10px] uppercase tracking-[0.5em]">Systems Architect • Beirut</span>
          </div>

          <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-black text-white leading-[0.85] tracking-tighter mb-16">
            <div className="hero-title overflow-hidden">BUILDING</div>
            <div className="hero-title overflow-hidden">
              <span className="text-gradient">SCALABLE</span>
            </div>
            <div className="hero-title overflow-hidden">SYSTEMS.</div>
          </h1>

          <div className="grid lg:grid-cols-3 gap-12 items-end">
            <div className="lg:col-span-2 hero-title">
              <p className="text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
                Full-stack engineer specializing in <span className="text-white font-medium">distributed systems</span> and <span className="text-white font-medium">high-performance architecture</span>. Currently architecting enrollment infrastructure at <span className="text-brand-primary font-medium">URM ENROLL</span>.
              </p>
            </div>
            <div className="flex gap-4 hero-title">
              <a 
                 onMouseEnter={() => setIsHovering(true)} 
                 onMouseLeave={() => setIsHovering(false)}
                 href="/Alaa Asaad_CV.pdf" 
                 download
                 className="w-full h-16 glass-card flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 magnetic-button"
              >
                <Download size={16} /> Resume
              </a>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/2 right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full -z-10 floating-blob" />
        <div className="absolute bottom-1/4 left-[-5%] w-[400px] h-[400px] bg-brand-secondary/10 blur-[100px] rounded-full -z-10 floating-blob" style={{ animationDelay: '-1.5s' }} />
      </section>

      {/* Stats Marquee */}
      <div ref={statsRef} className="py-20 border-y border-white/5 overflow-hidden whitespace-nowrap flex">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex items-center gap-20 animate-marquee px-10">
            <span className="text-[clamp(2rem,5vw,4rem)] font-black text-white/10 uppercase tracking-tighter">3+ Years Experience</span>
            <div className="w-4 h-4 rounded-full bg-brand-primary" />
            <span className="text-[clamp(2rem,5vw,4rem)] font-black text-white/10 uppercase tracking-tighter">10+ Projects Delivered</span>
            <div className="w-4 h-4 rounded-full bg-brand-secondary" />
            <span className="text-[clamp(2rem,5vw,4rem)] font-black text-white/10 uppercase tracking-tighter">Full-Stack Expertise</span>
            <div className="w-4 h-4 rounded-full bg-white/20" />
          </div>
        ))}
      </div>

      {/* Identity & Experience */}
      <section className="py-spacing-section px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Identity Card */}
            <div className="lg:col-span-12 xl:col-span-5 relative group">
              <div className="glass-card p-12 sticky top-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <img src={profileImg} className="w-32 h-32 rounded-[2.5rem] grayscale brightness-110 object-cover border border-white/10" alt="Alaa Asaad" />
                    <div className="flex flex-col items-end gap-2">
                      <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                        Available
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">Beirut • Remote</span>
                    </div>
                  </div>
                  <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">ALAA<br />ASAAD</h2>
                  <p className="text-lg text-slate-400 font-light leading-relaxed mb-12">
                     Systems architect and full-stack engineer with expertise in building scalable, high-performance applications. Passionate about clean code, distributed systems, and solving complex technical challenges.
                  </p>
                  <div className="flex gap-4">
                    <a href="https://linkedin.com/in/alaa-asaad-505740355" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all magnetic-button">
                      <Linkedin size={20} />
                    </a>
                    <a href="https://github.com/AlaaAsaad03" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all magnetic-button">
                      <Github size={20} />
                    </a>
                    <a href="mailto:alaa.b.asaad@gmail.com" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all magnetic-button">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-8">
               <div className="glass-card p-12 bg-white/[0.01]">
                  <div className="flex items-center gap-4 mb-12">
                    <Briefcase className="text-brand-primary" size={24} />
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest">Professional Experience</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                  <div className="space-y-16">
                    {experience.map((exp, i) => (
                      <div key={i} className="experience-card group relative pl-12 border-l-2 border-white/5 hover:border-brand-primary transition-colors">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-bg border-2 border-white/10 group-hover:border-brand-primary group-hover:bg-brand-primary transition-all" />
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white uppercase group-hover:text-brand-primary transition-colors">{exp.company}</h3>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">{exp.role}</span>
                              <span className="text-[10px] text-slate-600">•</span>
                              <span className="text-[10px] text-brand-primary/60 font-mono">{exp.type}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-slate-600 border border-white/5 px-4 py-1.5 rounded-full block mb-2">{exp.period}</span>
                            <span className="text-[9px] text-slate-600">{exp.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-base text-slate-400 font-light leading-relaxed mb-6">{exp.impact}</p>
                        
                        <ul className="space-y-3 mb-8">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-500">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.stack.map(s => (
                            <span key={s} className="text-[9px] text-brand-primary font-black uppercase tracking-widest bg-brand-primary/5 px-3 py-1.5 rounded border border-brand-primary/10">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Skills Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(skills).map(([category, techs]) => (
                    <div key={category} className="glass-card p-8 group hover:border-brand-primary/30 transition-all">
                      <h4 className="font-black text-white mb-4 uppercase tracking-widest text-sm">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {techs.map(tech => (
                          <span key={tech} className="text-[10px] text-slate-500 bg-white/[0.02] px-3 py-1.5 rounded border border-white/5 group-hover:border-brand-primary/20 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-spacing-section px-8 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black text-white leading-none tracking-tighter uppercase">
              Featured<br />
              <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-slate-500 font-light max-w-sm border-l-2 border-brand-primary/20 pl-8">
               Selected work demonstrating technical expertise and problem-solving capabilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
             {projects.map((p, i) => (
                <div key={i} className="project-card group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color}/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                  <div className="glass-card p-12 h-full flex flex-col justify-between relative z-10 border-white/[0.03] group-hover:border-white/10">
                    <div>
                         <div className="flex justify-between items-start mb-12">
                           <div className="px-4 py-1.5 glass-card text-[9px] font-black uppercase tracking-widest text-slate-500">{p.category}</div>
                           <motion.div whileHover={{ rotate: 45 }} className="w-12 h-12 glass-card flex items-center justify-center cursor-pointer">
                              <ArrowUpRight size={20} className="text-white" />
                           </motion.div>
                         </div>
                         <h3 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter group-hover:text-gradient transition-all duration-700">{p.title}</h3>
                         <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">{p.desc}</p>
                         <div className="flex flex-wrap gap-2 mb-12">
                           {p.tech.map(t => (
                             <span key={t} className="text-[9px] text-slate-500 bg-white/[0.02] px-3 py-1.5 rounded border border-white/5">
                               {t}
                             </span>
                           ))}
                         </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                       <div>
                          <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Impact</div>
                          <div className="text-2xl font-black text-white">{p.metric}</div>
                       </div>
                       <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">
                          View Details <ArrowRight size={14} />
                       </div>
                    </div>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-spacing-section px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
           <div className="lg:col-span-12 xl:col-span-7 glass-card p-12 flex flex-col justify-between border-brand-primary/10">
              <div>
                <div className="text-[10px] text-brand-primary font-black uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                  <Star size={12} /> Education
                </div>
                <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">AL MAAREF UNIVERSITY</h2>
                <p className="text-xl text-slate-400 font-light mb-12">Bachelor of Science in Computer Science • 2021-2025</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                   <div className="p-6 glass-card bg-white/[0.01]">
                      <h4 className="text-white font-bold mb-2 text-sm uppercase">Achievement</h4>
                      <p className="text-xs text-slate-500">3rd Place Graduation Distinction</p>
                   </div>
                   <div className="p-6 glass-card bg-white/[0.01]">
                      <h4 className="text-white font-bold mb-2 text-sm uppercase">Focus Areas</h4>
                      <p className="text-xs text-slate-500">Distributed Systems • Software Architecture</p>
                   </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Data Structures', 'Algorithms', 'System Design', 'Software Engineering', 'Database Systems'].map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-slate-500 border border-white/10 px-4 py-2 rounded-xl">
                    {tag}
                  </span>
                ))}
              </div>
           </div>

           <div className="lg:col-span-12 xl:col-span-5 glass-card p-12 bg-violet-500/5">
              <h3 className="text-2xl font-black text-white mb-12 uppercase tracking-widest">Certifications</h3>
              <div className="space-y-4">
                 {[
                   'Google AI Essentials',
                   'MERN Stack Development',
                   'C# Fundamentals (Microsoft)',
                   'System Design Principles',
                   'Ready4Work Program'
                 ].map((cert, i) => (
                   <div key={i} className="flex justify-between items-center p-5 glass-card border-none hover:bg-white/[0.03] transition-colors group cursor-pointer">
                      <span className="text-xs font-medium text-slate-400 group-hover:text-white">{cert}</span>
                      <Award size={14} className="text-slate-700 group-hover:text-brand-primary transition-colors" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Terminal */}
      <section className="py-spacing-section px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-card border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <TerminalIcon size={12} /> Interactive Terminal
             </div>
             <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Developer Console</h2>
          </div>
          <Terminal />
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-40 pb-20 px-8 relative overflow-hidden bg-black/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-40">
            <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-black text-white leading-none tracking-tighter uppercase mb-12">
              Let's Build<br />
              <span className="text-gradient">Together</span>
            </h2>
            <a href="mailto:alaa.b.asaad@gmail.com" className="text-2xl md:text-5xl font-light text-slate-400 hover:text-white transition-colors duration-500 underline underline-offset-[16px] decoration-1 decoration-slate-800 hover:decoration-brand-primary">
              alaa.b.asaad@gmail.com
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-20 border-t border-white/5">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
              ALAA ASAAD © 2026
            </div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
               <a href="https://github.com/AlaaAsaad03" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
               <a href="https://linkedin.com/in/alaa-asaad-505740355" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="tel:+96181817756" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
               Available for Work
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
