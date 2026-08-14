import { useState } from 'react';
import { useReveal } from '../lib/useReveal.js';
import { api } from '../lib/api.js';

export default function Contact() {
  useReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', error: '' });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', error: '' });
    try {
      await api.post('/contact', form);
      setStatus({ state: 'success', error: '' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ state: 'error', error: err.message });
    }
  }

  return (
    <>
      <section className="page-header" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="eyebrow reveal">Contact</div>
          <h1 className="section-title reveal" style={{ fontSize: 'clamp(30px,4.5vw,46px)' }}>Let's Work Together</h1>
        </div>
      </section>

      <section className="tight">
        <div className="wrap">
          <div className="contact-grid">
            <div className="reveal">
              <p style={{ color: 'var(--muted)', fontSize: '15.5px', maxWidth: '400px' }}>
                Have a project in mind? Let's discuss how I can help you achieve your goals —
                whether it's an ERP rollout, an integration, or the app your team's been waiting for.
              </p>
              <div className="contact-list">
                <div className="contact-item">
                  <div className="ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 6 9-6" /></svg></div>
                  <div>
                    <span className="ci-label">Email</span><br />
                    <a href="mailto:umarabbasi11811@gmail.com" className="ci-val">umarabbasi11811@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
                  <div>
                    <span className="ci-label">Phone / WhatsApp</span><br />
                    <a href="tel:+923451322997" className="ci-val">+92 345 1322997</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="ci-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4V8z" /></svg></div>
                  <div>
                    <span className="ci-label">LinkedIn</span><br />
                    <a href="https://www.linkedin.com/in/umar-abbasi-f21605025" target="_blank" rel="noopener noreferrer" className="ci-val">umar-abbasi-f21605025</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="ci-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" /></svg></div>
                  <div>
                    <span className="ci-label">GitHub</span><br />
                    <a href="https://github.com/Umar-abbasi" target="_blank" rel="noopener noreferrer" className="ci-val">Umar-abbasi</a>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form-card reveal" onSubmit={submit}>
              <div className="form-row">
                <label>Your Name</label>
                <input required value={form.name} onChange={(e) => update('name', e.target.value)} maxLength={120} placeholder="Full name" />
              </div>
              <div className="form-row">
                <label>Your Email</label>
                <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" />
              </div>
              <div className="form-row">
                <label>Your Message</label>
                <textarea required minLength={10} maxLength={5000} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status.state === 'sending'}>
                {status.state === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              {status.state === 'error' && <div className="form-error">{status.error}</div>}
              {status.state === 'success' && <div className="form-success">Message sent — I'll get back to you soon.</div>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
