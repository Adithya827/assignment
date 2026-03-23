import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const SKILLS = ['React', 'TypeScript', 'Node.js', 'Python', 'GraphQL', 'AWS'];
const STATS = [
  { value: '4+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Shipped' },
  { value: '12+', label: 'Happy Clients' },
  { value: '99%', label: 'Uptime Avg' },
];

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 20;
      const y = ((e.clientY - top) / height - 0.5) * 20;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const downloadResume = () => {
    const content = `ALEX CHEN - FULL STACK DEVELOPER\n\nEmail: alex@example.com\nPhone: +1 (555) 000-0000\n\nSKILLS: React, TypeScript, Node.js, Python, GraphQL, AWS\n\nEXPERIENCE:\nSr. Frontend Developer @ TechCorp (2022-Present)\nFull Stack Developer @ StartupXYZ (2021-2022)\n\nEDUCATION:\nB.S. Computer Science, MIT (2020)`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Alex_Chen_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-wrapper">
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.bg}>
          <div className={styles.grid} />
          <div className={styles.blob1} />
          <div className={styles.blob2} />
        </div>

        <div className="container">
          <div className={styles.content}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              <span>Available for work</span>
            </div>

            <h1 className={styles.title}>
              <span className={styles.line1}>Full Stack</span>
              <span className={styles.line2}>
                <em>Developer</em>
                <span className={styles.titleAccent}> &</span>
              </span>
              <span className={styles.line3}>Designer</span>
            </h1>

            <p className={styles.sub}>
              I craft pixel-perfect, high-performance web applications that solve real problems.
              Obsessed with clean code, great UX, and shipping fast.
            </p>

            <div className={styles.cta}>
              <Link to="/projects" className="btn btn-primary">
                View Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <button className="btn btn-outline" onClick={downloadResume}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Resume
              </button>
              <Link to="/contact" className="btn btn-ghost">Get in Touch</Link>
            </div>

            <div className={styles.techStack}>
              <span className={styles.stackLabel}>Tech stack</span>
              <div className={styles.tags}>
                {SKILLS.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.avatar}>
              <div className={styles.avatarInner}>
                <span>AC</span>
              </div>
              <div className={styles.avatarRing} />
              <div className={styles.avatarBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--green)" stroke="none"><circle cx="12" cy="12" r="12"/></svg>
                Open to work
              </div>
            </div>

            <div className={styles.floatingCard} style={{ '--delay': '0s' }}>
              <div className={styles.fcLabel}>Current stack</div>
              <div className={styles.fcValue}>React + TS</div>
            </div>
            <div className={styles.floatingCard} style={{ '--delay': '0.5s', '--offset': '1' }}>
              <div className={styles.fcLabel}>Experience</div>
              <div className={styles.fcValue}>4+ Years</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.stat} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.featured}`}>
        <div className="container">
          <div className="section-label">Featured Work</div>
          <div className={styles.featuredGrid}>
            {[
              { name: 'React Dashboard', tag: 'SaaS', color: 'var(--blue)', desc: 'Analytics platform with real-time data visualization and team collaboration.', tech: ['React', 'D3.js', 'Node.js'] },
              { name: 'AI Chat App', tag: 'AI/ML', color: 'var(--purple)', desc: 'LLM-powered chat interface with streaming responses and custom agents.', tech: ['Next.js', 'OpenAI', 'Prisma'] },
              { name: 'Design System', tag: 'UI/UX', color: 'var(--green)', desc: 'Component library used by 3 products, 40+ components with full docs.', tech: ['React', 'Storybook', 'TypeScript'] },
            ].map((p, i) => (
              <Link to="/projects" key={i} className={styles.featuredCard} style={{ '--c': p.color, animationDelay: `${i * 0.15}s` }}>
                <div className={styles.fcHeader}>
                  <span className={styles.fcTag}>{p.tag}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M17 7H7M17 7v10"/></svg>
                </div>
                <h3 className={styles.fcName}>{p.name}</h3>
                <p className={styles.fcDesc}>{p.desc}</p>
                <div className={styles.fcTech}>
                  {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className={styles.fcBar} />
              </Link>
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link to="/projects" className="btn btn-outline">View All Projects</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
