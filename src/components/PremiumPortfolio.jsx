import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, ArrowRight, ArrowUpRight, GraduationCap, Trophy, ShieldCheck, Award, Menu, X } from 'lucide-react';
import profileImg from '../assets/profile.png';

const EXP = [
  { company: 'URM Enroll', role: 'Backend Team Lead Intern', period: 'Jan – Feb 2026', location: 'Berlin · Remote',
    points: ['Architected PostgreSQL 16 + Row-Level Security for multi-tenant SaaS across 10+ entities','Built AI CV parsing with Deno Edge Functions achieving 70% structured extraction accuracy','Designed weighted 0–100 matching engine for international student placement','Automated compliance pipeline processing 500+ documents with audit logging'],
    tech: ['NestJS','Supabase','PostgreSQL','Deno','TypeScript'] },
  { company: 'ADADK', role: 'Full Stack Developer Intern', period: 'Dec 2025 – Jan 2026', location: 'Berlin · Remote',
    points: ['Built RESTful APIs managing lifecycle of 100+ connected IoT devices','Architected multi-tenant PostgreSQL schema across properties, zones & technicians','Implemented real-time leak alerts via Socket.io + Redis WebSockets','Enterprise JWT & Google OAuth multi-role access control'],
    tech: ['NestJS','PostgreSQL','Socket.io','Redis','TypeORM'] },
  { company: 'INJAZ Lebanon', role: 'Project Management Intern', period: 'Nov – Dec 2025', location: 'Beirut',
    points: ['Python/Pandas automation reduced manual data entry by 40%','Automated compliance reports across 200+ student records','Coordinated supplier pipeline achieving 100% on-time delivery'],
    tech: ['Python','Pandas','OpenPyXL','Google Sheets API'] },
  { company: 'IDS Fintech', role: 'Full Stack Developer Intern', period: 'Jul – Aug 2024', location: 'Beirut',
    points: ['SQL + EF + Dapper optimisations cut API response time by 35%','Angular + DevExtreme UI components for banking dashboard','Improved user engagement by 30% through enhanced data handling'],
    tech: ['.NET Core','C#','Angular','SQL Server','Dapper','ADO.NET'] },
];

const PROJECTS = [
  { n:'01', title:'Fillia', sub:'Award-Winning Capstone', badge:'🥉 3rd Place · MU 2024–25',
    desc:'Crisis-response donation platform for Lebanon with AI fraud detection, cosine-similarity matching, and trust verification. Boosted case-matching by 22% and accelerated submissions by 15%.',
    tech:['React.js','Node.js','Express.js','MongoDB Atlas','Docker','Jest'], metric:'+22% Match Rate', accent:'#818CF8', git:'https://github.com/AlaaAsaad03/Fillia', live:'#' },
  { n:'02', title:'Smart Water Hub', sub:'Enterprise Internship Project', badge:'Team-based · ADADK',
    desc:'Collaborative development of an IoT water management system with automated leak detection. Developed for ADADK to monitor 100+ connected devices via real-time WebSocket infrastructure (Redis + Socket.io).',
    tech:['NestJS','PostgreSQL','Socket.io','Redis','TypeORM'], metric:'Proprietary System', accent:'#34D399', git:null, live:null },
  { n:'03', title:'Table Booking System', sub:'Full-Stack Web App', badge:'Cloud · Azure',
    desc:'Restaurant reservation engine with real-time availability, admin dashboard, user notifications, and Azure-backed cloud-synced secure bookings.',
    tech:['Angular','.NET Core','SQL Server','Azure','EF Core'], metric:'99.9% Booking Accuracy', accent:'#FBBF24', git:'https://github.com/AlaaAsaad03/Restaurant_Booking_Table', live:'#' },
  { n:'04', title:'Buildings Management', sub:'Enterprise SaaS Platform', badge:'RBAC · Multi-role',
    desc:'Property management platform with Super Admin/Admin role-based access, paginated search, and automated admin-creation workflows using Repository Pattern.',
    tech:['Flask','MySQL','Angular Material','SQLAlchemy','JWT'], metric:'Automated Workflows', accent:'#F472B6', git:'https://github.com/AlaaAsaad03/Buildings-Management-System', live:'#' },
  { n:'05', title:'Waltrack', sub:'Personal Finance Tracker', badge:'Financial Data Mastery',
    desc:'Expense management application with automated transaction categorization, detailed history, and interactive D3-style visualizations for spending analysis.',
    tech:['ASP.NET Core','C#','SQL Server','Syncfusion','MVC'], metric:'Data Visualization', accent:'#60A5FA', git:'https://github.com/AlaaAsaad03/Waltrack', live:'#' },
];

const SKILLS = ['JavaScript','TypeScript','C#','Python','PHP','React.js','Next.js','Angular','Node.js','NestJS','ASP.NET','Flask','PostgreSQL','SQL Server','MongoDB','MySQL','Redis','Supabase','Docker','Azure','Git','Deno','Socket.io','TypeORM','Entity Framework','Dapper','ADO.NET','MVC Architecture','SOLID Principles','REST APIs','Tailwind CSS','Framer Motion','Syncfusion','DevExtreme','Pandas','OpenPyXL','Data Analytics'];

