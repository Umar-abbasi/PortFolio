import { useEffect, useMemo, useState } from 'react';
import { useReveal, useTilt } from '../lib/useReveal.js';
import { api } from '../lib/api.js';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects').then(setProjects).catch(() => setProjects([])).finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  useReveal([projects, filter]);
  useTilt('.proj-card');

  return (
    <>
      <section className="page-header">
        <div className="wrap">
          <div className="eyebrow reveal">Projects</div>
          <h1 className="section-title reveal" style={{ fontSize: 'clamp(30px,4.5vw,46px)' }}>Featured Projects</h1>
          <p className="section-sub reveal">Add your own builds as you ship them — each one links straight to its GitHub repo.</p>
        </div>
      </section>
      <section className="tight">
        <div className="wrap">
          <div className="filter-tabs reveal">
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-tab${filter === c ? ' active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="projects-grid reveal">
            {!loading && filtered.length === 0 && (
              <div className="empty-state">No projects in this category yet.</div>
            )}
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
