import { useReveal } from '../lib/useReveal.js';

const checklist = [
  'Odoo ERP Implementation & Customization (Odoo 14–19, Certified Functional & Technical)',
  'Full-Stack Web Development (MERN Stack, Python)',
  'AI & Machine Learning (YOLO detection models, LLM-based tools)',
  'Android App Development (Kotlin)',
  'Database Design & API Development (SQL, MongoDB)',
];

const journey = [
  {
    icon: 'si-1',
    title: 'Foundations',
    desc: 'Started in web development, building a solid base in databases, APIs and clean architecture.',
    icons: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
  },
  {
    icon: 'si-3',
    title: 'Into ERP',
    desc: 'Moved into Odoo implementation, then SAP — learning how real businesses actually run.',
    icons: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    icon: 'si-2',
    title: 'Going Mobile',
    desc: 'Added Android development to extend ERP systems into the field, on the shop floor and beyond.',
    icons: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    icon: 'si-4',
    title: 'Today',
    desc: 'Full-stack across web, Android and ERP — one point of contact for the whole system.',
    icons: <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" />,
  },
];

export default function About() {
  useReveal();
  return (
    <>
      <section className="page-header">
        <div className="wrap">
          <div className="eyebrow reveal">About Me</div>
          <h1 className="section-title reveal" style={{ fontSize: 'clamp(30px,4.5vw,46px)' }}>
            Passionate about Technology and Business <span className="grad-text">Solutions</span>
          </h1>
        </div>
      </section>

      <section className="tight">
        <div className="wrap about-grid">
          <div className="about-photo-wrap reveal">
            <div className="exp-badge">
              <b>3+</b>
              <span>Years<br />Experience</span>
            </div>
            <div className="about-photo">
              <img src="/umar.jpg" alt="Umar Iftikhar Abbasi" />
            </div>
            <div className="sig-badge">Umar Abbasi</div>
          </div>
          <div className="reveal">
            <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '10px' }}>
              I'm an Odoo Functional &amp; Technical Developer with 3+ years of experience across
              Odoo 14 through 19, certified in both Functional and Technical training. I've
              delivered ERP customizations for 6+ clients and 10+ projects — alongside full-stack
              web, Android and AI work.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
              My work sits at the point where business process meets code — I don't just configure
              software, I make sure it actually fits the way your team operates day to day.
            </p>
            <ul className="checklist">
              {checklist.map((item) => (
                <li key={item}>
                  <span className="check-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/Umar-Iftikhar-Abbasi-CV.pdf" download className="btn btn-primary">Download CV ⭳</a>
          </div>
        </div>
      </section>

      <section id="story">
        <div className="wrap">
          <div className="eyebrow reveal">My Journey</div>
          <h2 className="section-title reveal">How I got here</h2>
          <div className="services-grid reveal" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            {journey.map((j) => (
              <div className="service-card" key={j.title}>
                <div className={`service-icon ${j.icon}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {j.icons}
                  </svg>
                </div>
                <h3>{j.title}</h3>
                <p>{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
