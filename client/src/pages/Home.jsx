import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal, useTilt } from '../lib/useReveal.js';
import { api } from '../lib/api.js';
import ProjectCard from '../components/ProjectCard.jsx';
import CodingLaptop3D from '../components/CodingLaptop3D.jsx';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((data) => setProjects(data.slice(0, 3))).catch(() => setProjects([]));
  }, []);

  useReveal([projects]);
  useTilt('.service-card, .proj-card');

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="reveal">
              <div className="eyebrow">Hi, I'm Umar Iftikhar Abbasi</div>
              <h1>
                Web, Android &amp;<br />
                <span className="grad-text">ERP</span> Specialist
              </h1>
              <p className="lead">
                I build modern web, mobile and ERP solutions that drive business growth and
                efficiency — from custom Odoo modules to native Android apps.
              </p>
              <div className="pill-row">
                <span className="pill">Web Developer</span>
                <span className="pill">Android Developer</span>
                <span className="pill">Odoo Specialist</span>
                <span className="pill">SAP Consultant</span>
              </div>
              <div className="hero-actions">
                <Link to="/projects" className="btn btn-primary">View My Work →</Link>
                <a href="/Umar-Iftikhar-Abbasi-CV.pdf" download className="btn btn-ghost">Download CV ⭳</a>
              </div>
              <div className="connect-label">CONNECT WITH ME</div>
              <div className="social-row">
                <a href="https://github.com/Umar-abbasi" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/umar-abbasi-f21605025" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4V8z" /></svg>
                </a>
                <a href="mailto:umarabbasi11811@gmail.com" className="social-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 6 9-6" /></svg>
                </a>
                <a href="https://wa.me/923451322997" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.34A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.6 0-3.1-.43-4.4-1.18l-.32-.19-3.03.8.81-2.95-.2-.3A7.9 7.9 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z" /></svg>
                </a>
              </div>
            </div>

            <div className="hero-visual reveal">
              <div className="glow-ring"></div>
              <svg className="connector-lines" viewBox="0 0 600 480" preserveAspectRatio="none">
                <line x1="300" y1="240" x2="9" y2="21" />
                <line x1="300" y1="240" x2="605" y2="81" />
                <line x1="300" y1="240" x2="10" y2="399" />
                <line x1="300" y1="240" x2="589" y2="453" />
              </svg>
              <CodingLaptop3D />
              <div className="float-badge fb-1"><span className="fb-dot"></span>Odoo</div>
              <div className="float-badge fb-2"><span className="fb-dot"></span>SAP</div>
              <div className="float-badge fb-3"><span className="fb-dot"></span>Android</div>
              <div className="float-badge fb-4"><span className="fb-dot"></span>API</div>
            </div>
          </div>

          <div className="stats-bar reveal">
            <div className="stat-item">
              <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" /></svg></div>
              <div><b>3+</b><span>Years Experience</span></div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg></div>
              <div><b>10+</b><span>Projects Completed</span></div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
              <div><b>6+</b><span>Happy Clients</span></div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" /></svg></div>
              <div><b>100%</b><span>Client Satisfaction</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="wrap">
          <div className="eyebrow reveal">Services</div>
          <h2 className="section-title reveal">What I Can Do For You</h2>
          <p className="section-sub reveal">From ERP configuration to the apps that run on top of it — one specialist across your whole stack.</p>
          <div className="services-grid reveal">
            <div className="service-card">
              <div className="service-icon si-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></svg></div>
              <h3>Web Development</h3>
              <p>Modern, responsive and high-performance websites using the latest frameworks.</p>
            </div>
            <div className="service-card">
              <div className="service-icon si-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg></div>
              <h3>Android Development</h3>
              <p>Native and cross-platform Android apps that deliver great user experiences.</p>
            </div>
            <div className="service-card">
              <div className="service-icon si-3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg></div>
              <h3>Odoo ERP Solutions</h3>
              <p>Custom Odoo modules, implementation, integration and ongoing support.</p>
            </div>
            <div className="service-card">
              <div className="service-icon si-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" /></svg></div>
              <h3>SAP Consulting</h3>
              <p>SAP implementation, configuration and business process optimization.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '44px' }} className="reveal">
            <Link to="/services" className="btn btn-ghost">View All Services →</Link>
          </div>
        </div>
      </section>

      <section id="projects-teaser">
        <div className="wrap">
          <div className="eyebrow reveal">Projects</div>
          <h2 className="section-title reveal">Featured Work</h2>
          <p className="section-sub reveal">A few recent builds — the full case studies live on the Projects page.</p>
          <div className="projects-grid reveal">
            {projects.length === 0 && (
              <div className="empty-state">No projects yet — add some from the admin dashboard.</div>
            )}
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/projects" className="btn btn-ghost">View All Projects →</Link>
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="wrap">
          <div className="contact-form-card reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', padding: '48px' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: '8px' }}>Let's build something solid.</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '460px' }}>Have an ERP rollout, integration, or app in mind? I'd love to hear about it.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">Get in Touch →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
