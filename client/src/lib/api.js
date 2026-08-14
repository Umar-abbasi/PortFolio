const BASE = '/api';

function authHeaders() {
  const token = sessionStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.errors?.[0]?.msg || 'Request failed');
  return data;
}

export const api = {
  get: (path) => fetch(`${BASE}${path}`, { headers: authHeaders() }).then(handle),
  post: (path, body) =>
    fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    }).then(handle),
  put: (path, body) =>
    fetch(`${BASE}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    }).then(handle),
  patch: (path, body) =>
    fetch(`${BASE}${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body || {}),
    }).then(handle),
  del: (path) => fetch(`${BASE}${path}`, { method: 'DELETE', headers: authHeaders() }).then(handle),
};
