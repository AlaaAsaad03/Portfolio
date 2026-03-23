import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight, 
  Cpu, Database, Server, Award, Star, Download,
  ArrowRight, Sparkles, Code, Globe,
  Briefcase, GraduationCap, Trophy, Users, CheckCircle2, 
  TrendingUp, Target, Zap, FileText, Calendar, MapPin, Building2
} from 'lucide-react';
import profileImg from "../assets/profile.png";
import Terminal from './Terminal';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.15
      });

      // Floating blobs
      gsap.to('.floating-blob', {
        y: -40,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5
      });

      // Experience cards
      gsap.utils.toArray('.experience-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          x: -80,
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
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out'
        });
      });

      // Stats animation
      gsap.utils.toArray('.stat-number').forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%'
          },
          textContent: 0,
          duration: 2.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function() {
            stat.textContent = Math.ceil(this.targets()[0].textContent);
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMagneticMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  const experiences = [
    {
      title: "Full Stack Developer Intern",
      company: "URM ENROLL",
      type: "Internship",
      location: "Remote",
      period: "Oct 2024 - Present",
      description: "Developing enterprise-grade backend systems and modern web applications for an educational technology platform serving international students.",
      achievements: [
        "Architected and implemented RESTful APIs using NestJS, TypeORM, and PostgreSQL, handling 1000+ daily requests",
        "Designed and deployed JWT-based authentication system with role-based access control (RBAC) for multi-tenant architecture",
        "Built IoT device management system with real-time telemetry processing and alert mechanisms",
        "Created comprehensive API documentation and Postman test collections, reducing integration time by 40%",
        "Implemented automated eligibility verification system using business rule engine"
      ],
      tech: ["NestJS", "TypeORM", "PostgreSQL", "React", "TypeScript", "JWT", "REST API"]
    },
    {
      title: "Freelance Full Stack Developer",
      company: "Self-Employed",
      type: "Freelance",
      location: "Lebanon",
      period: "2023 - Present",
      description: "Delivering custom web solutions and consulting services for clients across education, e-commerce, and business sectors.",
      achievements: [
        "Successfully delivered 15+ production-ready web applications with 100% client satisfaction rate",
        "Specialized in React, Node.js, and modern JAMstack architectures",
        "Reduced client operational costs by 30% through process automation and efficient system design",
        "Maintained consistent project delivery within timeline and budget constraints",
        "Provided technical consulting and architecture planning for startup ventures"
      ],
      tech: ["React", "Node.js", "MongoDB", "Express", "Next.js", "Supabase", "Tailwind CSS"]
    }
  ];

  const projects = [
    {
      title: "Smart Water System Platform",
      category: "IoT & Enterprise Backend",
      description: "Enterprise-grade IoT platform for intelligent water management with real-time monitoring, predictive analytics, and automated control systems.",
      impact: "Manages 50+ IoT devices across multiple properties with 99.9% uptime",
      tech: ["NestJS", "PostgreSQL", "TypeORM", "IoT Protocols", "REST API", "WebSockets"],
      features: [
        "Multi-property device management with hierarchical access control",
        "Real-time telemetry processing with data aggregation",
        "Intelligent alert system with customizable thresholds",
        "Comprehensive analytics dashboard with historical data",
        "Role-based permissions for property managers and technicians"
      ],
      metrics: {
        devices: "50+",
        uptime: "99.9%",
        response: "<100ms"
      },
      link: "#",
      github: "#"
    },
    {
      title: "Educational Enrollment System",
      category: "Full Stack SaaS Platform",
      description: "Comprehensive platform for managing international student applications with automated eligibility checks, document management, and workflow automation.",
      impact: "Reduced application processing time by 60% through automation",
      tech: ["Supabase", "React", "TypeScript", "Edge Functions", "PostgreSQL", "Resend"],
      features: [
        "Automated eligibility verification using business rules engine",
        "Secure document upload and management system",
        "Email notification system with custom templates",
        "Admin dashboard with analytics and reporting",
        "Multi-step application workflow with progress tracking"
      ],
      metrics: {
        efficiency: "+60%",
        applications: "500+",
        automation: "85%"
      },
      link: "#",
      github: "#"
    },
    {
      title: "E-Commerce Backend System",
      category: "Backend & Payment Integration",
      description: "Scalable e-commerce backend with advanced order management, inventory tracking, payment processing, and analytics.",
      impact: "Processes $10K+ monthly transactions with zero downtime",
      tech: ["NestJS", "PostgreSQL", "Stripe", "Redis", "Bull Queue", "TypeORM"],
      features: [
        "Product catalog with variant management",
        "Real-time inventory tracking and stock alerts",
        "Secure payment gateway integration with Stripe",
        "Order processing pipeline with status tracking",
        "Analytics dashboard with sales metrics and insights"
      ],
      metrics: {
        transactions: "$10K+/mo",
        orders: "200+/mo",
        downtime: "0%"
      },
      link: "#",
      github: "#"
    }
  ];

  const skills = {
    backend: {
      title: "Backend Development",
      icon: Server,
      items: ["Node.js", "NestJS", "Express", "REST APIs", "GraphQL", "Microservices"]
    },
    frontend: {
      title: "Frontend Development",
      icon: Code,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"]
    },
    database: {
      title: "Database & ORM",
      icon: Database,
      items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "TypeORM", "Prisma"]
    },
    devops: {
      title: "DevOps & Tools",
      icon: Cpu,
      items: ["Git", "Docker", "CI/CD", "Postman", "Linux", "GitHub Actions"]
    },
    architecture: {
      title: "Architecture & Patterns",
      icon: Globe,
      items: ["Microservices", "MVC", "Clean Architecture", "Design Patterns", "SOLID", "DDD"]
    }
  };

  return (
    <div className="relative w-full bg-dark-bg selection:bg-brand-primary selection:text-white">
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 hero-title">
                <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-transparent" />
                <span className="text-brand-primary font-mono text-[10px] uppercase tracking-[0.5em]">Full Stack Developer • Beirut</span>
              </div>

              <div>
                <h1 className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-[0.9] tracking-tighter mb-4">
                  <div className="hero-title">Alaa Asaad</div>
                </h1>
                <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold leading-[0.9] tracking-tighter">
                  <div className="hero-title">
                    <span className="text-gradient">Full Stack Developer</span>
                  </div>
                </h2>
                <p className="hero-title text-brand-primary font-mono text-sm mt-4 uppercase tracking-widest">
                  Backend Specialist • API Architect • Problem Solver
                </p>
              </div>

              <p className="hero-title text-xl text-slate-300 max-w-xl leading-relaxed">
                Crafting <span className="text-white font-semibold">scalable, high-performance web applications</span> with modern technologies. 
                Specialized in backend architecture, RESTful APIs, and full-stack solutions that drive business growth.
              </p>

              {/* CTA Buttons */}
              <div className="hero-title flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="magnetic-button group px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 rounded-2xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-brand-primary/20"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseOut={() => setIsHovering(false)}
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/Alaa Asaad_CV.pdf"
                  download
                  className="magnetic-button group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-semibold transition-all flex items-center gap-2"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseOut={() => setIsHovering(false)}
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </a>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="stat-number text-4xl font-bold text-white" data-target="2">0</div>
                  <div className="text-sm text-slate-400 mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="stat-number text-4xl font-bold text-white" data-target="15">0</div>
                  <div className="text-sm text-slate-400 mt-1">Projects Delivered</div>
                </div>
                <div>
                  <div className="stat-number text-4xl font-bold text-white" data-target="100">0</div>
                  <div className="text-sm text-slate-400 mt-1">% Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right: Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-[3rem] blur-3xl opacity-20" />
                <img
                  src={profileImg}
                  alt="Alaa Asaad - Full Stack Developer"
                  className="relative w-full h-full object-cover rounded-[3rem] border border-white/10"
                />
                {/* Social Links Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-center gap-4">
                  <a
                    href="https://github.com/alaa-asaad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button p-4 bg-dark-bg/80 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-brand-primary/50 transition-all"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/alaa-asaad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button p-4 bg-dark-bg/80 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-brand-primary/50 transition-all"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:alaa.asaad.dev@gmail.com"
                    className="magnetic-button p-4 bg-dark-bg/80 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-brand-primary/50 transition-all"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/2 right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full -z-10 floating-blob" />
        <div className="absolute bottom-1/4 left-[-5%] w-[400px] h-[400px] bg-brand-secondary/10 blur-[100px] rounded-full -z-10 floating-blob" style={{ animationDelay: '-1.5s' }} />
      </section>

      {/* Value Proposition Section */}
      <section className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-sm font-medium text-brand-primary">
                Why Work With Me
              </span>
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              What I Bring to <span className="text-gradient">Your Team</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A proven track record of delivering scalable solutions that drive business results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Fast Delivery",
                description: "Rapid development cycles with agile methodology, delivering MVPs in weeks, not months"
              },
              {
                icon: Target,
                title: "Business-Focused",
                description: "Solutions aligned with your business goals, not just technical requirements"
              },
              {
                icon: CheckCircle2,
                title: "Quality Assured",
                description: "Clean, maintainable code with comprehensive testing and documentation"
              },
              {
                icon: TrendingUp,
                title: "Scalable Systems",
                description: "Architecture designed to grow with your business needs and user base"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-brand-secondary/10 border border-brand-secondary/20 rounded-full text-sm font-medium text-brand-secondary">
                Professional Journey
              </span>
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Work <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl">
              Building enterprise-grade solutions and delivering measurable business impact
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-card glass-card p-8 lg:p-12 group hover:border-brand-primary/30 transition-all duration-500">
                <div className="grid lg:grid-cols-[1fr,2fr] gap-8">
                  {/* Left: Company Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-brand-primary font-semibold text-lg mb-3">
                        <Building2 className="w-5 h-5" />
                        {exp.company}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed">{exp.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-xs font-medium text-brand-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Achievements */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Key Achievements</h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3 text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-400">
                Featured Work
              </span>
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Selected <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl">
              Real-world solutions with measurable impact and proven results
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card glass-card p-8 group hover:border-brand-primary/30 transition-all duration-500">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">{project.category}</span>
                        <h3 className="text-2xl font-bold text-white mt-2">{project.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <a href={project.github} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                        <a href={project.link} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Impact */}
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <TrendingUp className="w-5 h-5" />
                      <span>{project.impact}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(project.metrics).map(([key, value], i) => (
                      <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-white">{value}</div>
                        <div className="text-xs text-slate-400 uppercase mt-1">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-400">
                Technical Expertise
              </span>
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Skills & <span className="text-gradient">Technologies</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([key, skill], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group hover:border-brand-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <skill.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{skill.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-slate-300 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block mb-4"
                >
                  <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400">
                    Education
                  </span>
                </motion.div>
                <h2 className="text-4xl font-bold">Academic Background</h2>
              </div>

              <div className="glass-card p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Full Stack Web Development Bootcamp</h3>
                    <p className="text-brand-primary font-semibold mb-2">SE Factory</p>
                    <p className="text-sm text-slate-400">2023 • Intensive 14-week program</p>
                    <p className="text-slate-300 mt-4 leading-relaxed">
                      Comprehensive training in modern web development, covering frontend and backend technologies, 
                      database design, and software engineering best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block mb-4"
                >
                  <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-sm font-medium text-amber-400">
                    Continuous Learning
                  </span>
                </motion.div>
                <h2 className="text-4xl font-bold">Certifications & Training</h2>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-6 group hover:border-brand-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">Backend Development Specialization</h3>
                      <p className="text-sm text-slate-400">Self-Directed Learning • 2024</p>
                      <p className="text-xs text-slate-500 mt-2">NestJS, TypeORM, PostgreSQL, Microservices</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 group hover:border-brand-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">Modern Frontend Development</h3>
                      <p className="text-sm text-slate-400">Self-Directed Learning • 2023-2024</p>
                      <p className="text-xs text-slate-500 mt-2">React, Next.js, TypeScript, Tailwind CSS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-sm font-medium text-brand-primary">
                Let's Connect
              </span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold">
              Ready to Build <span className="text-gradient">Something Great?</span>
            </h2>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              I'm currently available for freelance projects and full-time opportunities. 
              Let's discuss how I can help bring your ideas to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="mailto:alaa.asaad.dev@gmail.com"
                className="magnetic-button group px-10 py-5 bg-brand-primary hover:bg-brand-primary/90 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-brand-primary/20"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                onMouseEnter={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
              >
                <Mail className="w-6 h-6" />
                Email Me
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="/Alaa Asaad_CV.pdf"
                download
                className="magnetic-button group px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                onMouseEnter={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
              >
                <Download className="w-6 h-6" />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 pt-12">
              <a
                href="https://github.com/alaa-asaad"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/alaa-asaad"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <Terminal />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-slate-400">
                © 2026 Alaa Asaad. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:alaa.asaad.dev@gmail.com" className="text-slate-400 hover:text-brand-primary transition-colors">
                alaa.asaad.dev@gmail.com
              </a>
              <span className="flex items-center gap-2 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Available for Hire
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
