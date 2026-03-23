import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './Dashboard.module.css';

const STATS = [
  { label: 'Projects Completed', value: 32, suffix: '', color: 'var(--accent)', icon: '🚀' },
  { label: 'GitHub Commits', value: 1847, suffix: '', color: 'var(--green)', icon: '⚡' },
  { label: 'Hours Coded', value: 4200, suffix: '+', color: 'var(--blue)', icon: '💻' },
  { label: 'Client Rating', value: 4.9, suffix: '/5', color: 'var(--purple)', icon: '⭐' },
];

const ACTIVITY = [
  { action: 'Deployed', target: 'AI Chat App v2.1', time: '2 hours ago', type: 'deploy' },
  { action: 'Merged PR', target: '#142 Add dark mode support', time: '5 hours ago', type: 'merge' },
  { action: 'Opened issue', target: 'Optimize bundle size', time: '1 day ago', type: 'issue' },
  { action: 'Released', target: 'Polaris Design System v1.4', time: '2 days ago', type: 'release' },
  { action: 'Starred', target: 'shadcn/ui', time: '3 days ago', type: 'star' },
  { action: 'Forked', target: 'vercel/next.js', time: '4 days ago', type: 'fork' },
  { action: 'Committed', target: 'Add TypeScript strict mode', time: '5 days ago', type: 'commit' },
];

const SKILLS_CHART = [
  { name: 'React', value: 95 },
  { name: 'TypeScript', value: 90 },
  { name: 'Node.js', value: 85 },
  { name: 'Python', value: 75 },
  { name: 'AWS', value: 70 },
  { name: 'Docker', value: 72 },
];

const WEEKLY = [
  { day: 'Mon', hours: 6 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 9 },
  { day: 'Fri', hours: 7 },
  { day: 'Sat', hours: 3 },
  { day: 'Sun', hours: 2 },
];

const maxHours = Math.max(...WEEKLY.map(w => w.hours));

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Number(start.toFixed(1)));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function StatCard({ stat, index }) {
  const count = useCountUp(stat.value, 1000 + index * 200);
  return (
    <div className={styles.statCard} style={{ '--c': stat.color, animationDelay: `${index * 0.1}s` }}>
      <div className={styles.statIcon}>{stat.icon}</div>
      <div className={styles.statValue}>
        {stat.value % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{stat.suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
      <div className={styles.statBar} />
    </div>
  );
}

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const typeColors = {
    deploy: 'var(--green)',
    merge: 'var(--blue)',
    issue: 'var(--accent)',
    release: 'var(--purple)',
    star: '#fbbf24',
    fork: 'var(--text3)',
    commit: 'var(--green)',
  };

  return (
    <div className="page-wrapper">
      <div className="section">
        <div className="container">
          {/* Header */}
          <div className={styles.header}>
            <div>
              <div className="section-label">Overview</div>
              <h1 className="section-title">Dashboard</h1>
            </div>
            <div className={styles.controls}>
              <div className={styles.themeToggle}>
                <span className={styles.themeLabel}>Theme</span>
                <button
                  className={`${styles.toggleBtn} ${theme === 'light' ? styles.toggleLight : ''}`}
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  <div className={styles.toggleKnob}>
                    {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                  </div>
                </button>
              </div>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                All systems operational
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {['overview', 'skills', 'activity'].map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>

          {activeTab === 'overview' && (
            <div className={styles.grid2}>
              {/* Weekly chart */}
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelTitle}>Weekly Coding Hours</span>
                  <span className={styles.panelSub}>This week</span>
                </div>
                <div className={styles.barChart}>
                  {WEEKLY.map((w, i) => (
                    <div key={w.day} className={styles.barGroup} style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className={styles.barWrap}>
                        <div
                          className={styles.bar}
                          style={{ height: `${(w.hours / maxHours) * 100}%`, '--delay': `${i * 0.1}s` }}
                          title={`${w.hours}h`}
                        />
                      </div>
                      <div className={styles.barLabel}>{w.day}</div>
                      <div className={styles.barVal}>{w.hours}h</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelTitle}>Recent Activity</span>
                  <span className={styles.panelSub}>{ACTIVITY.length} events</span>
                </div>
                <div className={styles.activityList}>
                  {ACTIVITY.slice(0, 5).map((a, i) => (
                    <div key={i} className={styles.activityItem} style={{ animationDelay: `${i * 0.07}s` }}>
                      <div className={styles.activityDot} style={{ background: typeColors[a.type] }} />
                      <div className={styles.activityContent}>
                        <span className={styles.activityAction}>{a.action}</span>
                        <span className={styles.activityTarget}>{a.target}</span>
                      </div>
                      <span className={styles.activityTime}>{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>Skill Proficiency</span>
              </div>
              <div className={styles.skillsGrid}>
                {SKILLS_CHART.map((s, i) => (
                  <div key={s.name} className={styles.skillRow} style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className={styles.skillInfo}>
                      <span className={styles.skillName}>{s.name}</span>
                      <span className={styles.skillVal}>{s.value}%</span>
                    </div>
                    <div className={styles.skillTrack}>
                      <div className={styles.skillFill} style={{ width: `${s.value}%`, transitionDelay: `${i * 0.1}s` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>All Activity</span>
                <span className={styles.panelSub}>{ACTIVITY.length} total</span>
              </div>
              <div className={styles.activityList}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} className={styles.activityItem} style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className={styles.activityDot} style={{ background: typeColors[a.type] }} />
                    <div className={styles.activityContent}>
                      <span className={styles.activityAction}>{a.action}</span>
                      <span className={styles.activityTarget}>{a.target}</span>
                    </div>
                    <span className={styles.activityTime}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SunIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
