import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useReveal } from '../lib/useReveal.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/projects/${slug}`).then(setProject).catch(() => setError(true));
  }, [slug]);

  useReveal([project]);

  if (error) {
    return (
      <section className="page-header">
        <div className="wrap">
          <p>Project not found. <Link to="/projects">Back to projects</Link></p>
        </div>
      </section>
    );
  }

  if (!project) return null;

  return (
    <section className="page-header">
      <div className="wrap">
        <div className="breadcrumb reveal">
          <Link to="/projects">Projects</Link> / {project.title}
        </div>
        <h1 className="section-title reveal" style={{ fontSize: 'clamp(28px,4vw,42px)' }}>{project.title}</h1>

        <div className="detail-hero-img reveal">
          <span>{project.category} Project</span>
        </div>

        <div className="detail-grid">
          <div>
            <div className="detail-block reveal">
              <h3>Project Overview</h3>
              <p>{project.desc}</p>
            </div>
            <div className="detail-block reveal">
              <h3>Key Features</h3>
              <ul className="checklist">
                {(project.features?.length ? project.features : ['—']).map((f) => (
                  <li key={f}>
                    <span className="check-ico">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="detail-block reveal">
              <h3>Results</h3>
              <div className="results-row">
                {(project.results?.length ? project.results : [{ value: '—', label: 'No results logged yet' }]).map((r, i) => (
                  <div className="result-stat" key={i}>
                    <b>{r.value}</b>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="overview-card">
              <div className="ov-row"><span className="k">Client</span><span className="v">{project.client || '—'}</span></div>
              <div className="ov-row"><span className="k">Category</span><span className="v">{project.category}</span></div>
              <div className="ov-row"><span className="k">Duration</span><span className="v">{project.duration || '—'}</span></div>
              <div className="ov-row"><span className="k">Status</span><span className="v">{project.status}</span></div>
              <div className="ov-row"><span className="k">Technologies</span><span className="v">{(project.tags || []).join(', ') || '—'}</span></div>
            </div>
            <div className="detail-actions">
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Demo ↗</a>}
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">GitHub ↗</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
