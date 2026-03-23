import { useState, lazy, Suspense } from 'react';
import styles from './Projects.module.css';

const ProjectModal = lazy(() => import('../components/ProjectModal'));

const PROJECTS = [
  {
    id: 1,
    name: 'React Analytics Dashboard',
    tag: 'SaaS',
    cat: 'Frontend',
    year: '2024',
    desc: 'Full-featured analytics platform with real-time data visualization, team workspaces, and role-based access. Serves 10,000+ daily active users.',
    longDesc: 'A comprehensive B2B SaaS analytics platform featuring live dashboards, customizable widgets, user management, audit logs, and Stripe billing integration. Built from scratch, scaled to 10k+ DAU.',
    tech: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
    link: '#',
    github: '#',
    color: 'var(--blue)',
    metrics: ['10k+ DAU', '99.9% uptime', '40% faster'],
  },
  {
    id: 2,
    name: 'AI Chat Application',
    tag: 'AI/ML',
    cat: 'Fullstack',
    year: '2024',
    desc: 'LLM-powered chat interface with streaming responses, conversation history, custom system prompts, and multi-model support.',
    longDesc: 'Production-grade AI chat application supporting GPT-4, Claude, and Mistral. Features streaming responses, conversation branching, file uploads, and a plugin system.',
    tech: ['Next.js', 'OpenAI API', 'Prisma', 'tRPC', 'Tailwind'],
    link: '#',
    github: '#',
    color: 'var(--purple)',
    metrics: ['3 LLM models', 'Streaming SSE', '< 200ms TTFB'],
  },
  {
    id: 3,
    name: 'Polaris Design System',
    tag: 'UI/UX',
    cat: 'Frontend',
    year: '2023',
    desc: 'Component library with 40+ fully accessible, themed components. Used across 3 internal products with full Storybook docs.',
    longDesc: 'Enterprise design system built on Radix UI primitives with custom theming engine. Includes design tokens, 40+ components, WCAG 2.1 AA compliance, and auto-generated documentation.',
    tech: ['React', 'TypeScript', 'Radix UI', 'Storybook', 'Chromatic'],
    link: '#',
    github: '#',
    color: 'var(--green)',
    metrics: ['40+ components', 'WCAG 2.1 AA', '3 products'],
  },
  {
    id: 4,
    name: 'E-Commerce Platform',
    tag: 'Commerce',
    cat: 'Fullstack',
    year: '2023',
    desc: 'Next.js storefront with headless CMS, real-time inventory, Stripe checkout, and a custom admin panel managing $2M+ in GMV.',
    longDesc: 'Headless e-commerce solution with Sanity CMS, Stripe payment processing, inventory management, order fulfillment tracking, and a comprehensive merchant dashboard.',
    tech: ['Next.js', 'Sanity', 'Stripe', 'Vercel', 'Prisma'],
    link: '#',
    github: '#',
    color: 'var(--accent)',
    metrics: ['$2M+ GMV', '< 1s load', 'Headless CMS'],
  },
  {
    id: 5,
    name: 'DevOps Monitoring Stack',
    tag: 'DevOps',
    cat: 'Backend',
    year: '2023',
    desc: 'Self-hosted observability platform with metrics, logs, traces, and alerting. Replaced $3k/month Datadog bill.',
    longDesc: 'Custom observability stack using OpenTelemetry, Prometheus, Loki, and Grafana. Features custom alerting rules, SLO tracking, and automated incident response.',
    tech: ['Docker', 'Prometheus', 'Grafana', 'OpenTelemetry', 'Go'],
    link: '#',
    github: '#',
    color: 'var(--green)',
    metrics: ['$36k/yr saved', '99.5% accuracy', 'Self-hosted'],
  },
  {
    id: 6,
    name: 'Realtime Collaboration Tool',
    tag: 'SaaS',
    cat: 'Fullstack',
    year: '2022',
    desc: 'Figma-like collaborative whiteboard with real-time cursors, shapes, sticky notes, and voice chat for remote teams.',
    longDesc: 'WebRTC-based collaborative workspace featuring real-time cursor sync, a drawing canvas, object persistence, voice rooms, and team management.',
    tech: ['React', 'WebRTC', 'Socket.io', 'Canvas API', 'Node.js'],
    link: '#',
    github: '#',
    color: 'var(--blue)',
    metrics: ['Real-time sync', 'WebRTC', '< 50ms latency'],
  },
];

const FILTERS = ['All', 'Frontend', 'Backend', 'Fullstack'];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <div className="page-wrapper">
      <div className="section">
        <div className="container">
          <div className={styles.header}>
            <div>
              <div className="section-label">Work</div>
              <h1 className="section-title">Selected<br />Projects</h1>
            </div>
            <p className={styles.headerDesc}>
              A curated selection of projects spanning SaaS, AI, design systems, and infrastructure.
            </p>
          </div>

          <div className={styles.filterBar}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                <span className={styles.filterCount}>
                  {f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.cat === f).length}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={styles.card}
                style={{ '--c': project.color, animationDelay: `${i * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCat}>{project.tag}</span>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>
                  <button className={styles.openBtn} aria-label="Open project">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M17 7H7M17 7v10"/>
                    </svg>
                  </button>
                </div>

                <h2 className={styles.cardName}>{project.name}</h2>
                <p className={styles.cardDesc}>{project.desc}</p>

                <div className={styles.metrics}>
                  {project.metrics.map(m => (
                    <span key={m} className={styles.metric}>{m}</span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.tech}>
                    {project.tech.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                    {project.tech.length > 3 && <span className="tag">+{project.tech.length - 3}</span>}
                  </div>
                </div>

                <div className={styles.cardAccent} />
              </div>
            ))}
          </div>

          <Suspense fallback={null}>
            {selectedProject && (
              <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
