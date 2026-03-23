import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight,
  Cpu, Database, Server, Award, Download,
  ArrowRight, Code, Globe, Briefcase, GraduationCap,
  Trophy, CheckCircle2, TrendingUp, Target, Zap,
  Star, ChevronRight, Layers, Phone
} from 'lucide-react';
import profileImg from "../assets/profile.png";

/* ─── DATA ─── */
const EXP = [
  {
    num: "01", company: "URM Enroll", role: "Backend Team Lead Intern",
    period: "Jan 2026 – Feb 2026", location: "Berlin, Remote",
    highlights: ["PostgreSQL 16 + RLS for 10+ entity multi-tenant SaaS", "AI CV parsing via Deno Edge Functions — 70% accuracy", "Weighted matching engine 0–100 for student placement", "500+ documents processed with full audit logging"],
    tech: ["NestJS", "Supabase", "PostgreSQL", "Deno", "TypeScript"],
  },
  {
    num: "02", company: "ADADK", role: "Full Stack Developer Intern",
    period: "Dec 2025 – Jan 2026", location: "Berlin, Remote",
    highlights: ["RESTful APIs for 100+ IoT device lifecycle", "Multi-tenant PostgreSQL across properties & technicians", "Real-time alerts via Socket.io + Redis", "JWT & Google OAuth multi-role security"],
    tech: ["NestJS", "PostgreSQL", "Socket.io", "Redis", "TypeORM"],
  },
  {
    num: "03", company: "INJAZ Lebanon", role: "Project Management Intern",
    period: "Nov 2025 – Dec 2025", location: "Beirut",
    highlights: ["Python/Pandas automation — 40% less manual entry", "Compliance reports for 200+ student records", "100% on-time supplier delivery coordination"],
    tech: ["Python", "Pandas", "OpenPyXL", "Google Sheets API"],
  },
  {
    num: "04", company: "IDS Fintech", role: "Full Stack Developer Intern",
    period: "Jul 2024 – Aug 2024", location: "Beirut",
    highlights: ["SQL/EF optimisations — 35% API latency reduction", "Angular + DevExtreme UI features", "30% engagement lift via improved data handling"],
    tech: [".NET Core", "C#", "Angular", "SQL Server", "Dapper"],
  },
];

const PROJECTS = [
  {
    num: "01", title: "Fillia", cat: "Award-Winning Capstone",
    tag: "🥉 3rd Place · MU 2024–25",
    desc: "Donation platform for crisis-hit Lebanon with AI fraud detection, trust verification, and cosine-similarity matching — 22% better case-matching.",
    tech: ["React.js", "Node.js", "MongoDB", "Cosine Similarity", "Docker", "Jest"],
    stat1: "+22%", stat1l: "Match Rate", stat2: "+15%", stat2l: "Submissions",
    accent: "#cfff47",
  },
  {
    num: "02", title: "Smart Water Hub", cat: "IoT Full-Stack",
    tag: "Real-time Monitoring",
    desc: "IoT water management with WebSocket leak alerts, multitenant DB across 100+ devices, and enterprise JWT/OAuth access control.",
    tech: ["NestJS", "PostgreSQL", "Socket.io", "Redis", "TypeORM"],
    stat1: "100+", stat1l: "Devices", stat2: "Real-time", stat2l: "Alerts",
    accent: "#00d4ff",
  },
  {
    num: "03", title: "Table Booking", cat: "Full-Stack Web App",
    tag: "Cloud-Synced",
    desc: "Restaurant reservation engine with real-time availability, admin dashboard, notifications, and Azure-backed secure booking.",
    tech: ["Angular", ".NET Core", "SQL Server", "Azure", "EF Core"],
    stat1: "99.9%", stat1l: "Accuracy", stat2: "Azure", stat2l: "Cloud",
    accent: "#ff6b6b",
  },
  {
    num: "04", title: "Buildings Hub", cat: "Enterprise Platform",
    tag: "RBAC Secured",
    desc: "Property management with Super Admin / Admin RBAC, efficient search pagination, and automated admin creation workflows.",
    tech: ["Flask", "MySQL", "Angular", "SQLAlchemy", "JWT"],
    stat1: "RBAC", stat1l: "Security", stat2: "Auto", stat2l: "Workflow",
    accent: "#a78bfa",
  },
];

