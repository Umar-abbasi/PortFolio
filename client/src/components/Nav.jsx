import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="nav-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">U</span>UMAR
        </Link>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
        <div className={`nav-links${open ? ' open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-right">
          <Link to="/contact" className="nav-cta">Let's Talk</Link>
        </div>
      </div>
    </nav>
  );
}
