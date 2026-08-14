import { Link } from 'react-router-dom';
import { useReveal, useTilt } from '../lib/useReveal.js';

const services = [
  {
    icon: 'si-1',
    title: 'Web Development',
    desc: 'Marketing sites, dashboards and customer portals built with modern frameworks — fast, responsive, and easy to maintain.',
    learn: 'React · Next.js · Node.js',
    svg: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></>,
  },
  {
    icon: 'si-2',
    title: 'Android Development',
    desc: 'Native and cross-platform apps for field teams, delivery, and inventory — often wired straight into your ERP.',
    learn: 'Kotlin · Flutter',
    svg: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></>,
  },
  {
    icon: 'si-3',
    title: 'Odoo ERP Solutions',
    desc: 'Implementation, custom module development and configuration across Sales, Inventory, Accounting, HR and CRM.',
    learn: 'Odoo 15–18 · Python',
    svg: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  },
  {
    icon: 'si-4',
    title: 'SAP Consulting',
    desc: 'SAP implementation, configuration and integration via RFC, OData and custom middleware.',
    learn: 'SAP S/4HANA · OData',
    svg: <><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" /></>,
  },
  {
    icon: 'si-1',
    title: 'Custom Module Development',
    desc: "Bespoke modules and workflow automation for the exact process the out-of-the-box system doesn't cover.",
    learn: 'Python · XML · QWeb',
    svg: <path d="M4 17V7a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />,
  },
  {
    icon: 'si-4',
    title: 'API & Integration',
    desc: 'REST, OData and webhook integrations connecting your ERP to eCommerce, payment gateways and third-party tools.',
    learn: 'REST · OData · Webhooks',
    svg: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
  {
    icon: 'si-2',
    title: 'Database Design',
    desc: 'Schema design and data migration for PostgreSQL, SAP HANA and MySQL, built to scale with your business.',
    learn: 'PostgreSQL · HANA',
    svg: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
  },
  {
    icon: 'si-3',
    title: 'Support & Maintenance',
    desc: 'Ongoing upgrades, bug fixes and performance tuning so your system keeps up as the business grows.',
    learn: 'SLA-backed support',
    svg: <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" />,
  },
];

const steps = [
  { n: '01', title: 'Requirements', desc: 'Collect and understand your requirements in detail.' },
  { n: '02', title: 'Analysis', desc: 'Match requirements against what’s actually needed — what to add, adjust, or drop if it isn’t beneficial.' },
  { n: '03', title: 'Design', desc: 'Design the UI/UX for the app, website or module.' },
  { n: '04', title: 'Development', desc: 'Build the complete app, website or modules end to end.' },
  { n: '05', title: 'QA & Testing', desc: 'Run quality testing to catch and remove bugs and errors.' },
  { n: '06', title: 'Client Review', desc: 'You test the build and flag any bugs, changes, or extras you want.' },
  { n: '07', title: 'Deployment', desc: 'Ship the finished product live.' },
];

export default function Services() {
  useReveal();
  useTilt('.service-card');
  return (
    <>
      <section className="page-header">
        <div className="wrap">
          <div className="eyebrow reveal">Services</div>
          <h1 className="section-title reveal" style={{ fontSize: 'clamp(30px,4.5vw,46px)' }}>Modules I install for your business</h1>
          <p className="section-sub reveal">Every engagement is scoped clearly — what's included, what it depends on, and what you get at the end.</p>
        </div>
      </section>

      <section className="tight">
        <div className="wrap">
          <div className="services-grid reveal">
            {services.map((s) => (
              <div className="service-card" key={s.title}>
                <div className={`service-icon ${s.icon}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{s.svg}</svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="learn">{s.learn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process">
        <div className="wrap">
          <div className="eyebrow reveal">Workflow</div>
          <h2 className="section-title reveal">How an engagement runs</h2>
          <div className="process-timeline reveal">
            {steps.map((s, i) => (
              <div className={`timeline-step ${i % 2 === 0 ? 'left' : 'right'}`} key={s.n}>
                <div className="timeline-dot">{s.n}</div>
                <div className="timeline-box">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="wrap">
          <div className="contact-form-card reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', padding: '48px' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: '8px' }}>Not sure which service you need?</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '460px' }}>Tell me what's slowing your business down — I'll help you figure out the right fix.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">Get in Touch →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
