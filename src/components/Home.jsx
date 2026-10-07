import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AsciiPortrait from './AsciiPortrait';
import ProjectViz from './ProjectViz';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINKS = {
  github: 'https://github.com/AlaaAsaad03',
  linkedin: 'https://linkedin.com/in/alaa-asaad-505740355/',
  email: 'alaa.b.asaad@gmail.com',
  cv: '/Alaa Asaad_CV.pdf',
};

const STATEMENT =
  'I like problems with real constraints: tenants that must never see each other’s data, a hundred sensors that all want attention at once, a banking app that needed to answer 35% faster.';
const STATEMENT_HOT = new Set(['constraints:', 'never', 'hundred', 'once,', '35%', 'faster.']);

const WORK = [
  {
    kind: 'fillia', title: 'Fillia', year: '2025',
    line: 'A donation platform for crisis-affected communities in Lebanon. Verifies cases, then matches them to donors by similarity.',
    stat: ['+22%', 'match rate'], note: '3rd place, best graduation project',
    stack: ['React', 'Express', 'MongoDB', 'Docker'],
    href: 'https://github.com/AlaaAsaad03/Fillia',
  },
  {
    kind: 'water', title: 'Smart water hub', year: '2025',
    line: 'Leak detection for property managers. A sensor trips, Redis fans it out, the dashboard knows in real time.',
    stat: ['100+', 'devices'], note: 'Team build at ADADK',
    stack: ['NestJS', 'PostgreSQL', 'Socket.IO', 'Redis'],
    href: null,
  },
  {
    kind: 'booking', title: 'Table booking', year: '2024',
    line: 'Restaurant reservations with live availability, an admin dashboard and confirmations.',
    stack: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
    href: 'https://github.com/AlaaAsaad03/Restaurant_Booking_Table',
  },
  {
    kind: 'buildings', title: 'Buildings', year: '2024',
    line: 'Property management with Super Admin and Admin roles, search and automated onboarding.',
    stack: ['Flask', 'MySQL', 'Angular Material', 'JWT'],
    href: 'https://github.com/AlaaAsaad03/Buildings-Management-System',
  },
  {
    kind: 'waltrack', title: 'Waltrack', year: '2024',
    line: 'Personal finance tracker that shows where the month’s money actually went.',
    stack: ['ASP.NET Core MVC', 'C#', 'SQL Server'],
    href: 'https://github.com/AlaaAsaad03/Waltrack',
  },
];

const PATH = [
  { year: '2026', org: 'Elekron Ventures', role: 'Full-stack developer intern', what: 'Built React interfaces from Figma and worked on backend APIs with the FrequenC team.' },
  { year: '2026', org: 'URM Enroll', role: 'Backend team lead intern', what: 'Worked on the Postgres schema with row-level security, LLM-based CV parsing and the matching engine.' },
  { year: '2025', org: 'ADADK', role: 'Full-stack developer intern', what: 'Helped build an IoT leak-detection backend: device APIs, multi-tenant Postgres, real-time alerts.' },
  { year: '2025', org: 'INJAZ Lebanon', role: 'Project support intern', what: 'Supported program operations, supplier documentation and progress reporting.' },
  { year: '2025', org: 'Al Maaref University', role: 'BSc Computer Science', what: 'Graduated. Capstone project Fillia placed 3rd.' },
  { year: '2024', org: 'IDS Fintech', role: 'Full-stack developer intern', what: 'Contributed .NET and Angular features to a banking app and tuned queries for faster API responses.' },
];

const CERTS = [
  'Girls Who Excel · PwC Middle East', 'Digital Employment Readiness · Nawaya', 'Prompt Engineering · Cedar Digital',
  '1 Million Prompter · Dubai Future Foundation', 'Generation AI · Google.org', 'Ready4Work · INJAZ',
  'Clean & Scalable Code', 'Foundational C# · Microsoft', 'Prompt Engineering · Tech Trendy', 'Entrepreneurship & AI · Ektidar',
  'MERN Stack · Udemy', 'Frontend Developer (React) · HackerRank', 'PHP & MySQL · Udemy', 'React JavaScript · Alison',
];

