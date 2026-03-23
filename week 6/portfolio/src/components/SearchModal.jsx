import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import styles from './SearchModal.module.css';

const SEARCH_DATA = [
  { label: 'Home', path: '/', type: 'page', desc: 'Hero, intro, CTA' },
  { label: 'About', path: '/about', type: 'page', desc: 'Bio, skills, experience' },
  { label: 'Projects', path: '/projects', type: 'page', desc: 'Project showcase' },
  { label: 'Contact', path: '/contact', type: 'page', desc: 'Get in touch' },
  { label: 'Dashboard', path: '/dashboard', type: 'page', desc: 'Stats & activity' },
  { label: 'React Dashboard', path: '/projects', type: 'project', desc: 'Full-stack analytics' },
  { label: 'AI Chat App', path: '/projects', type: 'project', desc: 'LLM-powered chat' },
  { label: 'Design System', path: '/projects', type: 'project', desc: 'Component library' },
  { label: 'E-Commerce Platform', path: '/projects', type: 'project', desc: 'Next.js storefront' },
  { label: 'React', path: '/about', type: 'skill', desc: 'Frontend framework' },
  { label: 'TypeScript', path: '/about', type: 'skill', desc: 'Type-safe JavaScript' },
  { label: 'Node.js', path: '/about', type: 'skill', desc: 'Backend runtime' },
];

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, query, setQuery } = useSearch();
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setSelected(0);
    }
  }, [isSearchOpen, setQuery]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const filtered = SEARCH_DATA.filter(
      item => item.label.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );
    setResults(filtered);
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
      if (!isSearchOpen) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && results[selected]) {
        navigate(results[selected].path);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSearchOpen, results, selected, navigate, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const typeColors = { page: 'badge-accent', project: 'badge-blue', skill: 'badge-green' };

  return createPortal(
    <div className={styles.overlay} onClick={() => setIsSearchOpen(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.inputWrap}>
          <SearchIcon />
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search pages, projects, skills..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className={styles.esc} onClick={() => setIsSearchOpen(false)}>ESC</kbd>
        </div>
        {results.length > 0 && (
          <ul className={styles.results}>
            {results.map((r, i) => (
              <li
                key={i}
                className={`${styles.result} ${i === selected ? styles.selected : ''}`}
                onClick={() => { navigate(r.path); setIsSearchOpen(false); }}
                onMouseEnter={() => setSelected(i)}
              >
                <div className={styles.resultLeft}>
                  <span className={styles.resultLabel}>{r.label}</span>
                  <span className={styles.resultDesc}>{r.desc}</span>
                </div>
                <span className={`badge ${typeColors[r.type]}`}>{r.type}</span>
              </li>
            ))}
          </ul>
        )}
        {query && results.length === 0 && (
          <div className={styles.empty}>No results for "<strong>{query}</strong>"</div>
        )}
        {!query && (
          <div className={styles.hint}>
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span>ESC close</span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0, color:'var(--text3)'}}>
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
