import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight, 
  Cpu, Database, Server, Download, Code, Globe,
  CheckCircle2, TrendingUp, Shield, Menu, X, 
  Zap, Target, Award, Star, Activity, Binary, 
  Layers, Package, MessageSquare, Terminal, 
  ChevronRight, Sparkles, Brain, FlaskConical, Layout
} from 'lucide-react';

import profileImg from "../assets/profile.png";
import heroBg from "../assets/hero_bg.png";
import filliaPreview from "../assets/fillia_preview.png";
import cvParsingPreview from "../assets/cv_parsing.png";
import waterMgmtPreview from "../assets/water_mgmt.png";

const CreativePortfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Handle scroll effect for navigation
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const projects = [
        {
            title: "Fillia",
            category: "AI & Full-Stack",
            image: filliaPreview,
            desc: "Award-winning donation and sales platform aiding crisis-affected communities. Features AI-powered verification, fraud detection, and personalized matching algorithms.",
            stack: ["React.js", "Node.js", "MongoDB", "AI (Cosine Similarity)", "Docker"],
            link: "#",
            metric: "22% matching success increase",
            award: "3rd Place Graduation Project Competition"
        },
        {
            title: "AI-Powered CV Parsing",
            category: "Backend & AI",
            image: cvParsingPreview,
            desc: "Built a high-performance parsing pipeline for a multi-tenant SaaS. Leverages LLMs and Edge Functions to structure unstructured resume data with 70% accuracy.",
            stack: ["Supabase", "Deno", "TypeScript", "LLM Integration", "PostgreSQL"],
            link: "#",
            metric: "70% structured data accuracy"
        },
        {
            title: "Smart Water Management",
            category: "IoT & Full-Stack",
            image: waterMgmtPreview,
            desc: "IoT-based system for real-time monitoring and automated leak detection. Real-time telemetry ingestion for 100+ connected devices.",
            stack: ["NestJs", "PostgreSQL", "Socket.io", "Redis", "TypeORM"],
            link: "#",
            metric: "Real-time anomaly detection"
        }
    ];

    const experience = [
        {
            company: "URM Enroll",
            role: "Backend Team Lead Intern",
            period: "Jan 2026 – Feb 2026",
            desc: "Architected core backend systems and AI-powered automation for international student recruitment."
        },
        {
            company: "ADADK",
            role: "Full Stack Developer Intern",
            period: "Dec 2025 – Jan 2026",
            desc: "Engineered smart water monitoring systems using IoT and real-time networking."
        },
        {
            company: "IDS Fintech",
            role: "Full Stack Developer Intern",
            period: "July 2024 – Aug 2024",
            desc: "Optimized banking transaction processing and built responsive UI components."
        }
    ];

    const skills = [
        { name: "React.js / Vite", category: "Frontend", icon: <Globe size={18} /> },
        { name: "Node.js / Express", category: "Backend", icon: <Server size={18} /> },
        { name: "MongoDB / SQL", category: "Database", icon: <Database size={18} /> },
        { name: "Python / AI", category: "AI & Tools", icon: <Cpu size={18} /> },
        { name: "Next.js", category: "Frontend", icon: <Layout size={18} /> },
        { name: "Nest.js", category: "Backend", icon: <Activity size={18} /> },
        { name: "Figma", category: "Design", icon: <FlaskConical size={18} /> },
        { name: "Docker", category: "DevOps", icon: <Package size={18} /> }
    ];

    const fadeInHeader = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggeringContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="portfolio-root">
            <div className="cosmic-glow"></div>
            
            {/* Navigation */}
            <header className={`nav-fixed ${scrolled ? 'nav-scrolled' : ''}`}>
                <div className="content-container nav-content">
                    <motion.div initial="hidden" animate="visible" variants={fadeInHeader} className="logo-area">
                        <span className="logo-text">ALAA<span className="text-gradient">ASAAD</span></span>
                    </motion.div>
                    
                    <nav className="desktop-nav">
                        {['About', 'Projects', 'Skills', 'Experience'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
                        ))}
                        <a href="#contact" className="nav-btn-contact glass-card">Contact Me</a>
                    </nav>

                    <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="mobile-overlay"
                    >
                        <div className="mobile-links">
                            {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                                <a 
                                    key={item} 
                                    href={`#${item.toLowerCase()}`} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="mobile-link"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main>
                {/* Hero Section */}
                <section id="hero" className="section hero-section" style={{ 
                    backgroundImage: `linear-gradient(rgba(3, 0, 20, 0.8), rgba(3, 0, 20, 0.8)), url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    <div className="content-container hero-content">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="hero-badge glass-card"
                        >
                            <Sparkles size={14} className="icon-pulse" />
                            <span>CS Graduate & Full-Stack Developer</span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="hero-headline"
                        >
                            Building <span className="text-gradient">Intelligent</span> <br /> 
                            Web Experiences
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="hero-subline"
                        >
                            Specializing in full-stack architecture, AI-powered automation, and high-performance system design. Transforming complex problems into scalable, user-centric solutions.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="hero-btns"
                        >
                            <a href="#projects" className="btn-primary">View Projects <ChevronRight size={18} /></a>
                            <a href="#contact" className="btn-secondary glass-card">Contact Me</a>
                        </motion.div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="section about-section">
                    <div className="content-container">
                        <div className="grid-2-col items-center">
                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="about-text-area"
                            >
                                <h2 className="section-title">Confident. Innovative. <span className="text-gradient">Problem Solver.</span></h2>
                                <p className="section-text">
                                    I am a Computer Science graduate with a deep passion for technology and its ability to solve real-world problems. My approach combines clean, intuitive frontend design with robust, scalable backend systems.
                                </p>
                                <p className="section-text">
                                    I thrive at the intersection of development and Artificial Intelligence, leveraging modern tools to create software that doesn't just work—it thinks and adapts.
                                </p>
                                
                                <div className="strength-grid">
                                    {[
                                        { title: "System Thinking", icon: <Brain size={20} /> },
                                        { title: "Performance Optimization", icon: <Zap size={20} /> },
                                        { title: "Clean UI/UX", icon: <Star size={20} /> },
                                        { title: "API Integration", icon: <Activity size={20} /> }
                                    ].map((s, i) => (
                                        <div key={i} className="strength-item glass-card">
                                            {s.icon}
                                            <span>{s.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, rotate: -5 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                className="about-visual glass-card"
                            >
                                <div className="terminal-header">
                                    <div className="dot red"></div>
                                    <div className="dot yellow"></div>
                                    <div className="dot green"></div>
                                </div>
                                <div className="terminal-content">
                                    <pre>
                                        <code>
{`class AlaaAsaad {
  constructor() {
    this.focus = "Full Stack & AI";
    this.mindset = "Problem Solver";
    this.status = "Innovating";
  }

  solve(challenge) {
    return cleanCode(robustBackend(challenge));
  }
}`}
                                        </code>
                                    </pre>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack Horizontal Section */}
                <section id="skills" className="section skills-section">
                    <div className="content-container">
                        <div className="text-center mb-12">
                            <h2 className="section-title">My <span className="text-gradient">Tech Universe</span></h2>
                        </div>
                        
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggeringContainer}
                            className="skills-flex"
                        >
                            {skills.map((skill, i) => (
                                <motion.div key={i} variants={fadeInUp} className="skill-chip glass-card">
                                    {skill.icon}
                                    <span>{skill.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="section projects-section">
                    <div className="content-container">
                        <h2 className="section-title mb-16">Featured <span className="text-gradient">Projects</span></h2>
                        
                        <div className="projects-grid">
                            {projects.map((p, i) => (
                                <motion.div 
                                    key={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className="project-card glass-card"
                                >
                                    <div className="project-image-container">
                                        <img src={p.image} alt={p.title} className="project-img" />
                                        <div className="project-overlay"></div>
                                    </div>
                                    <div className="project-card-content">
                                        <div className="project-header">
                                            <span className="project-cat">{p.category}</span>
                                            {p.award && <div className="project-award"><Award size={14} /> {p.award}</div>}
                                        </div>
                                        <h3 className="project-title">{p.title}</h3>
                                        <p className="project-desc">{p.desc}</p>
                                        
                                        <div className="project-tags">
                                            {p.stack.map((tag, j) => (
                                                <span key={j} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                        
                                        <div className="project-footer">
                                            <div className="metric-badge">
                                                <TrendingUp size={14} /> <span>{p.metric}</span>
                                            </div>
                                            <div className="project-links">
                                                <a href={p.link} className="project-link-icon"><Github size={18} /></a>
                                                <a href={p.link} className="project-link-icon active"><ExternalLink size={18} /></a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section contact-section">
                    <div className="content-container">
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="contact-card glass-card"
                        >
                            <div className="grid-2-col items-center">
                                <div className="contact-info">
                                    <h2 className="section-title">Ready to <span className="text-gradient">Innovate?</span></h2>
                                    <p className="section-text">
                                        I'm currently open for new opportunities and collaborations. Let's discuss how I can help bring your next intelligent web experience to life.
                                    </p>
                                    
                                    <div className="contact-links-list">
                                        <a href="mailto:alaa.b.asaad@gmail.com" className="contact-item">
                                            <div className="icon-circle shadow-blue"><Mail size={20} /></div>
                                            <span>alaa.b.asaad@gmail.com</span>
                                        </a>
                                        <a href="https://linkedin.com/in/alaa-asaad-505740355/" className="contact-item">
                                            <div className="icon-circle shadow-purple"><Linkedin size={20} /></div>
                                            <span>LinkedIn</span>
                                        </a>
                                        <a href="https://github.com/AlaaAsaad03" className="contact-item">
                                            <div className="icon-circle shadow-blue"><Github size={20} /></div>
                                            <span>GitHub</span>
                                        </a>
                                    </div>
                                </div>
                                
                                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="glass-input" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="glass-input" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea className="glass-input" rows="4" placeholder="How can I help?"></textarea>
                                    </div>
                                    <button type="submit" className="btn-primary w-full">Send Message <Target size={18} /></button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <footer className="footer-area">
                <div className="content-container text-center">
                    <p className="footer-copyright">© 2026 Alaa Asaad. Engineered for Intelligence.</p>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{ __html: `
                .portfolio-root {
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    position: relative;
                    min-height: 100vh;
                }

                .section {
                    padding: 8rem 0;
                    position: relative;
                }

                .grid-2-col {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                }

                @media (max-width: 992px) {
                    .grid-2-col {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }

                /* Nav Styles */
                .nav-fixed {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    z-index: 1000;
                    padding: 1.5rem 0;
                    transition: var(--transition-smooth);
                }

                .nav-scrolled {
                    background: rgba(3, 0, 20, 0.8);
                    backdrop-filter: blur(20px);
                    padding: 1rem 0;
                    border-bottom: 1px solid var(--glass-border);
                }

                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .logo-text {
                    font-size: 1.5rem;
                    font-weight: 900;
                    text-decoration: none;
                    color: white;
                    letter-spacing: -1px;
                }

                .desktop-nav {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .nav-link {
                    text-decoration: none;
                    color: var(--text-secondary);
                    font-weight: 500;
                    font-size: 0.95rem;
                    transition: var(--transition-smooth);
                }

                .nav-link:hover {
                    color: var(--accent-blue);
                }

                .nav-btn-contact {
                    text-decoration: none;
                    color: white;
                    padding: 0.5rem 1.25rem;
                    border-radius: 99px;
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .desktop-nav { display: none; }
                }

                /* Hero Styles */
                .hero-section {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background: radial-gradient(circle at center, rgba(67, 97, 238, 0.05) 0%, transparent 70%);
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--accent-blue);
                    text-transform: uppercase;
                    margin-bottom: 1.5rem;
                }

                .hero-headline {
                    font-size: 5rem;
                    margin-bottom: 1.5rem;
                }

                .hero-subline {
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    max-width: 800px;
                    margin: 0 auto 2.5rem;
                    font-weight: 400;
                }

                @media (max-width: 768px) {
                    .hero-headline { font-size: 3rem; }
                    .hero-subline { font-size: 1rem; }
                }

                /* Buttons */
                .hero-btns {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                }

                .btn-primary {
                    background: linear-gradient(135deg, var(--accent-electric) 0%, var(--accent-purple) 100%);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: none;
                    cursor: pointer;
                    transition: var(--transition-smooth);
                }

                .btn-primary:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(67, 97, 238, 0.4);
                }

                .btn-secondary {
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    color: white;
                    font-weight: 700;
                    text-decoration: none;
                    transition: var(--transition-smooth);
                }

                /* About Section */
                .section-title {
                    font-size: 3rem;
                    margin-bottom: 1.5rem;
                }

                .section-text {
                    font-size: 1.1rem;
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                }

                .strength-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .strength-item {
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }

                .strength-item svg { color: var(--accent-blue); }

                .about-visual {
                    border-radius: 12px;
                    overflow: hidden;
                }

                .terminal-header {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.75rem;
                    display: flex;
                    gap: 0.5rem;
                }

                .dot { width: 12px; height: 12px; border-radius: 50%; }
                .red { background: #ff5f56; }
                .yellow { background: #ffbd2e; }
                .green { background: #27c93f; }

                .terminal-content {
                    padding: 1.5rem;
                    font-family: 'Fira Code', monospace;
                    font-size: 0.9rem;
                    color: #4cc9f0;
                }

                /* Skills Chip */
                .skills-flex {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                }

                .skill-chip {
                    padding: 0.75rem 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    font-weight: 600;
                }

                /* Projects Grid */
                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2rem;
                }

                .project-card {
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .project-image-container {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                }

                .project-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .project-card:hover .project-img {
                    transform: scale(1.1);
                }

                .project-card-content {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .project-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }

                .project-cat {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: var(--accent-blue);
                }

                .project-award {
                    font-size: 0.7rem;
                    background: rgba(114, 9, 183, 0.2);
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .project-title { margin-bottom: 1rem; font-size: 1.75rem; }
                .project-desc { color: var(--text-secondary); margin-bottom: 1.5rem; flex-grow: 1; }

                .project-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }

                .tag {
                    font-size: 0.7rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.3rem 0.6rem;
                    border-radius: 6px;
                    color: var(--text-muted);
                }

                .project-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--glass-border);
                }

                .metric-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: white;
                }

                .project-links { display: flex; gap: 1rem; }
                .project-link-icon { color: var(--text-muted); transition: var(--transition-smooth); }
                .project-link-icon:hover { color: white; }
                .project-link-icon.active { color: var(--accent-blue); }

                /* Contact Styles */
                .contact-card { padding: 4rem; }
                .contact-links-list { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 2rem; }
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    text-decoration: none;
                    color: white;
                    font-weight: 600;
                    transition: var(--transition-smooth);
                }

                .contact-item:hover { transform: translateX(10px); }

                .icon-circle {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: var(--bg-tertiary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .shadow-blue { box-shadow: 0 0 15px rgba(76, 201, 240, 0.2); }
                .shadow-purple { box-shadow: 0 0 15px rgba(114, 9, 183, 0.2); }

                .contact-form { display: flex; flex-direction: column; gap: 1.5rem; }
                .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .form-group label { font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); }

                .glass-input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 1rem;
                    color: white;
                    font-family: inherit;
                    outline: none;
                    transition: var(--transition-smooth);
                }

                .glass-input:focus { border-color: var(--accent-blue); background: rgba(255, 255, 255, 0.08); }

                .footer-area { padding: 4rem 0; border-top: 1px solid var(--glass-border); }
                .footer-copyright { color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }

                /* Mobile Menu */
                .mobile-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: var(--bg-primary);
                    z-index: 1001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-links { display: flex; flex-direction: column; gap: 2rem; text-align: center; }
                .mobile-link { font-size: 2rem; font-weight: 900; color: white; text-decoration: none; }
                .mobile-toggle {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }

                @media (max-width: 768px) {
                    .mobile-toggle { display: block; }
                    .contact-card { padding: 2rem; }
                }

                .icon-pulse {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}} />
        </div>
    );
};

export default CreativePortfolio;