const SKILLS = {
  "Languages": ["JavaScript", "TypeScript", "C#", "Python", "PHP"],
  "Frontend": ["React.js", "Next.js", "Angular", "Tailwind CSS", "Framer Motion"],
  "Backend": ["Node.js", "NestJS", "ASP.NET", "Express.js", "Flask", "Socket.io"],
  "Databases": ["PostgreSQL", "MongoDB", "SQL Server", "MySQL", "Supabase", "Redis"],
  "Tools": ["Docker", "Azure", "Git", "Postman", "Figma", "Jira"],
  "Principles": ["SOLID", "REST APIs", "MVC", "Agile/Scrum", "Clean Code"],
};

const CERTS = [
  { name: "Generation AI", issuer: "Google.org / eFlow.ai", year: "2025", href: "#" },
  { name: "Clean & Scalable Code", issuer: "Software Engineering Excellence", year: "2025", href: "#" },
  { name: "Foundational C# with Microsoft", issuer: "Microsoft / freeCodeCamp", year: "2025", href: "#" },
  { name: "MERN Stack Development", issuer: "Udemy", year: "2025", href: "#" },
  { name: "Frontend Developer (React)", issuer: "HackerRank", year: "2025", href: "#" },
  { name: "Prompt Engineering", issuer: "Tech Trendy", year: "2025", href: "#" },
  { name: "Ready4Work", issuer: "INJAZ Lebanon", year: "2025", href: "#" },
  { name: "Entrepreneurship & AI", issuer: "Ektidar Project", year: "2025", href: "#" },
];

const NAV = ["About", "Work", "Projects", "Stack", "Contact"];