const TOOLS = [
  ['TypeScript', 1], ['NestJS', 1], ['PostgreSQL', 1], ['React', 1], ['C#', 1], ['.NET', 1],
  ['Redis', 2], ['Socket.IO', 2], ['Angular', 2], ['Node.js', 2], ['Supabase', 2], ['SQL Server', 2], ['MongoDB', 2],
  ['Python', 3], ['Flask', 3], ['Deno', 3], ['Docker', 3], ['Azure', 3], ['TypeORM', 3], ['Entity Framework', 3],
  ['Dapper', 3], ['Next.js', 3], ['Tailwind', 3], ['GSAP', 3], ['MySQL', 3], ['Git', 3],
];

const WEB3FORMS_KEY = '5e26e2dd-e63b-4db1-96e4-c9f4657e4ebe';

function initialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage blocked */ }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function Home() {
  const root = useRef(null);
  const track = useRef(null);
  const [theme, setTheme] = useState(initialTheme);
  const [copied, setCopied] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage blocked */ }
  }, [theme]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-name .line > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.1 });
      gsap.from('.hero-fade', { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out', stagger: 0.06, delay: 0.45 });
      gsap.from('.ascii', { opacity: 0, duration: 1.6, ease: 'power2.out', delay: 0.2 });

      gsap.fromTo('.statement .w', { opacity: 0.14 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: '.statement', start: 'top 78%', end: 'bottom 45%', scrub: true },
      });

      gsap.utils.toArray('.path-row').forEach((row) => {
        gsap.from(row, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 90%' } });
      });
    });

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current;
      const cards = gsap.utils.toArray('.card', el);
      const steps = cards.length - 1;
      const counter = root.current.querySelector('.work-count');
      const distance = () => el.scrollWidth - window.innerWidth;
      let current = -1;

      const setActive = (i) => {
        if (i === current) return;
        current = i;
        cards.forEach((c, k) => c.classList.toggle('is-active', k === i));
        counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      };

      el.classList.add('is-pinned');
      setActive(0);

      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.work',
          start: 'top top',
          // ~1.6× the travel distance, so each project gets a comfortable stretch of scroll
          end: () => `+=${distance() * 1.6}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / steps, duration: { min: 0.25, max: 0.6 }, delay: 0.08, ease: 'power2.inOut' },
          onUpdate: (self) => {
            gsap.set('.work-progress i', { scaleX: self.progress });
            setActive(Math.round(self.progress * steps));
          },
        },
      });

      return () => {
        el.classList.remove('is-pinned');
        cards.forEach((c) => c.classList.remove('is-active'));
        counter.textContent = '05';
      };
    });

    return () => mm.revert();
  }, { scope: root });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  const onField = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setStatus({ state: 'error', msg: 'Add your name and a message.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus({ state: 'error', msg: 'That email looks incomplete.' });
      return;
    }
    setStatus({ state: 'sending', msg: '' });
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `Portfolio message from ${form.name}`, ...form }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus({ state: 'ok', msg: 'Sent. I’ll get back to you soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus({ state: 'error', msg: `Couldn’t send it. Try ${LINKS.email} directly.` });
    }
  };

  return (
    <div ref={root}>
      <a href="#main" className="skip">Skip to content</a>

      <header className="nav">
        <a href="#top" className="nav-mark" aria-label="Back to top">
          <span className="caret" aria-hidden="true" />alaa.asaad
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#work">work</a>
          <a href="#path">path</a>
          <a href="#contact">contact</a>
          <a href={LINKS.cv} download>cv ↓</a>
        </nav>
        <button
          type="button"
          className="theme-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="theme-dot" aria-hidden="true" />{theme === 'dark' ? 'light' : 'dark'}
        </button>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="kicker hero-fade"><span className="live" aria-hidden="true" />Full-stack developer · Beirut</p>
            <h1 className="hero-name">
              <span className="line"><span>Alaa</span></span>
              <span className="line"><span>Asaad<em>.</em></span></span>
            </h1>
            <p className="hero-sub hero-fade">
              I build the data models, APIs and real-time wiring under a product, and the interface on top of it.
            </p>
            <div className="hero-actions hero-fade">
              <a href="#work" className="btn btn-fill">See the work</a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn-text">GitHub ↗</a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="btn-text">LinkedIn ↗</a>
            </div>
          </div>
          <figure className="hero-art">
            <AsciiPortrait />
            <figcaption className="hero-fade">drawn with my stack. move your cursor through it.</figcaption>
          </figure>
        </section>

        <section className="statement" aria-label="Approach">
          <p>
            {STATEMENT.split(' ').map((word, i) => (
              <span key={i} className={`w ${STATEMENT_HOT.has(word) ? 'hot' : ''}`}>{word} </span>
            ))}
          </p>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="work-head">
            <h2 id="work-title">Selected work</h2>
            <span className="work-count">05</span>
            <span className="work-progress" aria-hidden="true"><i /></span>
          </div>
          <div className="work-track" ref={track}>
            {WORK.map((p, i) => (
              <article className="card" key={p.kind} aria-labelledby={`work-${p.kind}`}>
                <div className="card-text">
                  <span className="card-idx">{String(i + 1).padStart(2, '0')} — {p.year}</span>
                  <h3 id={`work-${p.kind}`}>{p.title}</h3>
                  <p className="card-line">{p.line}</p>
                  {p.stat && (
                    <p className="card-stat">
                      <strong>{p.stat[0]}</strong> {p.stat[1]}
                      {p.note && <span className="card-note">{p.note}</span>}
                    </p>
                  )}
                  <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                  {p.href
                    ? <a className="btn-text card-link" href={p.href} target="_blank" rel="noreferrer">View code ↗</a>
                    : <span className="private card-link">Private repo</span>}
                </div>
                <div className="card-viz">
                  <ProjectViz kind={p.kind} label={`Animated diagram of ${p.title}`} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="path" id="path" aria-labelledby="path-title">
          <h2 id="path-title" className="section-title">Where I’ve worked</h2>
          <ol className="path-list">
            {PATH.map((r) => (
              <li className="path-row" key={r.org}>
                <span className="path-year">{r.year}</span>
                <span className="path-org">{r.org}</span>
                <span className="path-role">{r.role}</span>
                <span className="path-what">{r.what}</span>
              </li>
            ))}
          </ol>
          <div className="certs">
            <button type="button" className="btn-text" aria-expanded={showCerts} onClick={() => setShowCerts(!showCerts)}>
              {showCerts ? 'Hide' : 'Plus'} 14 certificates {showCerts ? '−' : '+'}
            </button>
            {showCerts && <ul className="cert-list">{CERTS.map((c) => <li key={c}>{c}</li>)}</ul>}
          </div>
        </section>

        <section className="tools" aria-labelledby="tools-title">
          <h2 id="tools-title" className="section-title">Toolbox</h2>
          <ul className="tool-cloud">
            {TOOLS.map(([name, tier]) => <li key={name} className={`t${tier}`}>{name}</li>)}
          </ul>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="contact-title">Got something<br />to build?</h2>
          <div className="contact-grid">
            <div className="contact-direct">
              <button type="button" className="email" onClick={copyEmail}>
                {LINKS.email}
                <span className="email-hint" aria-live="polite">{copied ? 'copied ✓' : 'click to copy'}</span>
              </button>
              <p className="contact-links">
                <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={LINKS.cv} download>Download CV</a>
              </p>
            </div>
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <label><span>Name</span><input name="name" value={form.name} onChange={onField} autoComplete="name" /></label>
                <label><span>Email</span><input name="email" type="email" value={form.email} onChange={onField} autoComplete="email" /></label>
              </div>
              <label><span>Message</span><textarea name="message" rows={4} value={form.message} onChange={onField} /></label>
              <div className="form-foot">
                <button type="submit" className="btn btn-fill" disabled={status.state === 'sending'}>
                  {status.state === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                {status.msg && <p className={`form-msg ${status.state}`} role={status.state === 'error' ? 'alert' : 'status'}>{status.msg}</p>}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} Alaa Asaad</span>
        <span>Made in Beirut</span>
      </footer>
    </div>
  );
}
