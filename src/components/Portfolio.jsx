import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight,
  Cpu, Database, Server, Award, Download,
  ArrowRight, Code, Globe,
  Briefcase, GraduationCap, Trophy, CheckCircle2,
  TrendingUp, Target, Zap, Calendar, MapPin, Building2,
  Phone, Star, ChevronRight, Layers, ShieldCheck
} from 'lucide-react';
import profileImg from "../assets/profile.png";
import Terminal from './Terminal';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ─────────────────── DATA ─────────────────── */
const EXPERIENCES = [
  {
    title: "Backend Team Lead Intern",
    company: "URM Enroll",
    type: "Internship",
    location: "Remotely, Berlin",
    period: "January 2026 – February 2026",
    description: "Leading backend architecture and AI integration for a multi-tenant SaaS platform connecting international students and nurses with German universities and hospitals.",
    achievements: [
      "Architected PostgreSQL 16 database with Row-Level Security (RLS) ensuring secure multi-tenant isolation and GDPR-compliant data handling across 10+ core entities.",
      "Built AI-powered CV parsing pipeline using Edge Functions (Deno/TypeScript) and LLM integration, achieving 70% structured data extraction accuracy.",
      "Developed weighted matching engine (0–100 scoring) combining eligibility constraints and performance-based criteria to optimize applicant placement.",
      "Implemented automated eligibility verification and compliance tracking system processing 500+ documents with audit logging."
    ],
    tech: ["Supabase", "Deno", "TypeScript", "PostgreSQL", "NestJs", "REST API's"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "ADADK",
    type: "Internship",
    location: "Remotely, Berlin",
    period: "December 2025 – January 2026",
    description: "Engineered an IoT-based smart water management system that enabled real-time monitoring and automated leak detection for property managers, reducing water waste incidents.",
    achievements: [
      "Developed RESTful APIs for IoT device lifecycle management, enabling seamless telemetry ingestion and real-time processing for 100+ connected devices.",
      "Architected PostgreSQL relational database supporting multitenancy across users, properties, zones, devices, and technicians with optimized query performance.",
      "Built real-time alerts and notifications using WebSockets (Socket.io) and Redis delivering instant notifications for anomaly detection and threshold breaches.",
      "Implemented enterprise-grade security JWT authentication, Google OAuth, and role-based for secure multi-role access control."
    ],
    tech: ["NestJs", "TypeScript", "PostgreSQL", "TypeORM", "Socket.io", "Redis", "JWT", "OAuth"],
  },
  {
    title: "Project Management and Support Intern",
    company: "INJAZ Lebanon",
    type: "Internship",
    location: "Beirut, Lebanon",
    period: "November 2025 – December 2025",
    description: "Streamlined program operation and supplier coordination for youth entrepreneurship initiatives, improving project delivery timelines and reducing manual overhead.",
    achievements: [
      "Developed Python automation script using Pandas and OpenPyXL to process student registration data, reducing manual data entry by 40%.",
      "Coordinated supplier documentations and finalized partnership agreements in post-scale capacity, ensuring 100% on-time delivery.",
      "Supported daily operations (data entry, scheduling, documentation), improving workflow efficiency and team productivity.",
      "Managed tracking for 200+ student records and generated compliance reports."
    ],
    tech: ["Python", "Pandas", "OpenPyXL", "Google Sheets API", "Excel", "Data Analytics"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "IDS Fintech",
    type: "Internship",
    location: "Beirut, Lebanon",
    period: "July 2024 – August 2024",
    description: "Contributed to fintech application development focused on improving transaction processing performance and user engagement for banking clients.",
    achievements: [
      "Optimized database interactions and query performance using SQL, ADO.NET, EF, and Dapper, reducing API response times by 35%.",
      "Developed full-stack features using C#, JavaScript, JQuery, Angular and DevExtreme, delivering responsive UI components and business logic.",
      "Increased user engagement by 30% through improved data handling and application responsiveness.",
      "Collaborated on technical specifications for banking dashboard features."
    ],
    tech: ["C#", ".Net", "Angular", "JavaScript", "jQuery", "DevExtreme", "SQL Server", "Entity Framework", "Dapper", "ADO.NET", "REST APIs"],
  },
];

const PROJECTS = [
  {
    title: "Fillia",
    category: "Award-Winning Capstone",
    description: "A donation and sales platform aiding crisis-affected Lebanese communities, featuring AI-powered verification, fraud detection, and personalized matching algorithms.",
    impact: "Increased matching success by 22% and accelerated case submissions by 15%.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "Cosine Similarity", "AI", "Docker", "Jest"],
    features: [
      "AI-powered verification and fraud detection",
      "Personalized matching (Cosine Similarity)",
      "Trust verification and image validation",
      "Responsive design with high performance"
    ],
    metrics: { matching: "+22%", submission: "+15%", tech: "MERN Stack" },
    link: "#",
    github: "#",
    accent: "#6c63ff",
  },
  {
    title: "Table Booking System",
    category: "Full-Stack Web App",
    description: "Restaurant reservation system with real-time availability updates, admin dashboard, user authentication, and secure booking confirmation.",
    impact: "Streamlined reservation management with cloud-sync.",
    tech: ["Angular", "TypeScript", "HTML/CSS", "Bootstrap", ".NET Core", "Entity Framework", "Azure", "SQL Server"],
    features: [
      "Real-time availability updates",
      "Admin dashboard for reservation management",
      "User authentication and notifications",
      "Secure cloud-integrated booking"
    ],
    metrics: { stack: ".NET/Angular", cloud: "Azure", DB: "SQL Server" },
    link: "#",
    github: "#",
    accent: "#43e8d8",
  },
  {
    title: "Buildings Management System",
    category: "Enterprise Platform",
    description: "Property management platform with role-based authentication, allowing efficient management of residential complexes and automated admin workflows.",
    impact: "Automated administrative search and creation workflows.",
    tech: ["Flask", "SQLAlchemy", "MySQL", "Angular", "Angular Material", "JWT", "Repository Pattern"],
    features: [
      "Role-based (Super Admin / Admin) authentication",
      "Efficient search and pagination",
      "Automated administrative creation",
      "RESTful API with Repository Pattern"
    ],
    metrics: { auth: "RBAC", DB: "MySQL", UI: "Angular" },
    link: "#",
    github: "#",
    accent: "#ff6584",
  },
  {
    title: "Waltrack",
    category: "Personal Finance",
    description: "Financial management app with transaction categorization, detailed expense history, and interactive data visualizations for spend analysis.",
    impact: "Helping users analyze spending patterns and improve budgeting.",
    tech: ["ASP.NET Core MVC", "C#", "SQL Server", "Syncfusion UI", "HTML5", "CSS3", "JavaScript"],
    features: [
      "Transaction categorization",
      "Interactive data visualizations",
      "Expense history tracking",
      "Budget management tools"
    ],
    metrics: { framework: "MVC", UI: "Syncfusion", lang: "C#" },
    link: "#",
    github: "#",
    accent: "#f59e0b",
  },
];

const SKILLS = [
  {
    title: "Core Programming",
    icon: Cpu,
    items: ["JavaScript", "TypeScript", "C#", "Python", "PHP (Basic)"],
  },
  {
    title: "Frontend Engineering",
    icon: Code,
    items: ["React.js", "Next.js", "Angular", "DevExtreme", "Tailwind CSS", "Bootstrap", "Framer Motion", "Syncfusion UI"],
  },
  {
    title: "Backend & Systems",
    icon: Server,
    items: ["Node.js", "Express.js", "ASP.NET", "Flask", "Nest.js", "WebSockets (Socket.io)"],
  },
  {
    title: "Database & ORM",
    icon: Database,
    items: ["PostgreSQL", "SQL Server", "MongoDB Atlas", "MySQL", "SQLAlchemy", "TypeORM", "Supabase", "Entity Framework"],
  },
  {
    title: "Tools & Infrastructure",
    icon: Globe,
    items: ["Git", "Docker", "Azure", "Postman", "SSMS", "MySQL Workbench", "Jupyter", "Redis"],
  },
  {
    title: "Principles & Methodologies",
    icon: Layers,
    items: ["MVC", "SOLID", "RESTful APIs", "Agile (Scrum/Kanban)", "Problem-Solving", "Clean Code"],
  },
];

const CERTIFICATIONS = [
  {
    name: "Ready4Work",
    issuer: "INJAZ Lebanon",
    year: "Sept 2025",
    description: "Career readiness and workforce entry preparation.",
    link: "https://credential.net/AA25095481",
    color: "#6c63ff",
  },
  {
    name: "Generation AI",
    issuer: "eFlow.ai, Google.org",
    year: "Sept 2025",
    description: "Credential for AI implementation and strategy.",
    link: "https://credential.net/SxnRVzpgW6-iy",
    color: "#43e8d8",
  },
  {
    name: "Clean and Scalable Code",
    issuer: "Software Engineering Excellence",
    year: "Aug 2025",
    description: "Scalable architecture and clean engineering principles.",
    link: "https://learn.se2.dev/certificates/cert-dsc0d810c",
    color: "#ff6584",
  },
  {
    name: "Entrepreneurship and AI",
    issuer: "Ektidar Project",
    year: "July 2025",
    description: "Integration of AI in entrepreneurial ventures.",
    link: "https://credential.net/1R5YBnBQUxPbi",
    color: "#f59e0b",
  },
  {
    name: "Prompt Engineering",
    issuer: "Tech Trendy",
    year: "July 2025",
    description: "Advanced generative AI prompt engineering techniques.",
    link: "https://credential.net/pBUYmniEWcje1",
    color: "#43e8d8",
  },
  {
    name: "Foundational C#",
    issuer: "Microsoft | freeCodeCamp",
    year: "July 2025",
    description: "Official certification for C# and .NET fundamentals.",
    link: "https://www.freecodecamp.org/certification/alaa_asaad-fcswm",
    color: "#6c63ff",
  },
  {
    name: "MERN Stack Development",
    issuer: "Udemy",
    year: "May 2025",
    description: "Full-stack development with MongoDB, Express, React, and Node.",
    link: "https://www.udemy.com/certificate/UC-4dc27feb-8648-4a67-835a-155ecc0376ce/",
    color: "#ff6584",
  },
  {
    name: "Frontend Developer (React)",
    issuer: "HackerRank",
    year: "May 2025",
    description: "Intermediate React proficiency and engineering performance.",
    link: "https://www.hackerrank.com/certificates/1c0cf525e0b",
    color: "#f59e0b",
  },
  {
    name: "PHP Boot Camp",
    issuer: "Udemy",
    year: "Dec 2024",
    description: "Fundamental PHP and MySQL database management.",
    link: "https://www.udemy.com/certificate/UC-91941e06-7bc8-4a64-9278-64ac6b61e68e",
    color: "#43e8d8",
  },
  {
    name: "React JavaScript",
    issuer: "Alison",
    year: "Oct 2024",
    description: "Building dynamic interfaces with React and JS.",
    link: "https://alison.com/certificate/1ymUjGYNAvTy1YwB_drC62lxmdhHQVz5d",
    color: "#6c63ff",
  },
];

const MARQUEE_WORDS = [
  "React", "Angular", "Next.js", "Node.js", "Nest.js", "C#", ".NET Core", "ASP.NET",
  "TypeScript", "JavaScript", "PostgreSQL", "SQL Server", "MongoDB", "MySQL",
  "Deno", "Docker", "Azure", "Python", "Pandas", "REST APIs", "SQL", "TypeORM",
];

/* ─────────────────── COMPONENT ─────────────────── */
const Portfolio = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  const marqueTrack1 = useRef(null);
  const marqueTrack2 = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  /* ── Mouse tracking ── */
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ── GSAP master timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero stagger */
      gsap.from('.hero-title', {
        y: 120, opacity: 0, duration: 1.4, ease: 'power4.out', stagger: 0.1,
      });
      gsap.from('.hero-sub', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6,
      });
      gsap.from('.hero-cta', {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.9, stagger: 0.12,
      });

      /* Floating blobs */
      gsap.to('.floating-blob', {
        y: -50, duration: 5, repeat: -1, yoyo: true, ease: 'power1.inOut', stagger: 0.6,
      });

      /* Marquee infinite scroll */
      if (marqueTrack1.current) {
        gsap.to(marqueTrack1.current, {
          x: '-50%', duration: 30, ease: 'none', repeat: -1,
        });
      }
      if (marqueTrack2.current) {
        gsap.to(marqueTrack2.current, {
          x: '0%', duration: 25, ease: 'none', repeat: -1,
          startAt: { x: '-50%' },
        });
      }

      /* Scroll-reveal: experience cards */
      gsap.utils.toArray('.experience-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none reverse' },
          x: i % 2 === 0 ? -80 : 80, opacity: 0, duration: 1, ease: 'power3.out',
        });
      });

      /* Scroll-reveal: project cards */
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
          y: 80, opacity: 0, duration: 1, ease: 'power3.out', delay: i * 0.07,
        });
      });

      /* Scroll-reveal: skill cards */
      gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
          scale: 0.85, opacity: 0, duration: 0.7, ease: 'back.out(1.4)', delay: i * 0.06,
        });
      });

      /* Scroll-reveal: cert cards */
      gsap.utils.toArray('.cert-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.08,
        });
      });

      /* Animated stat counters */
      gsap.utils.toArray('.stat-number').forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.from(stat, {
          scrollTrigger: { trigger: stat, start: 'top 80%' },
          textContent: 0, duration: 2.5, ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate() { stat.textContent = Math.ceil(this.targets()[0].textContent); },
        });
      });

      /* Parallax hero image */
      gsap.to('.hero-image', {
        scrollTrigger: { trigger: heroRef.current, scrub: true },
        y: 60,
      });

      /* Section heading reveals */
      gsap.utils.toArray('.section-heading').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Magnetic effect ── */
  const handleMagneticMove = (e) => {
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    gsap.to(b, {
      x: (e.clientX - r.left - r.width / 2) * 0.35,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
      duration: 0.3, ease: 'power2.out',
    });
  };
  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' });
  };

  /* ── Spotlight card effect ── */
  const handleSpotlight = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className="relative w-full bg-dark-bg selection:bg-brand-primary selection:text-white">
      <div className="noise" />
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Custom cursor */}
      <div
        className="custom-cursor hidden lg:flex items-center justify-center p-0"
        style={{
          left: mousePos.x, top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
        }}
      >
        {isHovering && <ArrowUpRight size={10} className="text-black" />}
      </div>
      <div
        className="cursor-follower hidden lg:block"
        style={{
          left: mousePos.x, top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      {/* ═══════════════════ NAV ═══════════════════ */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-brand-primary/30 group-hover:rotate-12 transition-transform">
              A
            </div>
            <span className="text-white font-black tracking-tighter text-xl">
              ASAAD<span className="text-brand-primary">.</span>
            </span>
          </motion.div>
        </div>

        <div className="pointer-events-auto hidden md:flex items-center bg-dark-bg/40 backdrop-blur-2xl border border-white/5 rounded-2xl px-2 py-2">
          {[['#about', 'About'], ['#work', 'Experience'], ['#projects', 'Work'], ['#skills', 'Stack']].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {label}
            </a>
          ))}
          <div className="ml-4 pr-2">
            <a 
              href="#contact" 
              className="px-6 py-2 bg-brand-primary rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-md shadow-brand-primary/20 hover:scale-105 transition-transform"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden dot-bg" ref={heroRef}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-16 items-center">
            
            <div className="space-y-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="section-label">Full Stack Developer</span>
                  <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight">
                  <span className="hero-title block text-slate-500">ENGINEERING</span>
                  <span className="hero-title block text-gradient">DIGITAL</span>
                  <span className="hero-title block">EXPERIENCES</span>
                </h1>

                <p className="hero-sub text-xl text-slate-400 max-w-xl leading-relaxed font-medium">
                  I architect <span className="text-white">scalable backends</span> and 
                  <span className="text-white"> silky-smooth frontends</span>. 
                  Specialized in modern ecosystems like .NET, React, and AI-driven automation.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-6 hero-cta">
                <a
                  href="#projects"
                  className="group relative px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 overflow-hidden"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="relative z-10">View Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-brand-primary transition-all duration-300 -z-0" />
                </a>
                
                <a
                  href="/Alaa Asaad_CV.pdf"
                  download
                  className="group px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white flex items-center gap-3 hover:bg-white/10 transition-all"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Download className="w-4 h-4 text-brand-primary group-hover:animate-bounce" />
                  Download CV
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-12 pt-12 border-t border-white/5 hero-cta">
                {[
                  { target: 2, label: 'Years Exp.' },
                  { target: 15, label: 'Projects' },
                  { target: 99, label: 'Success' },
                ].map(({ target, label }) => (
                  <div key={label} className="space-y-1">
                    <div className="flex items-end">
                      <span className="stat-num text-5xl" data-target={target}>0</span>
                      <span className="text-brand-primary font-bold text-xl mb-2.5">+</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                {/* Decorative Elements */}
                <div className="absolute -inset-10 border border-white/5 rounded-full animate-spin-slow" />
                <div className="absolute -inset-20 border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />
                
                {/* Main Container */}
                <div className="relative w-full h-full glass-card overflow-hidden p-4 rotate-3 group hover:rotate-0 transition-transform duration-700">
                  <div className="w-full h-full bg-dark-bg rounded-[1.5rem] overflow-hidden relative">
                    <img
                      src={profileImg}
                      alt="Alaa Asaad"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 p-5 glass-card animate-float shadow-2xl">
                  <Code className="w-6 h-6 text-brand-primary" />
                </div>
                <div className="absolute bottom-10 -left-10 p-5 glass-card animate-float-slow shadow-2xl">
                  <Database className="w-6 h-6 text-brand-cyan" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Global Background Elements */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full floating-blob" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-cyan/10 blur-[120px] rounded-full floating-blob" style={{ animationDelay: '-5s' }} />
      </section>

      {/* ═══════════════════ INTERACTIVE TERMINAL ═══════════════════ */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
                <Zap className="w-4 h-4 text-brand-primary animate-pulse" />
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">System Interface</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white leading-tight">
                  Interact with the <span className="text-brand-primary">Kernel</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                  A dedicated console for the brave and the curious. Explore my professional footprint through direct system directives.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['help', 'profile', 'stack', 'contact'].map(cmd => (
                  <div 
                    key={cmd} 
                    className="group bg-white/2 flex items-center gap-4 p-5 glass-card border-white/5 hover:border-brand-primary/30 transition-all cursor-crosshair group"
                    onClick={() => {
                      // Handled by user in terminal
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/30 group-hover:bg-brand-primary group-hover:scale-150 transition-all" />
                    <code className="text-[10px] text-slate-400 group-hover:text-white font-bold uppercase tracking-[0.2em] transition-colors">{cmd}</code>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Security Note:</strong> This is a simulation of the AlaaOS kernel. All commands are executed within a sandboxed environment.
                </p>
              </div>
            </div>

            <div className="perspective-1000 relative">
              {/* Background Glow */}
              <div className="absolute -inset-10 bg-brand-primary/20 blur-[100px] rounded-full opacity-30 animate-pulse" />
              
              <motion.div
                whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
                className="relative z-10"
              >
                <Terminal />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 flex gap-4 hidden xl:flex">
                <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-brand-primary animate-loading" />
                </div>
                <div className="text-[10px] font-mono text-slate-600 uppercase">Buffer: 4.0k / 4.0k</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ MARQUEE ═══════════════════ */}
      <section className="py-12 bg-white/5 border-y border-white/5 relative overflow-hidden">
        <div className="flex whitespace-nowrap overflow-hidden italic select-none">
          <div ref={marqueTrack1} className="flex gap-16 py-4 items-center">
            {MARQUEE_WORDS.concat(MARQUEE_WORDS).map((word, i) => (
              <span key={i} className="text-4xl md:text-6xl font-black text-white/10 uppercase tracking-tighter hover:text-brand-primary transition-colors">
                {word}
                <span className="mx-8 text-brand-primary opacity-50">•</span>
              </span>
            ))}
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />
      </section>

      {/* ═══════════════════ VALUE PROPOSITION ═══════════════════ */}
      <section className="py-32 px-6 lg:px-12 relative bg-dark-bg/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 section-heading">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-[1px] bg-brand-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Value Proposition</span>
              <span className="w-8 h-[1px] bg-brand-primary" />
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
              BEYOND THE <span className="text-gradient">CODE</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "High Performance", desc: "Optimizing every byte for speed and user retention.", color: "text-brand-primary" },
              { icon: Server, title: "Scalable Core", desc: "Architecting backends that handle growth without friction.", color: "text-brand-cyan" },
              { icon: Target, title: "Outcome Driven", desc: "Alignment with business goals over pure technicalities.", color: "text-white" },
              { icon: Cpu, title: "AI Integrated", desc: "Leveraging LLMs and automation for modern efficiency.", color: "text-brand-primary" },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card spotlight p-8 group hover:translate-y-[-8px] transition-all duration-500"
                onMouseMove={handleSpotlight}
              >
                <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ EXPERIENCE ═══════════════════ */}
      <section id="work" className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            
            <div className="lg:sticky lg:top-40 lg:w-[400px]">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-brand-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Timeline</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                PROFESSIONAL <span className="text-gradient">JOURNEY</span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-md">
                A track record of engineering impact across educational tech and enterprise systems.
              </p>
            </div>

            <div className="flex-1 space-y-12 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 ml-[7px] hidden lg:block" />
              
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-0 lg:pl-10 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-brand-primary/20 border-2 border-brand-primary hidden lg:flex items-center justify-center transition-transform group-hover:scale-150">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  </div>

                  <div className="glass-card spotlight p-8 lg:p-10 group-hover:border-white/20 transition-all duration-300 ring-1 ring-white/5" onMouseMove={handleSpotlight}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                      <div>
                        <div className="text-brand-primary font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Building2 size={12} />
                          {exp.company}
                          <span className="text-white/20">•</span>
                          {exp.period}
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">{exp.title}</h3>
                      </div>
                      <span className="px-5 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/5 self-start">
                        {exp.type}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-2xl">
                      {exp.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      {exp.achievements.map((a, i) => (
                        <div key={i} className="flex gap-4 items-start group/item">
                          <div className="w-5 h-5 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-emerald-500/20 transition-colors">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                          </div>
                          <span className="text-slate-400 text-sm leading-relaxed">{a}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-8 border-t border-white/5">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-bold text-slate-400 border border-white/5 group-hover:border-brand-primary/20 transition-all">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROJECTS ═══════════════════ */}
      <section id="projects" className="py-32 px-6 lg:px-12 relative bg-white/[0.02]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-brand-cyan" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-cyan">Portfolio</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                FEATURED <span className="text-gradient">WORK</span>
              </h2>
            </div>
            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
              Selection of high-impact systems designed for scalability and performance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="glass-card spotlight p-8 flex flex-col h-full hover:translate-y-[-5px] transition-all duration-500 overflow-hidden" onMouseMove={handleSpotlight}>
                  {/* Floating Number */}
                  <div className="absolute top-8 right-8 text-7xl font-black text-white/[0.03] select-none pointer-events-none">
                    0{index + 1}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                      <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                        <Layers className="w-8 h-8 text-brand-primary" />
                      </div>
                      <div className="flex gap-3">
                        <a href={project.github} className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-xl">
                          <Github size={18} />
                        </a>
                        <a href={project.link} className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-cyan hover:text-white transition-all shadow-xl">
                          <ArrowUpRight size={18} />
                        </a>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-brand-primary transition-colors">{project.title}</h3>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary/60">{project.category}</div>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                      {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="p-4 bg-white/5 rounded-[1.25rem] border border-white/5 text-center group-hover:bg-brand-primary/5 transition-all">
                          <div className="text-xl font-black text-white mb-1">{value}</div>
                          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 bg-brand-primary/10 rounded-lg text-xs font-bold text-brand-primary/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SKILLS ═══════════════════ */}
      <section id="skills" className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-brand-cyan" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-cyan">Tech Arsenal</span>
              <span className="w-8 h-[1px] bg-brand-cyan" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
              CORE <span className="text-gradient">STACK</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map(({ title, icon: Icon, items }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card spotlight p-10 group"
                onMouseMove={handleSpotlight}
              >
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center group-hover:rotate-[15deg] transition-all duration-500">
                    <Icon className="w-7 h-7 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-brand-primary/10 hover:border-brand-primary/20 transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ EDUCATION & CERTIFICATIONS ═══════════════════ */}
      <section className="py-32 px-6 lg:px-12 relative bg-white/[0.01]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Education */}
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Foundation</span>
                </div>
                <h2 className="text-5xl font-black text-white tracking-tighter">ACADEMIC</h2>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card spotlight p-8 group border-l-4 border-l-brand-primary"
                  onMouseMove={handleSpotlight}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <GraduationCap className="w-7 h-7 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">B.S. in Computer Science</h3>
                      <p className="text-brand-primary font-bold mb-3">Al Maaref University (MU)</p>
                      <p className="text-xs text-slate-500 mb-4 tracking-widest uppercase">Oct 2021 – Feb 2025</p>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Focused on high-performance algorithms, system architecture, and full-stack engineering.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card spotlight p-8 group border-l-4 border-l-emerald-500"
                  onMouseMove={handleSpotlight}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Trophy className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Graduation Project Award</h3>
                      <p className="text-emerald-400 font-bold mb-3">3rd Place Distinction</p>
                      <p className="text-xs text-slate-500 mb-4 tracking-widest uppercase">Academic Year 2024–2025</p>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Recognized among the top engineering projects for technical complexity and innovative problem-solving.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-cyan" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-cyan">Validated Skills</span>
                </div>
                <h2 className="text-5xl font-black text-white tracking-tighter">CREDENTIALS</h2>
              </div>

              <div className="grid gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card spotlight p-5 group hover:border-white/10 transition-all cursor-default"
                    onMouseMove={handleSpotlight}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cert.color}15` }}>
                        <Award className="w-5 h-5" style={{ color: cert.color }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm group-hover:text-brand-primary transition-colors">{cert.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                          <span style={{ color: cert.color }}>{cert.issuer}</span>
                          <span className="text-slate-800">|</span>
                          <span>{cert.year}</span>
                        </div>
                      </div>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                        <ArrowUpRight size={14} className="text-slate-400 hover:text-white" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contact" className="py-40 px-6 lg:px-12 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 -z-10 bg-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-brand-primary/10 blur-[180px] rounded-full animate-pulse-soft" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-cyan/5 blur-[120px] rounded-full animate-float-slow" />
        </div>

        <div className="container mx-auto max-w-5xl">
          <div className="glass-card spotlight p-12 lg:p-24 text-center space-y-12 border-white/10" onMouseMove={handleSpotlight}>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3"
              >
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Available for New Projects</span>
              </motion.div>
              <h2 className="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-8">
                LET'S <span className="text-gradient">CREATE</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Whether it's a high-performance backend, an AI integration, or a full-scale web ecosystem, I'm ready to build it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <a
                href="mailto:alaa.b.asaad@gmail.com"
                className="magnetic-button group px-12 py-6 bg-brand-primary hover:bg-brand-primary/90 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-brand-primary/30"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <Mail size={18} />
                Send Inquiry
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="tel:+96181817756"
                className="magnetic-button group px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <Phone size={18} className="text-brand-primary" />
                Direct Link
              </a>
            </div>

            <div className="flex justify-center gap-6 pt-12">
              {[
                { Icon: Github, href: "https://github.com/AlaaAsaad03", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/alaa-asaad-505740355/", label: "LinkedIn" },
                { Icon: Download, href: "/Alaa Asaad_CV.pdf", label: "Resume", download: true },
              ].map(({ Icon, href, label, download }, i) => (
                <a
                  key={label}
                  href={href}
                  download={download}
                  target={!download ? "_blank" : undefined}
                  rel={!download ? "noopener noreferrer" : undefined}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
                  title={label}
                >
                  <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="py-12 px-6 lg:px-12 border-t border-white/5 bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center font-black text-brand-primary italic">
                A
              </div>
              <div>
                <div className="text-white font-black tracking-tighter text-lg -mb-1">ALAA ASAAD</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Full stack Architect</div>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <nav className="hidden lg:flex gap-8">
                {['Work', 'Projects', 'Skills', 'Contact'].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-primary transition-colors">
                    {link}
                  </a>
                ))}
              </nav>
              <div className="h-4 w-[1px] bg-white/10 hidden lg:block" />
              <p className="text-[11px] font-bold text-slate-500">
                © {new Date().getFullYear()} REF_ID: VER-3.2
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
