import { useState } from 'react';
import styles from './About.module.css';

const SKILLS = [
  { name: 'React / Next.js', level: 95, cat: 'Frontend' },
  { name: 'TypeScript', level: 90, cat: 'Frontend' },
  { name: 'CSS / Sass / Tailwind', level: 92, cat: 'Frontend' },
  { name: 'Node.js / Express', level: 85, cat: 'Backend' },
  { name: 'PostgreSQL / MongoDB', level: 80, cat: 'Backend' },
  { name: 'GraphQL', level: 78, cat: 'Backend' },
  { name: 'Docker / Kubernetes', level: 72, cat: 'DevOps' },
  { name: 'AWS / GCP', level: 70, cat: 'DevOps' },
];

const EXPERIENCE = [
  { role: 'Senior Frontend Developer', company: 'TechCorp Inc.', period: '2022 – Present', desc: 'Led frontend architecture for a B2B SaaS platform serving 10,000+ users. Built reusable design system adopted across 4 products. Improved core web vitals by 40%.', tags: ['React', 'TypeScript', 'AWS'] },
  { role: 'Full Stack Developer', company: 'StartupXYZ', period: '2021 – 2022', desc: 'Built full-stack features for an e-commerce platform from 0 to $2M ARR. Implemented real-time inventory sync and payment integration with Stripe.', tags: ['Next.js', 'Node.js', 'PostgreSQL'] },
  { role: 'Frontend Developer', company: 'Digital Agency', period: '2020 – 2021', desc: 'Delivered 20+ client projects including marketing sites, web apps, and dashboards. Mentored junior developers.', tags: ['React', 'Vue.js', 'Sass'] },
];

const EDUCATION = [
  { degree: 'B.S. Computer Science', school: 'MIT', period: '2016 – 2020', gpa: '3.9/4.0', note: 'Specialization in Human-Computer Interaction' },
  { degree: 'Certifications', school: 'AWS Certified Developer · Google Cloud Professional', period: '2021 – 2022', gpa: '', note: '' },
];

const CATS = ['All', 'Frontend', 'Backend', 'DevOps'];

export default function About() {
  const [activeCat, setActiveCat] = useState('All');

  const filteredSkills = activeCat === 'All' ? SKILLS : SKILLS.filter(s => s.cat === activeCat);

  const downloadResume = () => {
    const content = `ALEX CHEN - FULL STACK DEVELOPER\n\nEmail: adithya@example.com | Phone: +1 (555) 000-0000\nPortfolio: alexchen.dev | GitHub: github.com/alexchen\n\n=== EXPERIENCE ===\n\nSenior Frontend Developer @ TechCorp Inc. (2022-Present)\n- Led frontend architecture for B2B SaaS platform\n- Built reusable design system adopted across 4 products\n\nFull Stack Developer @ StartupXYZ (2021-2022)\n- Built features for e-commerce platform from 0 to $2M ARR\n\n=== SKILLS ===\nReact, TypeScript, Next.js, Node.js, PostgreSQL, AWS\n\n=== EDUCATION ===\nB.S. Computer Science, MIT (2020), GPA: 3.9`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Alex_Chen_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-wrapper">
      <div className="section">
        <div className="container">
          <div className={styles.header}>
            <div>
              <div className="section-label">About Me</div>
              <h1 className="section-title">Crafting digital<br />experiences</h1>
            </div>
            <button className="btn btn-primary" onClick={downloadResume}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </button>
          </div>

          <div className={styles.bio}>
            <div className={styles.bioText}>
              <p>I'm a Full Stack Developer with 4+ years of experience building scalable web applications. I specialize in React ecosystems, performance optimization, and design systems that teams love to use.</p>
              <p>When I'm not pushing pixels or optimizing database queries, I contribute to open-source projects and write about web development on my blog. I believe great software is a combination of technical excellence and thoughtful user experience.</p>
            </div>
            <div className={styles.bioMeta}>
              {[
                { label: 'Location', value: 'Karnataka, India' },
                { label: 'Status', value: 'Open to Work', highlight: true },
                { label: 'Email', value: 'adithya@example.com' },
                { label: 'Languages', value: 'English' },
              ].map(m => (
                <div key={m.label} className={styles.metaRow}>
                  <span className={styles.metaLabel}>{m.label}</span>
                  <span className={m.highlight ? styles.metaHighlight : styles.metaValue}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* Skills */}
          <div className={styles.skillsSection}>
            <div className={styles.skillsHeader}>
              <h2 className={styles.subTitle}>Skills</h2>
              <div className={styles.catFilter}>
                {CATS.map(c => (
                  <button
                    key={c}
                    className={`${styles.catBtn} ${activeCat === c ? styles.catActive : ''}`}
                    onClick={() => setActiveCat(c)}
                  >{c}</button>
                ))}
              </div>
            </div>
            <div className={styles.skillsList}>
              {filteredSkills.map((skill, i) => (
                <div key={skill.name} className={styles.skillItem} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className={styles.skillTop}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                  <div className={styles.skillBar}>
                    <div
                      className={styles.skillFill}
                      style={{ width: `${skill.level}%`, '--delay': `${i * 0.1}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* Experience */}
          <div className={styles.timeline}>
            <h2 className={styles.subTitle}>Experience</h2>
            <div className={styles.timelineList}>
              {EXPERIENCE.map((e, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <div>
                        <h3 className={styles.timelineRole}>{e.role}</h3>
                        <div className={styles.timelineCompany}>{e.company}</div>
                      </div>
                      <span className={styles.timelinePeriod}>{e.period}</span>
                    </div>
                    <p className={styles.timelineDesc}>{e.desc}</p>
                    <div className={styles.timelineTags}>
                      {e.tags.map(t => <span key={t} className="badge badge-blue">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* Education */}
          <div>
            <h2 className={styles.subTitle}>Education</h2>
            <div className="grid-2">
              {EDUCATION.map((e, i) => (
                <div key={i} className="card">
                  <div className={styles.eduDegree}>{e.degree}</div>
                  <div className={styles.eduSchool}>{e.school}</div>
                  <div className={styles.eduMeta}>
                    <span>{e.period}</span>
                    {e.gpa && <span className={styles.gpa}>GPA: {e.gpa}</span>}
                  </div>
                  {e.note && <p className={styles.eduNote}>{e.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
