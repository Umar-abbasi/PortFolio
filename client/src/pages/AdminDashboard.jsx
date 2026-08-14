import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useAuth } from '../lib/AuthContext.jsx';

const emptyForm = {
  title: '', category: '', status: 'draft', client: '', duration: '',
  desc: '', github: '', live: '', featuresText: '', tagsText: '',
};

export default function AdminDashboard() {
  const { isAuthed, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  async function refresh() {
    try {
      const [p, m] = await Promise.all([api.get('/projects'), api.get('/contact')]);
      setProjects(p);
      setMessages(m);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isAuthed) refresh();
  }, [isAuthed]);

  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      title: p.title, category: p.category, status: p.status,
      client: p.client || '', duration: p.duration || '', desc: p.desc || '',
      github: p.github || '', live: p.live || '',
      featuresText: (p.features || []).join('\n'),
      tagsText: (p.tags || []).join(', '),
    });
  }

  async function submit(e) {
    e.preventDefault();
    setError('');
    const payload = {
      title: form.title,
      category: form.category,
      status: form.status,
      client: form.client,
      duration: form.duration,
      desc: form.desc,
      github: form.github || null,
      live: form.live || null,
      features: form.featuresText.split('\n').map((s) => s.trim()).filter(Boolean),
      results: [],
      tags: form.tagsText.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm('Delete this project?')) return;
    await api.del(`/projects/${id}`);
    refresh();
  }

  return (
    <section className="page-header">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="section-title" style={{ marginBottom: 0 }}>Admin Dashboard</h1>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Log Out</button>
        </div>

        <div className="tight">
          <h3 style={{ marginBottom: '16px' }}>{editingId ? 'Edit Project' : 'Add Project'}</h3>
          <form className="contact-form-card" onSubmit={submit} style={{ marginBottom: '40px' }}>
            <div className="two-col">
              <div className="modal-form-row">
                <label>Title</label>
                <input required value={form.title} onChange={(e) => update('title', e.target.value)} />
              </div>
              <div className="modal-form-row">
                <label>Category</label>
                <input required value={form.category} onChange={(e) => update('category', e.target.value)} />
              </div>
            </div>
            <div className="two-col">
              <div className="modal-form-row">
                <label>Status</label>
                <select value={form.status} onChange={(e) => update('status', e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="progress">In Progress</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div className="modal-form-row">
                <label>Client</label>
                <input value={form.client} onChange={(e) => update('client', e.target.value)} />
              </div>
            </div>
            <div className="modal-form-row">
              <label>Duration</label>
              <input value={form.duration} onChange={(e) => update('duration', e.target.value)} />
            </div>
            <div className="modal-form-row">
              <label>Description</label>
              <textarea value={form.desc} onChange={(e) => update('desc', e.target.value)} />
            </div>
            <div className="modal-form-row">
              <label>Features (one per line)</label>
              <textarea value={form.featuresText} onChange={(e) => update('featuresText', e.target.value)} />
            </div>
            <div className="modal-form-row">
              <label>Tags (comma separated)</label>
              <input value={form.tagsText} onChange={(e) => update('tagsText', e.target.value)} />
            </div>
            <div className="two-col">
              <div className="modal-form-row">
                <label>GitHub URL</label>
                <input value={form.github} onChange={(e) => update('github', e.target.value)} />
              </div>
              <div className="modal-form-row">
                <label>Live URL</label>
                <input value={form.live} onChange={(e) => update('live', e.target.value)} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" type="submit">{editingId ? 'Save Changes' : 'Add Project'}</button>
              {editingId && (
                <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                  Cancel
                </button>
              )}
            </div>
            {error && <div className="form-error">{error}</div>}
          </form>

          <h3 style={{ marginBottom: '16px' }}>Projects</h3>
          <table className="admin-table" style={{ marginBottom: '40px' }}>
            <thead>
              <tr><th>Title</th><th>Category</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{p.status}</td>
                  <td className="admin-actions">
                    <button onClick={() => startEdit(p)}>Edit</button>
                    <button onClick={() => remove(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginBottom: '16px' }}>Contact Messages</h3>
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Message</th><th>Received</th></tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.message}</td>
                  <td>{new Date(m.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