/* ─── MAIN COMPONENT ─── */
export default function FusionPortfolio() {
  const [activeExp, setActiveExp] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const reelRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const revealVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <div style={{ background: '#0c0c0c', color: '#f0f0f0', fontFamily: "'Syne', 'Inter', sans-serif", overflowX: 'hidden' }}>

      {/* ── Scroll Bar ── */}
      <motion.div style={{ scaleX: scrollYProgress, transformOrigin: 'left', position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: '#cfff47', zIndex: 999 }} />

      {/* ══════════ NAV ══════════ */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 900,
        background: scrolled ? 'rgba(12,12,12,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
        transition: 'all 0.4s ease', padding: '1.2rem 3rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.04em' }}>
          ALAA<span style={{ color: '#cfff47' }}>.</span>
        </span>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {NAV.slice(0, 4).map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = '#f0f0f0'} onMouseLeave={e => e.target.style.color = '#666'}>{n}</a>
          ))}
          <a href="#contact" style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0c0c0c', background: '#cfff47', padding: '0.6rem 1.4rem', borderRadius: '6px', textDecoration: 'none' }}>Hire Me</a>
        </div>
      </nav>

      {/* ══════════ HERO — BENTO EDITORIAL ══════════ */}
      <section id="about" style={{ minHeight: '100vh', padding: '10rem 3rem 6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Left: Giant title */}
        <div>
          <motion.div initial="hidden" animate="visible" variants={revealVariant}
            style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#cfff47', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 32, height: 1, background: '#cfff47', display: 'inline-block' }} />
            CS Graduate · Full-Stack Developer · Beirut, Lebanon
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            Building<br />
            <span style={{ color: '#cfff47' }}>Intelligent</span><br />
            Web<br />Experiences
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}
            style={{ fontSize: '1.1rem', color: '#777', lineHeight: 1.7, maxWidth: '460px', marginBottom: '3rem' }}>
            Full-stack engineer specializing in scalable backends, AI-driven automation, and modern frontend architecture — from Lebanon to Berlin.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#cfff47', color: '#0c0c0c', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none' }}>
              View Projects <ArrowRight size={16} />
            </a>
            <a href="#contact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #333', color: '#f0f0f0', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none' }}>
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right: Bento Grid */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto auto', gap: '1rem' }}>

          {/* Photo tile */}
          <div style={{ gridRow: '1 / 3', background: '#161616', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222', aspectRatio: '3/4', position: 'relative' }}>
            <img src={profileImg} alt="Alaa Asaad" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(transparent, rgba(12,12,12,0.9))' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#cfff47', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Alaa Asaad</div>
            </div>
          </div>

          {/* Status tile */}
          <div style={{ background: '#cfff47', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0c0c0c' }}>Status</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0c0c0c', display: 'inline-block' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0c0c0c' }}>Open to Work</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#333', fontWeight: 600 }}>Full-Time / Internship</span>
            </div>
          </div>

          {/* Award tile */}
          <div style={{ background: '#161616', border: '1px solid #222', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🥉</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#f0f0f0', marginBottom: '0.25rem' }}>3rd Place</div>
            <div style={{ fontSize: '0.6rem', color: '#555', fontWeight: 600, lineHeight: 1.4 }}>MU Best Graduation Project 2024–25</div>
          </div>

          {/* Stats tile */}
          <div style={{ gridColumn: '1 / 3', background: '#161616', border: '1px solid #222', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-around' }}>
            {[['4+', 'Internships'], ['15+', 'Projects'], ['10+', 'Certifications']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#cfff47', letterSpacing: '-0.04em' }}>{n}</div>
                <div style={{ fontSize: '0.6rem', color: '#555', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════ EXPERIENCE — SCROLLYTELLING ACCORDION ══════════ */}
      <section id="work" style={{ padding: '8rem 3rem', borderTop: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}
            style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '5rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#cfff47' }}>02 — Experience</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
              Professional Journey
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '4rem', alignItems: 'start' }}>
            {/* Selectors */}
            <div style={{ position: 'sticky', top: '8rem' }}>
              {EXP.map((e, i) => (
                <button key={i} onClick={() => setActiveExp(i)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '1.5rem', marginBottom: '0.5rem', background: activeExp === i ? '#1a1a1a' : 'transparent', border: `1px solid ${activeExp === i ? '#cfff47' : '#1e1e1e'}`, borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                  <span style={{ fontSize: '0.6rem', color: '#cfff47', fontWeight: 900, letterSpacing: '0.2em', display: 'block', marginBottom: '0.4rem' }}>{e.num}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 900, color: activeExp === i ? '#f0f0f0' : '#555', display: 'block', letterSpacing: '-0.02em', transition: 'color 0.3s' }}>{e.company}</span>
                  <span style={{ fontSize: '0.7rem', color: '#444', fontWeight: 600 }}>{e.period}</span>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
              <motion.div key={activeExp} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '3rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#cfff47', marginBottom: '0.75rem' }}>
                  {EXP[activeExp].location}
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>{EXP[activeExp].role}</h3>
                <p style={{ fontSize: '1.1rem', color: '#555', fontWeight: 700, marginBottom: '2rem' }}>@ {EXP[activeExp].company}</p>

                <div style={{ marginBottom: '2.5rem' }}>
                  {EXP[activeExp].highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.85rem 0', borderBottom: '1px solid #1a1a1a' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#cfff47', flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: '0.9rem', color: '#aaa', lineHeight: 1.6 }}>{h}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {EXP[activeExp].tech.map(t => (
                    <span key={t} style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.4rem 0.9rem', border: '1px solid #2a2a2a', borderRadius: '4px', color: '#666' }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════ PROJECTS — CINEMA HORIZONTAL SCROLL ══════════ */}
      <section id="projects" style={{ padding: '8rem 0', borderTop: '1px solid #1e1e1e', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 3rem', marginBottom: '3rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}
            style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#cfff47' }}>03 — Projects</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em' }}>Featured Work</h2>
          </motion.div>
          <p style={{ color: '#555', marginTop: '0.75rem', fontSize: '0.85rem' }}>Scroll horizontally →</p>
        </div>

        <div ref={reelRef} style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', padding: '1rem 3rem 2rem', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={revealVariant}
              style={{ flexShrink: 0, width: '460px', background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '3rem', scrollSnapAlign: 'start', transition: 'border-color 0.3s', cursor: 'default', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = p.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e1e'}>

              {/* Big ghost number */}
              <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '7rem', fontWeight: 900, color: '#161616', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{p.num}</div>

              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, marginBottom: '0.5rem' }}>{p.cat}</div>
                {p.tag && <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#555', display: 'block', marginBottom: '1.5rem' }}>{p.tag}</span>}

                <h3 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#777', lineHeight: 1.7, marginBottom: '2rem' }}>{p.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  {[[p.stat1, p.stat1l], [p.stat2, p.stat2l]].map(([v, l]) => (
                    <div key={l} style={{ background: '#0c0c0c', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: p.accent }}>{v}</div>
                      <div style={{ fontSize: '0.6rem', color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
                  {p.tech.map(t => <span key={t} style={{ fontSize: '0.6rem', fontWeight: 700, color: '#555', border: '1px solid #222', padding: '0.3rem 0.7rem', borderRadius: '4px' }}>{t}</span>)}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 700, color: '#555', textDecoration: 'none' }}><Github size={14} /> GitHub</a>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 700, color: p.accent, textDecoration: 'none' }}><ExternalLink size={14} /> Live</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════ SKILLS — ASYMMETRIC BENTO ══════════ */}
      <section id="stack" style={{ padding: '8rem 3rem', borderTop: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}
            style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#cfff47' }}>04 — Stack</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em' }}>Tech Universe</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1e1e1e', borderRadius: '16px', overflow: 'hidden' }}>
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <motion.div key={cat} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={revealVariant}
                style={{ background: '#0c0c0c', padding: '2.5rem', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#111'}
                onMouseLeave={e => e.currentTarget.style.background = '#0c0c0c'}>
                <div style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#cfff47', marginBottom: '1.25rem' }}>{cat}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map(s => (
                    <span key={s} style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666', padding: '0.4rem 0', transition: 'color 0.2s', cursor: 'default' }}
                      onMouseEnter={e => e.target.style.color = '#f0f0f0'} onMouseLeave={e => e.target.style.color = '#666'}>{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EDUCATION + CERTS ══════════ */}
      <section style={{ padding: '8rem 3rem', borderTop: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#cfff47', display: 'block', marginBottom: '1.5rem' }}>Education</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '3rem' }}>Academic Background</h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}
              style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#cfff47', marginBottom: '0.75rem' }}>Oct 2021 – Feb 2025</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>B.S. Computer Science</h3>
              <p style={{ color: '#555', fontWeight: 600, fontSize: '0.9rem' }}>Al Maaref University · Beirut, Lebanon</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={revealVariant}
              style={{ background: '#111', border: '1px solid #cfff47', borderRadius: '12px', padding: '2.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🥉</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>3rd Place · Best Graduation Project</h3>
              <p style={{ color: '#555', fontWeight: 600, fontSize: '0.85rem' }}>Al Maaref University · Academic Year 2024–25</p>
            </motion.div>
          </div>

          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#cfff47', display: 'block', marginBottom: '1.5rem' }}>Credentials</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '3rem' }}>Certifications</h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {CERTS.map((c, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5} variants={revealVariant}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.5rem', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px', transition: 'border-color 0.3s', cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#cfff47'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ddd', display: 'block' }}>{c.name}</span>
                    <span style={{ fontSize: '0.65rem', color: '#555', fontWeight: 600 }}>{c.issuer}</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: '#cfff47', fontWeight: 900 }}>{c.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT — FULL WIDTH DRAMATIC ══════════ */}
      <section id="contact" style={{ padding: '8rem 3rem', borderTop: '1px solid #1e1e1e', background: '#080808' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}>
            <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#cfff47', display: 'block', marginBottom: '2rem' }}>05 — Contact</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.92, marginBottom: '4rem' }}>
            Let's Build<br /><span style={{ color: '#cfff47' }}>Together.</span>
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '1.15rem', color: '#666', lineHeight: 1.7, marginBottom: '3rem' }}>
                Open to full-time roles, internships, and freelance collaborations. I bring fast iteration, clean architecture, and a genuine passion for solving hard problems.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: <Mail size={18} />, label: 'alaa.b.asaad@gmail.com', href: 'mailto:alaa.b.asaad@gmail.com' },
                  { icon: <Linkedin size={18} />, label: 'linkedin.com/in/alaa-asaad', href: 'https://linkedin.com/in/alaa-asaad-505740355/' },
                  { icon: <Github size={18} />, label: 'github.com/AlaaAsaad03', href: 'https://github.com/AlaaAsaad03' },
                ].map((item, i) => (
                  <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#555', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#cfff47'} onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                    {item.icon} {item.label}
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[['Name', 'text', 'Your name'], ['Email', 'email', 'your@email.com']].map(([label, type, ph]) => (
                <div key={label}>
                  <label style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444', display: 'block', marginBottom: '0.5rem' }}>{label}</label>
                  <input type={type} placeholder={ph} style={{ width: '100%', background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '1rem', color: '#f0f0f0', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#cfff47'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444', display: 'block', marginBottom: '0.5rem' }}>Message</label>
                <textarea rows={4} placeholder="Tell me about your project..." style={{ width: '100%', background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '1rem', color: '#f0f0f0', fontSize: '0.9rem', outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#cfff47'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
              </div>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: '#cfff47', color: '#0c0c0c', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ padding: '2rem 3rem', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '-0.02em' }}>ALAA<span style={{ color: '#cfff47' }}>.</span></span>
        <span style={{ fontSize: '0.65rem', color: '#333', fontWeight: 600 }}>© 2026 · Engineered for Intelligence</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['https://github.com/AlaaAsaad03', <Github size={16} />], ['https://linkedin.com/in/alaa-asaad-505740355/', <Linkedin size={16} />], ['mailto:alaa.b.asaad@gmail.com', <Mail size={16} />]].map(([href, icon], i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#333', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#cfff47'} onMouseLeave={e => e.currentTarget.style.color = '#333'}>{icon}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Inter:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0c0c0c; }
        ::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 4px; }
        ::selection { background: #cfff47; color: #0c0c0c; }
        a { color: inherit; }
        @media (max-width: 900px) {
          section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