const CERTS = [
  ['Generation AI','Google.org / eFlow.ai','SEP 2025'],
  ['Ready4Work','INJAZ Lebanon','SEP 2025'],
  ['Clean & Scalable Code','SE Excellence','AUG 2025'],
  ['Foundational C#','Microsoft','JUL 2025'],
  ['Prompt Engineering','Tech Trendy','JUL 2025'],
  ['Entrepreneurship & AI','Ektidar Project','JUL 2025'],
  ['MERN Stack Development','Udemy','MAY 2025'],
  ['Frontend Developer (React)','HackerRank','MAY 2025'],
  ['PHP Boot Camp','Udemy','DEC 2024'],
  ['React JavaScript','Alison','OCT 2024'],
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function PremiumPortfolio() {
  const [activeExp, setActiveExp] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleForm = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Alaa: Get your free Access Key at https://web3forms.com
    // Then replace 'YOUR_ACCESS_KEY_HERE' below with your actual key.
    const accessKey = '5e26e2dd-e63b-4db1-96e4-c9f4657e4ebe'; 

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          ...formData
        })
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="pr-root">

      {/* TOP BAR */}
      <div className="pr-topbar">
        <span className="pr-pulse-dot" />
        <span>Available for full-time roles &amp; internships</span>
        <a href="mailto:alaa.b.asaad@gmail.com" className="pr-topbar-cta">Get in touch →</a>
      </div>

      {/* NAV */}
      <nav className={`pr-nav${scrolled ? ' pr-nav--solid' : ''}`}>
        <a href="#home" className="pr-brand">
          <svg className="pr-logo-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Syntax Vertex: A technical logic-gate mark representing the AA initials */}
            <path d="M10 32V20L20 8L32 20V32" stroke="var(--acc)" strokeWidth="4" strokeLinejoin="round"/>
            <path d="M14 26L20 20L26 26" stroke="white" strokeWidth="4" strokeLinecap="square"/>
            <rect x="18" y="30" width="4" height="4" fill="var(--acc)" opacity="0.6"/>
          </svg>
          <span className="pr-brand-name">ALAA <span className="pr-brand-dot">.</span> AS'AD</span>
        </a>
        
        <div className="pr-nav-center">
          {[['#work','Experience'],['#projects','Projects'],['#stack','Stack'],['#contact','Contact']].map(([h,l]) => (
            <a key={h} href={h} className="pr-nav-link">{l}</a>
          ))}
        </div>

        <div className="pr-nav-end">
          <div className="pr-nav-desktop-links">
            <a href="https://github.com/AlaaAsaad03" className="pr-icon-link" target="_blank" rel="noreferrer"><Github size={17}/></a>
            <a href="https://linkedin.com/in/alaa-asaad-505740355/" className="pr-icon-link" target="_blank" rel="noreferrer"><Linkedin size={17}/></a>
          </div>
          <a href="#contact" className="pr-hire-btn">Hire Me</a>
          <button className="pr-mobile-toggle" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {navOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pr-mobile-menu"
            >
              <div className="pr-mobile-links">
                {[['#work','Experience'],['#projects','Projects'],['#stack','Stack'],['#contact','Contact']].map(([h,l]) => (
                  <a 
                    key={h} 
                    href={h} 
                    className="pr-mobile-link"
                    onClick={() => setNavOpen(false)}
                  >
                    {l}
                  </a>
                ))}
              </div>
              <div className="pr-mobile-footer">
                 <a href="https://github.com/AlaaAsaad03" target="_blank" rel="noreferrer" className="pr-icon-link"><Github size={20}/></a>
                 <a href="https://linkedin.com/in/alaa-asaad-505740355/" target="_blank" rel="noreferrer" className="pr-icon-link"><Linkedin size={20}/></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="pr-hero">
        <div className="pr-hero-grid">

          <div className="pr-hero-left">
            <motion.span {...fade(0.05)} className="pr-eyebrow-pill">
              <span className="pr-pulse-dot sm" /> CS Graduate · Full-Stack Developer · Beirut, Lebanon
            </motion.span>

            <motion.h1 {...fade(0.15)} className="pr-hero-h1">
              Building<br/><em className="pr-accent">Intelligent</em><br/>Systems.
            </motion.h1>

            <motion.p {...fade(0.25)} className="pr-hero-p">
              Architecting the next generation of web experiences with a focus on AI integration and robust backend logic. Turning complex requirements into elegant, scalable, and high-impact digital solutions.
            </motion.p>

            <motion.div {...fade(0.35)} className="pr-hero-btns">
              <a href="#projects" className="pr-btn-primary">View My Work <ArrowRight size={15}/></a>
              <a href="/Alaa Asaad_CV.pdf" download className="pr-btn-ghost"><Download size={15}/> Download CV</a>
            </motion.div>

            <motion.div {...fade(0.45)} className="pr-hero-stats">
              {[['4+','Internships'],['15+','Projects'],['10+','Certifications']].map(([n,l]) => (
                <div key={l} className="pr-stat">
                  <span className="pr-stat-n">{n}</span>
                  <span className="pr-stat-l">{l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.2}} className="pr-hero-right">
            <div className="pr-photo-wrap">
              <img src={profileImg} alt="Alaa Asaad" className="pr-photo"/>
              <div className="pr-photo-badge-tl">
                <ShieldCheck size={14} style={{ color: 'var(--acc)', marginRight: '6px' }}/>
                Full-Stack Developer
              </div>
              <div className="pr-photo-badge-br"><span className="pr-pulse-dot sm"/>Open to Work</div>
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="pr-marquee-outer">
          <div className="pr-marquee-inner">
            {[...SKILLS,...SKILLS].map((s,i) => <span key={i} className="pr-marquee-word">{s}</span>)}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="work" className="pr-section pr-section--dim">
        <div className="pr-container">
          <motion.div {...fade()} className="pr-sh">
            <span className="pr-eyebrow">02 · Experience</span>
            <h2 className="pr-h2">Where I've <em className="pr-accent">Worked</em></h2>
          </motion.div>

          <div className="pr-exp-wrap">
            <div className="pr-exp-tabs">
              {EXP.map((e,i) => (
                <button key={i} onClick={()=>setActiveExp(i)} className={`pr-exp-tab${activeExp===i?' active':''}`}>
                  <span className="pr-exp-co">{e.company}</span>
                  <span className="pr-exp-per">{e.period}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeExp} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.28}} className="pr-exp-panel">
                <div className="pr-exp-head">
                  <div>
                    <h3 className="pr-exp-role">{EXP[activeExp].role}</h3>
                    <p className="pr-exp-meta">@ {EXP[activeExp].company} · {EXP[activeExp].location}</p>
                  </div>
                  <span className="pr-period-tag">{EXP[activeExp].period}</span>
                </div>
                <ul className="pr-exp-list">
                  {EXP[activeExp].points.map((pt,i)=>(
                    <li key={i}><span className="pr-dot-acc"/>{pt}</li>
                  ))}
                </ul>
                <div className="pr-chips">
                  {EXP[activeExp].tech.map(t=><span key={t} className="pr-chip">{t}</span>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="pr-section">
        <div className="pr-container">
          <motion.div {...fade()} className="pr-sh" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <span className="pr-eyebrow">03 · Projects</span>
              <h2 className="pr-h2">Selected <em className="pr-accent">Work</em></h2>
            </div>
            <a href="https://github.com/AlaaAsaad03" target="_blank" rel="noreferrer" className="pr-sh-link">
              <Github size={16}/> View GitHub Profile
            </a>
          </motion.div>

          <div className="pr-proj-grid">
            {PROJECTS.map((p,i)=>(
              <motion.div key={i} {...fade(i*0.07)} className="pr-proj-card" style={{'--ac':p.accent}}>
                <div className="pr-proj-ghost">{p.n}</div>
                <div className="pr-proj-body">
                  <div className="pr-proj-top">
                    <div>
                      <span className="pr-proj-sub">{p.sub}</span>
                      <h3 className="pr-proj-title">{p.title}</h3>
                      {p.badge && <span className="pr-proj-badge">{p.badge}</span>}
                    </div>
                    <div className="pr-proj-links">
                      {p.git && <a href={p.git} target="_blank" rel="noreferrer" className="pr-proj-icon"><Github size={15}/></a>}
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="pr-proj-icon live"><ExternalLink size={15}/></a>}
                      {!p.git && !p.live && <span className="pr-proj-meta-tag">Internal System</span>}
                    </div>
                  </div>
                  <p className="pr-proj-desc">{p.desc}</p>
                  <div className="pr-proj-footer">
                    <span className="pr-proj-metric">{p.metric}</span>
                    <div className="pr-chips">{p.tech.slice(0,4).map(t=><span key={t} className="pr-chip">{t}</span>)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="stack" className="pr-section pr-section--dim">
        <div className="pr-container">
          <motion.div {...fade()} className="pr-sh">
            <span className="pr-eyebrow">04 · Stack</span>
            <h2 className="pr-h2">Tech <em className="pr-accent">Arsenal</em></h2>
          </motion.div>
          <motion.div {...fade(0.1)} className="pr-skills-wrap">
            {SKILLS.map((s,i)=><span key={i} className="pr-skill">{s}</span>)}
          </motion.div>
        </div>
      </section>

      {/* ── CREDENTIALS BENTO ── */}
      <section className="pr-section">
        <div className="pr-container">
          <motion.div {...fade()} className="pr-sh">
            <span className="pr-eyebrow">05 · Credentials</span>
            <h2 className="pr-h2">The <em className="pr-accent">Verification</em> Layer</h2>
          </motion.div>

          <div className="pr-bento-grid">
            {/* 1. Main Education Card (Span 2x2) */}
            <motion.div {...fade(0.1)} className="pr-bento-card pr-bento-main-edu">
              <div className="pr-bento-tag">AL MAAREF UNIVERSITY</div>
              <div className="pr-bento-edu-content">
                <div className="pr-bento-icon-lg"><GraduationCap size={40}/></div>
                <div className="pr-bento-txt">
                  <span className="pr-bento-yr">Oct 2021 – Feb 2025</span>
                  <h3>B.S. Computer Science</h3>
                  <p>Al Maaref University (MU) · Beirut, Lebanon</p>
                </div>
              </div>
              <div className="pr-bento-bg-glow"></div>
            </motion.div>

            {/* 2. Honors Card (Span 1x1) */}
            <motion.div {...fade(0.15)} className="pr-bento-card pr-bento-honor">
              <div className="pr-bento-icon-sm"><Trophy size={24}/></div>
              <h3>3rd Place</h3>
              <p>Best Graduation Project Competition 2024–2025</p>
              <div className="pr-honor-badge">DISTINCTION</div>
            </motion.div>

            {/* 3. Status Card (Span 1x1) */}
            <motion.div {...fade(0.2)} className="pr-bento-card pr-bento-stat">
              <div className="pr-bento-icon-sm"><ShieldCheck size={24}/></div>
              <span className="pr-stat-val">10+</span>
              <p>Industry Verified Certifications</p>
            </motion.div>

            {/* 4. Certifications Grid (Span 4) */}
            <div className="pr-bento-cert-deck">
              {CERTS.map(([name, issuer, yr], i) => (
                <motion.div 
                  key={i} 
                  {...fade(0.25 + (i * 0.04))} 
                  className="pr-bento-tile"
                >
                  <div className="pr-tile-head">
                    <span className="pr-tile-n">REF-0{i+1}</span>
                    <Award size={12} className="pr-tile-icon" />
                  </div>
                  <h4 className="pr-tile-name">{name}</h4>
                  <div className="pr-tile-meta">
                    <span className="pr-tile-issuer">{issuer}</span>
                    <span className="pr-tile-yr">{yr}</span>
                  </div>
                  <div className="pr-tile-check"><ShieldCheck size={10} /> VERIFIED</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="pr-section pr-section--dim">
        <div className="pr-container">
          <div className="pr-contact-grid">
            <motion.div {...fade()}>
              <span className="pr-eyebrow">07 · Contact</span>
              <h2 className="pr-contact-h">Let's<br/><em className="pr-accent">Connect.</em></h2>
              <p className="pr-contact-p">Open to full-time roles, remote internships, and exciting collaborations. I respond within 24 hours.</p>
              <div className="pr-contact-links">
                {[[`mailto:alaa.b.asaad@gmail.com`,<Mail size={17}/>,'alaa.b.asaad@gmail.com'],
                  ['https://linkedin.com/in/alaa-asaad-505740355/',<Linkedin size={17}/>,'LinkedIn Profile'],
                  ['https://github.com/AlaaAsaad03',<Github size={17}/>,'github.com/AlaaAsaad03']
                ].map(([href,icon,label],i)=>(
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="pr-clink">
                    {icon}<span>{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.form {...fade(0.1)} className="pr-form" onSubmit={handleSubmit}>
              <div className="pr-form-row">
                <div className="pr-fg">
                  <label>Name</label>
                  <input 
                    name="name"
                    type="text" 
                    placeholder="Your name" 
                    required 
                    value={formData.name} 
                    onChange={handleForm}
                  />
                </div>
                <div className="pr-fg">
                  <label>Email</label>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    value={formData.email} 
                    onChange={handleForm}
                  />
                </div>
              </div>
              <div className="pr-fg">
                <label>Subject</label>
                <input 
                  name="subject"
                  type="text" 
                  placeholder="What's this about?" 
                  required 
                  value={formData.subject} 
                  onChange={handleForm}
                />
              </div>
              <div className="pr-fg">
                <label>Message</label>
                <textarea 
                  name="message"
                  rows={5} 
                  placeholder="Tell me about your project..." 
                  required 
                  value={formData.message} 
                  onChange={handleForm}
                />
              </div>
              
              <button 
                type="submit" 
                className="pr-submit" 
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Transmitting...' : status === 'success' ? 'Sent Successfully!' : 'Send Message'}
                {status !== 'success' && <ArrowRight size={15} style={{ marginLeft: '8px' }}/>}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="pr-form-msg success"
                  >
                    Thank you! I've received your message.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="pr-form-msg error"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pr-footer">
        <div className="pr-container pr-footer-inner">
            <div className="pr-footer-brand">
              <div className="pr-brand">
                <svg className="pr-logo-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 32V20L20 8L30 20V32" stroke="var(--acc)" strokeWidth="4" strokeLinejoin="round"/>
                  <path d="M14 26L20 20L26 26" stroke="white" strokeWidth="4" strokeLinecap="square"/>
                  <rect x="18" y="30" width="4" height="4" fill="var(--acc)" opacity="0.6"/>
                </svg>
                <span className="pr-brand-name">ALAA . AS'AD</span>
              </div>
            </div>

          <span className="pr-foot-copy">© 2026 · Designed &amp; built with precision</span>

          <div className="pr-foot-socials">
            {[['https://github.com/AlaaAsaad03',<Github size={16}/>],['https://linkedin.com/in/alaa-asaad-505740355/',<Linkedin size={16}/>],['mailto:alaa.b.asaad@gmail.com',<Mail size={16}/>]].map(([h,ic],i)=>(
              <a key={i} href={h} target="_blank" rel="noreferrer" className="pr-foot-icon">{ic}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        :root {
          --bg:#04040A; --surf:#0C0C15; --surf2:#12121E;
          --border:#1D1D2E; --border2:#252538;
          --acc:#6366F1; --acc-dim:rgba(99,102,241,0.1);
          --txt:#EEEEF4; --mute:#6B7280; --mute2:#374151;
          --r:10px; --rsm:7px;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;scroll-padding-top:76px;}
        body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--txt);-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        ::selection{background:var(--acc);color:#fff;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:var(--bg);}
        ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px;}
        a{text-decoration:none;color:inherit;}
        em.pr-accent{font-style:normal;color:var(--acc);}

        /* ─ Topbar ─ */
        .pr-topbar{display:flex;align-items:center;justify-content:center;gap:1rem;padding:.55rem 2rem;background:var(--acc-dim);border-bottom:1px solid rgba(99,102,241,.18);font-size:.72rem;font-weight:600;color:var(--mute);}
        .pr-topbar-cta{color:var(--acc);font-weight:700;}
        .pr-pulse-dot{width:7px;height:7px;border-radius:50%;background:#10B981;display:inline-block;animation:pulse 2s infinite;}
        .pr-pulse-dot.sm{width:6px;height:6px;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}

        /* ─ Nav ─ */
        .pr-nav{position:fixed;top:36px;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:1rem 3rem;transition:all .3s;}
        .pr-nav--solid{top:0;background:rgba(4,4,10,.88);backdrop-filter:blur(18px);border-bottom:1px solid var(--border);}
        .pr-brand{display:flex;align-items:center;gap:.75rem;transition:transform .2s;}
        .pr-brand:hover{transform:scale(1.02);}
        .pr-logo-svg{width:32px;height:32px;filter:drop-shadow(0 0 12px var(--acc-dim));}
        .pr-brand-name{font-weight:950;font-size:1.15rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--txt);display:flex;align-items:center;margin-left:0.6rem;}
        .pr-brand-dot{color:var(--acc);margin:0 12px;font-weight:950;opacity:0.8;}
        .pr-nav-center{display:flex;gap:2rem;}
        .pr-nav-link{font-size:.82rem;font-weight:600;color:var(--mute);transition:color .2s;}
        .pr-nav-link:hover{color:var(--txt);}
        .pr-nav-end{display:flex;align-items:center;gap:.6rem;}
        .pr-nav-desktop-links { display: flex; gap: .6rem; }
        .pr-icon-link{width:34px;height:34px;border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--mute);transition:all .2s;}
        .pr-icon-link:hover{color:var(--txt);border-color:var(--acc);}
        .pr-hire-btn{padding:.5rem 1.2rem;background:var(--acc);color:#fff;border-radius:var(--rsm);font-weight:700;font-size:.78rem;transition:opacity .2s;}
        .pr-hire-btn:hover{opacity:.85;}
        
        .pr-mobile-toggle { display: none; background: none; border: none; color: var(--txt); cursor: pointer; padding: .5rem; }
        .pr-sidebar{width:100%;position:sticky;top:0;height:100vh;background:var(--surf);border-right:1px solid var(--border);padding:2.5rem 2rem;display:flex;flex-direction:column;justify-content:space-between;z-index:100;overflow-y:auto;}
        .pr-mobile-menu { position: absolute; top: 100%; left: 0; right: 0; background: var(--bg); border-bottom: 1px solid var(--border); padding: 2rem; display: flex; flex-direction: column; gap: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .pr-mobile-links { display: flex; flex-direction: column; gap: 1.25rem; }
        .pr-mobile-link { font-size: 1.1rem; font-weight: 700; color: var(--txt); }
        .pr-mobile-footer { display: flex; gap: 1rem; border-top: 1px solid var(--border); padding-top: 1.5rem; }

        /* ─ Hero ─ */
        .pr-hero{max-width:1280px;margin:0 auto;padding:10rem 3rem 5rem;display:flex;flex-direction:column;gap:5rem;}
        .pr-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
        .pr-eyebrow-pill{display:inline-flex;align-items:center;gap:.6rem;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);border:1px solid var(--border);padding:.4rem 1rem;border-radius:99px;margin-bottom:1.5rem;}
        .pr-hero-h1{font-size:clamp(3rem,5.5vw,5.25rem);font-weight:900;letter-spacing:-.05em;line-height:.95;margin-bottom:1.5rem;}
        .pr-hero-p{font-size:1.05rem;color:var(--mute);line-height:1.75;max-width:460px;margin-bottom:2.5rem;}
        .pr-hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3rem;}
        .pr-btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.6rem;background:var(--acc);color:#fff;border-radius:var(--rsm);font-weight:700;font-size:.82rem;transition:transform .2s,box-shadow .2s;}
        .pr-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.3);}
        .pr-btn-ghost{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.6rem;border:1px solid var(--border);color:var(--txt);border-radius:var(--rsm);font-weight:700;font-size:.82rem;transition:border-color .2s;}
        .pr-btn-ghost:hover{border-color:var(--acc);}
        .pr-hero-stats{display:flex;gap:2.5rem;padding-top:2rem;border-top:1px solid var(--border);}
        .pr-stat{display:flex;flex-direction:column;gap:.2rem;}
        .pr-stat-n{font-size:2.1rem;font-weight:900;letter-spacing:-.05em;color:var(--acc);}
        .pr-stat-l{font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);}

        /* ─ Photo ─ */
        .pr-hero-right{display:flex;justify-content:center;}
        .pr-photo-wrap{position:relative;width:min(360px,100%);}
        .pr-photo{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:16px;display:block;border:1px solid var(--border);}
        .pr-photo-badge-tl{position:absolute;top:1rem;left:-1.5rem;background:var(--surf2);border:1px solid var(--border);padding:.6rem .95rem;border-radius:var(--rsm);font-size:.68rem;font-weight:700;}
        .pr-photo-badge-br{position:absolute;bottom:-1rem;right:1rem;display:flex;align-items:center;gap:.5rem;background:#065F46;border:1px solid #10B981;color:#D1FAE5;padding:.55rem 1rem;border-radius:99px;font-size:.7rem;font-weight:800;}

        /* ─ Marquee ─ */
        .pr-marquee-outer{overflow:hidden;border-top:1px solid var(--border);padding:1.1rem 0;position:relative;}
        .pr-marquee-outer::before,.pr-marquee-outer::after{content:'';position:absolute;top:0;bottom:0;width:120px;z-index:2;pointer-events:none;}
        .pr-marquee-outer::before{left:0;background:linear-gradient(to right,var(--bg),transparent);}
        .pr-marquee-outer::after{right:0;background:linear-gradient(to left,var(--bg),transparent);}
        .pr-marquee-inner{display:flex;gap:2.5rem;animation:marquee 30s linear infinite;width:max-content;}
        .pr-marquee-word{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--mute2);white-space:nowrap;}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ─ Sections ─ */
        .pr-section{padding:6.5rem 0;}
        .pr-section--dim{background:var(--surf);}
        .pr-container{max-width:1280px;margin:0 auto;padding:0 3rem;}
        .pr-sh{margin-bottom:3.5rem;}
        .pr-eyebrow{display:block;font-size:.68rem;font-weight:800;letter-spacing:.25em;text-transform:uppercase;color:var(--acc);margin-bottom:.75rem;}
        .pr-h2{font-size:clamp(2.2rem,3.5vw,3.5rem);font-weight:900;letter-spacing:-.04em;line-height:1.05;}

        /* ─ Experience ─ */
        .pr-exp-wrap{display:grid;grid-template-columns:260px 1fr;gap:2.5rem;}
        .pr-exp-tabs{display:flex;flex-direction:column;gap:.4rem;}
        .pr-exp-tab{background:none;border:none;border-left:2px solid var(--border);padding:.9rem 1.2rem;text-align:left;cursor:pointer;transition:all .22s;border-radius:0 var(--rsm) var(--rsm) 0;}
        .pr-exp-tab:hover{background:var(--surf2);border-left-color:var(--mute);}
        .pr-exp-tab.active{background:var(--surf2);border-left-color:var(--acc);}
        .pr-exp-co{display:block;font-weight:800;font-size:.9rem;color:var(--mute);margin-bottom:.2rem;transition:color .2s;}
        .pr-exp-tab.active .pr-exp-co,.pr-exp-tab:hover .pr-exp-co{color:var(--txt);}
        .pr-exp-tab.active .pr-exp-co{color:var(--acc);}
        .pr-exp-per{font-size:.65rem;color:var(--mute2);font-weight:600;}
        .pr-exp-panel{background:var(--surf2);border:1px solid var(--border);border-radius:var(--r);padding:2.25rem;}
        .pr-exp-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.75rem;gap:1rem;}
        .pr-exp-role{font-size:1.4rem;font-weight:900;letter-spacing:-.03em;margin-bottom:.25rem;}
        .pr-exp-meta{font-size:.85rem;color:var(--mute);font-weight:600;}
        .pr-period-tag{padding:.35rem .85rem;border:1px solid var(--border);border-radius:99px;font-size:.65rem;font-weight:700;color:var(--mute);white-space:nowrap;}
        .pr-exp-list{list-style:none;display:flex;flex-direction:column;gap:.8rem;margin-bottom:1.75rem;}
        .pr-exp-list li{display:flex;gap:.9rem;align-items:flex-start;font-size:.875rem;color:var(--mute);line-height:1.65;}
        .pr-dot-acc{width:6px;height:6px;border-radius:50%;background:var(--acc);flex-shrink:0;margin-top:.5rem;}
        .pr-dot-acc.sm{width:5px;height:5px;margin-top:.55rem;}
        .pr-chips{display:flex;flex-wrap:wrap;gap:.4rem;}
        .pr-chip{font-size:.65rem;font-weight:700;letter-spacing:.05em;color:var(--mute);border:1px solid var(--border);padding:.28rem .7rem;border-radius:5px;}

        /* ─ Projects ─ */
        .pr-proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;}
        .pr-proj-card:first-child{grid-column: span 2;}
        .pr-proj-card{background:var(--surf);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;transition:border-color .28s,transform .28s;position:relative;}
        .pr-proj-card:hover{border-color:var(--ac);transform:translateY(-3px);}
        .pr-proj-ghost{font-size:5.5rem;font-weight:900;letter-spacing:-.05em;color:var(--border);line-height:1;padding:1.25rem 1.75rem 0;user-select:none;}
        .pr-proj-body{padding:.75rem 1.75rem 1.75rem;}
        .pr-proj-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;gap:1rem;}
        .pr-proj-sub{display:block;font-size:.62rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);margin-bottom:.35rem;}
        .pr-proj-title{font-size:1.35rem;font-weight:900;letter-spacing:-.03em;margin-bottom:.3rem;}
        .pr-proj-badge{display:inline-block;font-size:.62rem;font-weight:700;color:var(--ac);background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.18);padding:.2rem .6rem;border-radius:4px;}
        .pr-proj-links{display:flex;gap:.4rem;flex-shrink:0;}
        .pr-proj-icon{width:32px;height:32px;border-radius:7px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--mute);transition:all .2s;}
        .pr-proj-icon:hover{color:var(--txt);border-color:var(--mute);}
        .pr-proj-icon.live{color:var(--ac);border-color:var(--ac);}
        .pr-proj-desc{font-size:.85rem;color:var(--mute);line-height:1.7;margin-bottom:1.25rem;}
        .pr-proj-footer{display:flex;flex-direction:column;gap:.75rem;}
        .pr-proj-metric{font-size:.7rem;font-weight:800;color:var(--ac);letter-spacing:.08em;text-transform:uppercase;}
        .pr-proj-meta-tag{font-size:.6rem;font-weight:700;color:var(--mute2);letter-spacing:.05em;text-transform:uppercase;border:1px solid var(--border);padding:.2rem .5rem;border-radius:4px;}

        .pr-sh-link { display: flex; align-items: center; gap: .6rem; font-size: .75rem; font-weight: 700; color: var(--mute); transition: color .2s; margin-bottom: .6rem; }
        .pr-sh-link:hover { color: var(--acc); }

        .pr-proj-more { margin-top: 4rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; border-top: 1px solid var(--border); padding-top: 4rem; }
        .pr-proj-more p { font-size: .95rem; color: var(--mute); font-weight: 500; }
        .pr-btn-gh-outline { display: flex; align-items: center; gap: .8rem; padding: 1rem 2rem; border: 1px solid var(--border); border-radius: var(--r); font-size: .88rem; font-weight: 700; color: var(--txt); transition: all .3s; }
        .pr-btn-gh-outline:hover { background: var(--surf); border-color: var(--acc); transform: translateY(-2px); box-shadow: 0 10px 30px -10px rgba(99,102,241,0.2); }

        /* ─ Skills ─ */
        .pr-skills-wrap{display:flex;flex-wrap:wrap;gap:.65rem;}
        .pr-skill{font-size:.82rem;font-weight:600;color:var(--mute);border:1px solid var(--border);padding:.45rem .95rem;border-radius:8px;cursor:default;transition:all .2s;}
        .pr-skill:hover{color:var(--txt);border-color:var(--acc);background:var(--acc-dim);}

        /* ─ Two col ─ */
        .pr-two-col{display:grid;grid-template-columns:1fr 1fr;gap:5rem;}

        /* ─ Credentials Bento ─ */
        .pr-bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .pr-bento-card { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 2rem; position: relative; overflow: hidden; display: flex; flex-direction: column; transition: all .3s; }
        .pr-bento-card:hover { border-color: var(--acc); transform: translateY(-2px); }
        
        .pr-bento-main-edu { grid-column: span 2; grid-row: span 1; justify-content: center; background: linear-gradient(135deg, var(--surf), #0d0d1a); }
        .pr-bento-tag { position: absolute; top: 1.5rem; left: 2rem; font-family: monospace; font-size: .6rem; letter-spacing: .2em; color: var(--mute2); font-weight: 800; }
        .pr-bento-edu-content { display: flex; gap: 2rem; align-items: center; margin-top: 1rem; }
        .pr-bento-icon-lg { width: 70px; height: 70px; background: var(--acc-dim); color: var(--acc); border-radius: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(99,102,241,0.2); }
        .pr-bento-yr { display: block; font-family: monospace; font-size: .75rem; color: var(--acc); font-weight: 800; margin-bottom: .2rem; }
        .pr-bento-txt h3 { font-size: 1.6rem; font-weight: 900; letter-spacing: -.03em; margin-bottom: .4rem; }
        .pr-bento-txt p { font-size: .9rem; color: var(--mute); line-height: 1.5; font-weight: 500; }
        .pr-bento-bg-glow { position: absolute; bottom: -20%; right: -10%; width: 140px; height: 140px; background: var(--acc); filter: blur(80px); opacity: 0.15; pointer-events: none; }

        .pr-bento-honor { grid-column: span 1; background: rgba(251, 191, 36, 0.03); border-color: rgba(251, 191, 36, 0.15); }
        .pr-bento-honor:hover { border-color: #FBBF24; }
        .pr-bento-honor .pr-bento-icon-sm { color: #FBBF24; }
        .pr-bento-honor h3 { font-size: 1.25rem; font-weight: 900; margin: 1rem 0 .4rem; }
        .pr-bento-honor p { font-size: .78rem; font-weight: 600; color: var(--mute); line-height: 1.4; }
        .pr-honor-badge { margin-top: auto; align-self: flex-start; background: #fbbf24; color: #000; font-size: .55rem; font-weight: 900; padding: .25rem .6rem; border-radius: 4px; letter-spacing: .1em; }

        .pr-bento-stat { grid-column: span 1; }
        .pr-stat-val { font-size: 2.5rem; font-weight: 900; color: var(--acc); margin: .5rem 0 .2rem; letter-spacing: -.05em; }
        .pr-bento-stat p { font-size: .78rem; font-weight: 600; color: var(--mute); }
        .pr-bento-icon-sm { color: var(--acc); }

        .pr-bento-cert-deck { grid-column: span 4; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        .pr-bento-tile { background: var(--surf); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; gap: .7rem; transition: all .3s; }
        .pr-bento-tile:hover { border-color: var(--acc); background: var(--surf2); }
        
        .pr-tile-head { display: flex; justify-content: space-between; align-items: center; }
        .pr-tile-n { font-family: monospace; font-size: .55rem; color: var(--mute2); font-weight: 800; }
        .pr-tile-icon { color: var(--acc); opacity: .6; }
        .pr-tile-name { font-size: .88rem; font-weight: 800; line-height: 1.3; color: var(--txt); height: 2.4rem; display: flex; align-items: center; }
        .pr-tile-meta { display: flex; flex-direction: column; }
        .pr-tile-issuer { font-family: monospace; font-size: .55rem; font-weight: 900; color: var(--mute); text-transform: uppercase; letter-spacing: .05em; }
        .pr-tile-yr { font-size: .65rem; font-weight: 700; color: var(--mute2); }
        .pr-tile-check { font-size: .5rem; font-weight: 900; color: #10B981; letter-spacing: .1em; display: flex; align-items: center; gap: .3rem; margin-top: .4rem; border-top: 1px solid var(--border); padding-top: .6rem; }

        @media (max-width: 1100px) {
          .pr-bento-cert-deck { grid-template-columns: repeat(3, 1fr); }
          .pr-bento-main-edu { grid-column: span 4; }
          .pr-bento-honor, .pr-bento-stat { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .pr-bento-cert-deck { grid-template-columns: repeat(2, 1fr); }
          .pr-bento-honor, .pr-bento-stat { grid-column: span 4; }
          .pr-bento-edu-content { flex-direction: column; text-align: center; gap: 1rem; }
        }
        @media (max-width: 480px) {
          .pr-bento-cert-deck { grid-template-columns: 1fr; }
        }

        /* ─ Contact ─ */
        .pr-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:6rem;align-items:start;}
        .pr-contact-h{font-size:clamp(2.8rem,4.5vw,4.25rem);font-weight:900;letter-spacing:-.05em;line-height:.95;margin:1rem 0 1.5rem;}
        .pr-contact-p{font-size:.95rem;color:var(--mute);line-height:1.75;margin-bottom:2rem;}
        .pr-contact-links{display:flex;flex-direction:column;gap:1.1rem;}
        .pr-clink{display:flex;align-items:center;gap:.85rem;font-size:.88rem;font-weight:600;color:var(--mute);transition:color .2s;}
        .pr-clink:hover{color:var(--acc);}
        .pr-form{display:flex;flex-direction:column;gap:1.1rem;}
        .pr-form-row{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem;}
        .pr-fg{display:flex;flex-direction:column;gap:.45rem;}
        .pr-fg label{font-size:.63rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);}
        .pr-fg input,.pr-fg textarea{background:var(--surf2);border:1px solid var(--border);border-radius:var(--rsm);padding:.8rem 1rem;color:var(--txt);font-size:.88rem;font-family:inherit;outline:none;transition:border-color .2s;resize:none;}
        .pr-fg input:focus,.pr-fg textarea:focus{border-color:var(--acc);}
        .pr-submit{display:flex;align-items:center;justify-content:center;gap:.6rem;padding:.95rem;background:var(--acc);color:#fff;border:none;border-radius:var(--rsm);font-weight:800;font-size:.82rem;cursor:pointer;transition:opacity .2s,transform .2s;}
        .pr-submit:hover{opacity:.88;transform:translateY(-1px);}
        .pr-submit:disabled{opacity:.6;cursor:not-allowed;}
        
        .pr-form-msg{font-size:.78rem;font-weight:700;margin-top:1rem;text-align:center;}
        .pr-form-msg.success{color:#10B981;}
        .pr-form-msg.error{color:#EF4444;}

        /* ─ Footer ─ */
        .pr-footer{border-top:1px solid var(--border);padding:1.75rem 0;}
        .pr-footer-inner{display:flex;align-items:center;justify-content:space-between;}
        .pr-foot-brand{font-weight:900;font-size:1.1rem;letter-spacing:-.04em;}
        .pr-foot-copy{font-size:.72rem;color:var(--mute);font-weight:600;}
        .pr-brand-dot{color:var(--acc);margin:0 12px;font-weight:950;opacity:0.8;}
        .pr-nav-center{display:flex;gap:2rem;}
        .pr-nav-link{font-size:.82rem;font-weight:600;color:var(--mute);transition:color .2s;}
        .pr-nav-link:hover{color:var(--txt);}
        .pr-nav-end{display:flex;align-items:center;gap:.6rem;}
        .pr-nav-desktop-links { display: flex; gap: .6rem; }
        .pr-icon-link{width:34px;height:34px;border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--mute);transition:all .2s;}
        .pr-icon-link:hover{color:var(--txt);border-color:var(--acc);}
        .pr-hire-btn{padding:.5rem 1.2rem;background:var(--acc);color:#fff;border-radius:var(--rsm);font-weight:700;font-size:.78rem;transition:opacity .2s;}
        .pr-hire-btn:hover{opacity:.85;}
        
        .pr-mobile-toggle { display: none; background: none; border: none; color: var(--txt); cursor: pointer; padding: .5rem; }
        .pr-sidebar{width:100%;position:sticky;top:0;height:100vh;background:var(--surf);border-right:1px solid var(--border);padding:2.5rem 2rem;display:flex;flex-direction:column;justify-content:space-between;z-index:100;overflow-y:auto;}
        .pr-mobile-menu { position: absolute; top: 100%; left: 0; right: 0; background: var(--bg); border-bottom: 1px solid var(--border); padding: 2rem; display: flex; flex-direction: column; gap: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .pr-mobile-links { display: flex; flex-direction: column; gap: 1.25rem; }
        .pr-mobile-link { font-size: 1.1rem; font-weight: 700; color: var(--txt); }
        .pr-mobile-footer { display: flex; gap: 1rem; border-top: 1px solid var(--border); padding-top: 1.5rem; }

        /* ─ Hero ─ */
        .pr-hero{max-width:1280px;margin:0 auto;padding:10rem 3rem 5rem;display:flex;flex-direction:column;gap:5rem;}
        .pr-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
        .pr-eyebrow-pill{display:inline-flex;align-items:center;gap:.6rem;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);border:1px solid var(--border);padding:.4rem 1rem;border-radius:99px;margin-bottom:1.5rem;}
        .pr-hero-h1{font-size:clamp(3rem,5.5vw,5.25rem);font-weight:900;letter-spacing:-.05em;line-height:.95;margin-bottom:1.5rem;}
        .pr-hero-p{font-size:1.05rem;color:var(--mute);line-height:1.75;max-width:460px;margin-bottom:2.5rem;}
        .pr-hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3rem;}
        .pr-btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.6rem;background:var(--acc);color:#fff;border-radius:var(--rsm);font-weight:700;font-size:.82rem;transition:transform .2s,box-shadow .2s;}
        .pr-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.3);}
        .pr-btn-ghost{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.6rem;border:1px solid var(--border);color:var(--txt);border-radius:var(--rsm);font-weight:700;font-size:.82rem;transition:border-color .2s;}
        .pr-btn-ghost:hover{border-color:var(--acc);}
        .pr-hero-stats{display:flex;gap:2.5rem;padding-top:2rem;border-top:1px solid var(--border);}
        .pr-stat{display:flex;flex-direction:column;gap:.2rem;}
        .pr-stat-n{font-size:2.1rem;font-weight:900;letter-spacing:-.05em;color:var(--acc);}
        .pr-stat-l{font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);}

        /* ─ Photo ─ */
        .pr-hero-right{display:flex;justify-content:center;}
        .pr-photo-wrap{position:relative;width:min(360px,100%);}
        .pr-photo{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:16px;display:block;border:1px solid var(--border);}
        .pr-photo-badge-tl{position:absolute;top:1rem;left:-1.5rem;background:var(--surf2);border:1px solid var(--border);padding:.6rem .95rem;border-radius:var(--rsm);font-size:.68rem;font-weight:700;}
        .pr-photo-badge-br{position:absolute;bottom:-1rem;right:1rem;display:flex;align-items:center;gap:.5rem;background:#065F46;border:1px solid #10B981;color:#D1FAE5;padding:.55rem 1rem;border-radius:99px;font-size:.7rem;font-weight:800;}

        /* ─ Marquee ─ */
        .pr-marquee-outer{overflow:hidden;border-top:1px solid var(--border);padding:1.1rem 0;position:relative;}
        .pr-marquee-outer::before,.pr-marquee-outer::after{content:'';position:absolute;top:0;bottom:0;width:120px;z-index:2;pointer-events:none;}
        .pr-marquee-outer::before{left:0;background:linear-gradient(to right,var(--bg),transparent);}
        .pr-marquee-outer::after{right:0;background:linear-gradient(to left,var(--bg),transparent);}
        .pr-marquee-inner{display:flex;gap:2.5rem;animation:marquee 30s linear infinite;width:max-content;}
        .pr-marquee-word{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--mute2);white-space:nowrap;}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ─ Sections ─ */
        .pr-section{padding:6.5rem 0;}
        .pr-section--dim{background:var(--surf);}
        .pr-container{max-width:1280px;margin:0 auto;padding:0 3rem;}
        .pr-sh{margin-bottom:3.5rem;}
        .pr-eyebrow{display:block;font-size:.68rem;font-weight:800;letter-spacing:.25em;text-transform:uppercase;color:var(--acc);margin-bottom:.75rem;}
        .pr-h2{font-size:clamp(2.2rem,3.5vw,3.5rem);font-weight:900;letter-spacing:-.04em;line-height:1.05;}

        /* ─ Experience ─ */
        .pr-exp-wrap{display:grid;grid-template-columns:260px 1fr;gap:2.5rem;}
        .pr-exp-tabs{display:flex;flex-direction:column;gap:.4rem;}
        .pr-exp-tab{background:none;border:none;border-left:2px solid var(--border);padding:.9rem 1.2rem;text-align:left;cursor:pointer;transition:all .22s;border-radius:0 var(--rsm) var(--rsm) 0;}
        .pr-exp-tab:hover{background:var(--surf2);border-left-color:var(--mute);}
        .pr-exp-tab.active{background:var(--surf2);border-left-color:var(--acc);}
        .pr-exp-co{display:block;font-weight:800;font-size:.9rem;color:var(--mute);margin-bottom:.2rem;transition:color .2s;}
        .pr-exp-tab.active .pr-exp-co,.pr-exp-tab:hover .pr-exp-co{color:var(--txt);}
        .pr-exp-tab.active .pr-exp-co{color:var(--acc);}
        .pr-exp-per{font-size:.65rem;color:var(--mute2);font-weight:600;}
        .pr-exp-panel{background:var(--surf2);border:1px solid var(--border);border-radius:var(--r);padding:2.25rem;}
        .pr-exp-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.75rem;gap:1rem;}
        .pr-exp-role{font-size:1.4rem;font-weight:900;letter-spacing:-.03em;margin-bottom:.25rem;}
        .pr-exp-meta{font-size:.85rem;color:var(--mute);font-weight:600;}
        .pr-period-tag{padding:.35rem .85rem;border:1px solid var(--border);border-radius:99px;font-size:.65rem;font-weight:700;color:var(--mute);white-space:nowrap;}
        .pr-exp-list{list-style:none;display:flex;flex-direction:column;gap:.8rem;margin-bottom:1.75rem;}
        .pr-exp-list li{display:flex;gap:.9rem;align-items:flex-start;font-size:.875rem;color:var(--mute);line-height:1.65;}
        .pr-dot-acc{width:6px;height:6px;border-radius:50%;background:var(--acc);flex-shrink:0;}
        .pr-dot-acc.sm{width:5px;height:5px;}
        .pr-chips{display:flex;flex-wrap:wrap;gap:.4rem;}
        .pr-chip{font-size:.65rem;font-weight:700;letter-spacing:.05em;color:var(--mute);border:1px solid var(--border);padding:.28rem .7rem;border-radius:5px;}

        /* ─ Projects ─ */
        .pr-proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;}
        .pr-proj-card:first-child{grid-column: span 2;}
        .pr-proj-card{background:var(--surf);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;transition:border-color .28s,transform .28s;position:relative;}
        .pr-proj-card:hover{border-color:var(--ac);transform:translateY(-3px);}
        .pr-proj-ghost{font-size:5.5rem;font-weight:900;letter-spacing:-.05em;color:var(--border);line-height:1;padding:1.25rem 1.75rem 0;user-select:none;}
        .pr-proj-body{padding:.75rem 1.75rem 1.75rem;}
        .pr-proj-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;gap:1rem;}
        .pr-proj-sub{display:block;font-size:.62rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);margin-bottom:.35rem;}
        .pr-proj-title{font-size:1.35rem;font-weight:900;letter-spacing:-.03em;margin-bottom:.3rem;}
        .pr-proj-badge{display:inline-block;font-size:.62rem;font-weight:700;color:var(--ac);background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.18);padding:.2rem .6rem;border-radius:4px;}
        .pr-proj-links{display:flex;gap:.4rem;flex-shrink:0;}
        .pr-proj-icon{width:32px;height:32px;border-radius:7px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--mute);transition:all .2s;}
        .pr-proj-icon:hover{color:var(--txt);border-color:var(--mute);}
        .pr-proj-icon.live{color:var(--ac);border-color:var(--ac);}
        .pr-proj-desc{font-size:.85rem;color:var(--mute);line-height:1.7;margin-bottom:1.25rem;}
        .pr-proj-footer{display:flex;flex-direction:column;gap:.75rem;}
        .pr-proj-metric{font-size:.7rem;font-weight:800;color:var(--ac);letter-spacing:.08em;text-transform:uppercase;}
        .pr-proj-meta-tag{font-size:.6rem;font-weight:700;color:var(--mute2);letter-spacing:.05em;text-transform:uppercase;border:1px solid var(--border);padding:.2rem .5rem;border-radius:4px;}

        .pr-sh-link { display: flex; align-items: center; gap: .6rem; font-size: .75rem; font-weight: 700; color: var(--mute); transition: color .2s; margin-bottom: .6rem; }
        .pr-sh-link:hover { color: var(--acc); }

        .pr-proj-more { margin-top: 4rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; border-top: 1px solid var(--border); padding-top: 4rem; }
        .pr-proj-more p { font-size: .95rem; color: var(--mute); font-weight: 500; }
        .pr-btn-gh-outline { display: flex; align-items: center; gap: .8rem; padding: 1rem 2rem; border: 1px solid var(--border); border-radius: var(--r); font-size: .88rem; font-weight: 700; color: var(--txt); transition: all .3s; }
        .pr-btn-gh-outline:hover { background: var(--surf); border-color: var(--acc); transform: translateY(-2px); box-shadow: 0 10px 30px -10px rgba(99,102,241,0.2); }

        /* ─ Skills ─ */
        .pr-skills-wrap{display:flex;flex-wrap:wrap;gap:.65rem;}
        .pr-skill{font-size:.82rem;font-weight:600;color:var(--mute);border:1px solid var(--border);padding:.45rem .95rem;border-radius:8px;cursor:default;transition:all .2s;}
        .pr-skill:hover{color:var(--txt);border-color:var(--acc);background:var(--acc-dim);}

        /* ─ Two col ─ */
        .pr-two-col{display:grid;grid-template-columns:1fr 1fr;gap:5rem;}

        /* ─ Credentials Bento ─ */
        .pr-bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .pr-bento-card { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 2rem; position: relative; overflow: hidden; display: flex; flex-direction: column; transition: all .3s; }
        .pr-bento-card:hover { border-color: var(--acc); transform: translateY(-2px); }
        
        .pr-bento-main-edu { grid-column: span 2; grid-row: span 1; justify-content: center; background: linear-gradient(135deg, var(--surf), #0d0d1a); }
        .pr-bento-tag { position: absolute; top: 1.5rem; left: 2rem; font-family: monospace; font-size: .6rem; letter-spacing: .2em; color: var(--mute2); font-weight: 800; }
        .pr-bento-edu-content { display: flex; gap: 2rem; align-items: center; margin-top: 1rem; }
        .pr-bento-icon-lg { width: 70px; height: 70px; background: var(--acc-dim); color: var(--acc); border-radius: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(99,102,241,0.2); }
        .pr-bento-yr { display: block; font-family: monospace; font-size: .75rem; color: var(--acc); font-weight: 800; margin-bottom: .2rem; }
        .pr-bento-txt h3 { font-size: 1.6rem; font-weight: 900; letter-spacing: -.03em; margin-bottom: .4rem; }
        .pr-bento-txt p { font-size: .9rem; color: var(--mute); line-height: 1.5; font-weight: 500; }
        .pr-bento-bg-glow { position: absolute; bottom: -20%; right: -10%; width: 140px; height: 140px; background: var(--acc); filter: blur(80px); opacity: 0.15; pointer-events: none; }

        .pr-bento-honor { grid-column: span 1; background: rgba(251, 191, 36, 0.03); border-color: rgba(251, 191, 36, 0.15); }
        .pr-bento-honor:hover { border-color: #FBBF24; }
        .pr-bento-honor .pr-bento-icon-sm { color: #FBBF24; }
        .pr-bento-honor h3 { font-size: 1.25rem; font-weight: 900; margin: 1rem 0 .4rem; }
        .pr-bento-honor p { font-size: .78rem; font-weight: 600; color: var(--mute); line-height: 1.4; }
        .pr-honor-badge { margin-top: auto; align-self: flex-start; background: #fbbf24; color: #000; font-size: .55rem; font-weight: 900; padding: .25rem .6rem; border-radius: 4px; letter-spacing: .1em; }

        .pr-bento-stat { grid-column: span 1; }
        .pr-stat-val { font-size: 2.5rem; font-weight: 900; color: var(--acc); margin: .5rem 0 .2rem; letter-spacing: -.05em; }
        .pr-bento-stat p { font-size: .78rem; font-weight: 600; color: var(--mute); }
        .pr-bento-icon-sm { color: var(--acc); }

        .pr-bento-cert-deck { grid-column: span 4; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        .pr-bento-tile { background: var(--surf); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; gap: .7rem; transition: all .3s; }
        .pr-bento-tile:hover { border-color: var(--acc); background: var(--surf2); }
        
        .pr-tile-head { display: flex; justify-content: space-between; align-items: center; }
        .pr-tile-n { font-family: monospace; font-size: .55rem; color: var(--mute2); font-weight: 800; }
        .pr-tile-icon { color: var(--acc); opacity: .6; }
        .pr-tile-name { font-size: .88rem; font-weight: 800; line-height: 1.3; color: var(--txt); height: 2.4rem; display: flex; align-items: center; }
        .pr-tile-meta { display: flex; flex-direction: column; }
        .pr-tile-issuer { font-family: monospace; font-size: .55rem; font-weight: 900; color: var(--mute); text-transform: uppercase; letter-spacing: .05em; }
        .pr-tile-yr { font-size: .65rem; font-weight: 700; color: var(--mute2); }
        .pr-tile-check { font-size: .5rem; font-weight: 900; color: #10B981; letter-spacing: .1em; display: flex; align-items: center; gap: .3rem; margin-top: .4rem; border-top: 1px solid var(--border); padding-top: .6rem; }

        @media (max-width: 1100px) {
          .pr-bento-cert-deck { grid-template-columns: repeat(3, 1fr); }
          .pr-bento-main-edu { grid-column: span 4; }
          .pr-bento-honor, .pr-bento-stat { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .pr-bento-cert-deck { grid-template-columns: repeat(2, 1fr); }
          .pr-bento-honor, .pr-bento-stat { grid-column: span 4; }
          .pr-bento-edu-content { flex-direction: column; text-align: center; gap: 1rem; }
        }
        @media (max-width: 480px) {
          .pr-bento-cert-deck { grid-template-columns: 1fr; }
        }

        /* ─ Contact ─ */
        .pr-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:6rem;align-items:start;}
        .pr-contact-h{font-size:clamp(2.8rem,4.5vw,4.25rem);font-weight:900;letter-spacing:-.05em;line-height:.95;margin:1rem 0 1.5rem;}
        .pr-contact-p{font-size:.95rem;color:var(--mute);line-height:1.75;margin-bottom:2rem;}
        .pr-contact-links{display:flex;flex-direction:column;gap:1.1rem;}
        .pr-clink{display:flex;align-items:center;gap:.85rem;font-size:.88rem;font-weight:600;color:var(--mute);transition:color .2s;}
        .pr-clink:hover{color:var(--acc);}
        .pr-form{display:flex;flex-direction:column;gap:1.1rem;}
        .pr-form-row{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem;}
        .pr-fg{display:flex;flex-direction:column;gap:.45rem;}
        .pr-fg label{font-size:.63rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);}
        .pr-fg input,.pr-fg textarea{background:var(--surf2);border:1px solid var(--border);border-radius:var(--rsm);padding:.8rem 1rem;color:var(--txt);font-size:.88rem;font-family:inherit;outline:none;transition:border-color .2s;resize:none;}
        .pr-fg input:focus,.pr-fg textarea:focus{border-color:var(--acc);}
        .pr-submit{display:flex;align-items:center;justify-content:center;gap:.6rem;padding:.95rem;background:var(--acc);color:#fff;border:none;border-radius:var(--rsm);font-weight:800;font-size:.82rem;cursor:pointer;transition:opacity .2s,transform .2s;}
        .pr-submit:hover{opacity:.88;transform:translateY(-1px);}
        .pr-submit:disabled{opacity:.6;cursor:not-allowed;}
        
        .pr-form-msg{font-size:.78rem;font-weight:700;margin-top:1rem;text-align:center;}
        .pr-form-msg.success{color:#10B981;}
        .pr-form-msg.error{color:#EF4444;}

        /* ─ Footer ─ */
        .pr-footer{border-top:1px solid var(--border);padding:1.75rem 0;}
        .pr-footer-inner{display:flex;align-items:center;justify-content:space-between;}
        .pr-foot-brand{font-weight:900;font-size:1.1rem;letter-spacing:-.04em;}
        .pr-foot-copy{font-size:.72rem;color:var(--mute);font-weight:600;}
        .pr-foot-socials{display:flex;gap:1.1rem;}
        .pr-foot-icon{color:var(--mute);transition:color .2s;}
        .pr-foot-icon:hover{color:var(--acc);}

        /* ─ Responsive ─ */
        @media (max-width: 1024px) {
          .pr-main-layout{grid-template-columns: 1fr; overflow-x: hidden;}
          .pr-sidebar{height:auto;border-right:none;border-bottom:1px solid var(--border);padding:1.25rem 1rem;position:fixed;width:100%;top:0;z-index:1000;background:rgba(4,4,10,0.8);backdrop-filter:blur(10px);}
          .pr-sidebar-nav{display:none;}
          .pr-sidebar-footer{display:none;}
          .pr-content{padding:7rem 1.25rem 3.5rem;}
          .pr-nav{top:0;padding:1rem 1.5rem;background:rgba(4,4,10,0.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);}
          .pr-nav-center{display:none;}
          .pr-nav-desktop-links{display:none;}
        }

        @media (max-width: 768px) {
          .pr-hero{padding:2rem 1rem 3rem; text-align: center; gap: 2rem;}
          .pr-hero-grid{grid-template-columns:1fr; gap: 3rem;}
          .pr-hero-h1{font-size:clamp(2.5rem, 11vw, 3.8rem); line-height:1; letter-spacing:-0.04em; margin-bottom: 1.25rem;}
          .pr-eyebrow-pill{
            display:inline-flex;
            align-items:center;
            justify-content: center;
            gap:.6rem;
            margin: 0 auto 1.5rem;
            padding: 0.6rem 1.1rem;
            line-height: normal;
            vertical-align: middle;
          }
          .pr-dot-acc{width: 7px; height: 7px; align-self: center; transform: translateY(1px);}
          
          .pr-hero-p{margin: 0 auto 2.25rem; font-size:0.95rem; max-width: 320px; line-height: 1.6;}
          .pr-hero-btns{justify-content:center; gap: 0.75rem; flex-direction: column-reverse; width: 100%; max-width: 320px; margin: 0 auto 2.5rem;}
          .pr-btn-primary, .pr-btn-ghost{width: 100%; justify-content: center; padding: 0.85rem; font-size:0.88rem;}
          
          .pr-hero-stats{justify-content:center; gap: 1.5rem; flex-wrap:wrap; margin-top: 1rem; border-top: 1px solid var(--border); padding-top: 2rem;}
          .pr-photo-wrap{width:min(260px, 85%); margin:0 auto;}
          
          .pr-exp-wrap{grid-template-columns: 1fr; gap: 1.5rem;}
          .pr-exp-tabs{
            flex-direction:row; 
            overflow-x:auto; 
            padding-bottom: 0.5rem; 
            border-bottom: 1px solid var(--border);
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .pr-exp-tabs::-webkit-scrollbar { display: none; }
          .pr-exp-tab{border-left:none; border-bottom:2px solid transparent; padding: 0.75rem 1rem; white-space: nowrap;}
          .pr-exp-tab.active{border-bottom-color:var(--acc); background: var(--surf2);}
          
          .pr-proj-grid{grid-template-columns: 1fr; gap: 1.5rem;}
          .pr-proj-card:first-child{grid-column: span 1;}
          
          .pr-bento-grid{display: flex; flex-direction: column; gap: 1.25rem;}
          .pr-bento-card, .pr-bento-main-edu, .pr-bento-honor, .pr-bento-stat, .pr-bento-cert-deck{grid-column: span 4 !important; width: 100% !important; padding: 1.75rem 1.5rem !important;}
          .pr-bento-edu-content{flex-direction:column !important; text-align:center !important; gap: 1.5rem; align-items: center;}
          .pr-bento-icon-lg{width:55px; height:55px;}
          .pr-bento-txt h3{font-size:1.2rem;}
          .pr-bento-cert-deck{display: grid; grid-template-columns: 1fr; gap: 0.85rem;}
          
          .pr-section{padding:4rem 0;}
          .pr-h2{font-size:2rem; text-align: center; margin-bottom: 2rem;}
          .pr-contact-grid{grid-template-columns:1fr; gap: 3.5rem;}
          .pr-contact-h{font-size:2.3rem; text-align:center;}
          .pr-form-row{grid-template-columns: 1fr;}
          
          .pr-sidebar{height: 60px; padding: 0 1.5rem; flex-direction: row; align-items: center; background: rgba(4,4,10,0.85) !important; backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); position: fixed; top: 0; left: 0; width: 100%; z-index: 2000;}
          .pr-content{padding: 60px 1rem 2rem;}

          .pr-hire-btn{width:auto; padding:0.5rem 1rem; font-size:0.85rem; height: 36px;}
          .pr-footer-inner{flex-direction:column; gap: 1.5rem; text-align:center;}
          .pr-foot-socials{justify-content: center;}
        }

        @media (max-width: 420px) {
          .pr-hero-h1{font-size: 2rem; letter-spacing: -0.05em;}
          .pr-hero-p{font-size: 0.85rem; line-height: 1.5; color: var(--mute);}
          .pr-bento-card{padding: 1.5rem 1rem !important;}
          .pr-stat-val { font-size: 1.85rem; }
          .pr-eyebrow-pill { font-size: 0.62rem; }
        }

        @media (max-width: 480px) {
          .pr-hero-h1{font-size:2.25rem;}
          .pr-content{padding:6rem 0.75rem 2rem;}
          .pr-form-row{grid-template-columns:1fr;}
        }
      `}</style>
    </div>
  );
}
