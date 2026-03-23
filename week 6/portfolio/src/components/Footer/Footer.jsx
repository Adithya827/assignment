import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.logo}>AC</span>
            <div>
              <div className={styles.name}>Adithya</div>
              <div className={styles.tagline}>Building things for the web</div>
            </div>
          </div>
          <div className={styles.social}>
            {[
              { href: '#', label: 'GitHub', icon: 'GH' },
              { href: '#', label: 'LinkedIn', icon: 'LI' },
              { href: '#', label: 'Twitter', icon: 'TW' },
            ].map(s => (
              <a key={s.label} href={s.href} className={styles.socialLink} aria-label={s.label}>{s.label}</a>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Adithya. All rights reserved.</span>
          <span className={styles.credit}>Built with React</span>
        </div>
      </div>
    </footer>
  );
}
