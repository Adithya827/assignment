import { useState } from 'react';
import styles from './Contact.module.css';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
    setForm(INITIAL);
  };

  return (
    <div className="page-wrapper">
      <div className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.left}>
              <div className="section-label">Contact</div>
              <h1 className="section-title">Let's build<br />something great</h1>
              <p className={styles.sub}>
                Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours.
              </p>

              <div className={styles.infoList}>
                {[
                  { icon: <EmailIcon />, label: 'Email', value: 'adithya@example.com' },
                  { icon: <PhoneIcon />, label: 'Phone', value: '+91  00000-00000' },
                  { icon: <LocationIcon />, label: 'Location', value: 'Karnataka, INDIA' },
                  { icon: <ClockIcon />, label: 'Response time', value: '< 24 hours' },
                ].map(item => (
                  <div key={item.label} className={styles.infoItem}>
                    <div className={styles.infoIcon}>{item.icon}</div>
                    <div>
                      <div className={styles.infoLabel}>{item.label}</div>
                      <div className={styles.infoValue}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.social}>
                {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map(s => (
                  <a key={s} href="#" className={styles.socialLink}>{s}</a>
                ))}
              </div>
            </div>

            <div className={styles.right}>
              {status === 'success' ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Message sent!</h3>
                  <p className={styles.successMsg}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button className="btn btn-outline" onClick={() => setStatus('idle')}>Send another</button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formTitle}>Send a message</div>

                  <div className={styles.row}>
                    <Field label="Name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} error={errors.name} />
                    <Field label="Email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                  </div>

                  <Field label="Subject" name="subject" placeholder="Project inquiry" value={form.subject} onChange={handleChange} error={errors.subject} />

                  <Field label="Message" name="message" type="textarea" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} error={errors.message} rows={5} />

                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submitBtn}`}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <><span className={styles.btnSpinner} /> Sending...</>
                    ) : (
                      <><SendIcon /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', placeholder, value, onChange, error, rows }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows || 4}
          style={{
            background: 'var(--bg3)',
            border: `1px solid ${error ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            padding: '12px 14px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text)',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => !error && (e.target.style.borderColor = 'var(--border2)')}
          onBlur={e => !error && (e.target.style.borderColor = 'var(--border)')}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            background: 'var(--bg3)',
            border: `1px solid ${error ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            padding: '12px 14px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text)',
            outline: 'none',
            transition: 'border-color 0.2s',
            width: '100%',
          }}
          onFocus={e => !error && (e.target.style.borderColor = 'var(--border2)')}
          onBlur={e => !error && (e.target.style.borderColor = 'var(--border)')}
        />
      )}
      {error && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>{error}</span>}
    </div>
  );
}

const EmailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.09 6.09l1.02-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const LocationIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const ClockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const SendIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
