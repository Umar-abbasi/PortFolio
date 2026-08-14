import { Link } from 'react-router-dom';

const statusLabel = { live: 'Live', progress: 'In Progress', draft: 'Draft' };

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function IconLive() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export default function ProjectCard({ project }) {
  const p = project;
  return (
    <div className="proj-card">
      <div className="proj-thumb">
        <span className={`proj-status ${p.status}`}>
          <span className="dot"></span>
          {statusLabel[p.status] || p.status}
        </span>
        <span className="proj-thumb-icon">{p.category}</span>
      </div>
      <div className="proj-body">
        <span className="proj-cat">{p.category}</span>
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
        <div className="proj-tags">
          {(p.tags || []).slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="proj-foot">
          <div className="proj-links">
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer">
                <IconGithub />
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer">
                <IconLive />
              </a>
            )}
          </div>
          <Link to={`/projects/${p.slug}`} className="proj-view">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
