const BASE = '/api/admin';

function getCsrfToken() {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

async function request(method, path, body = null, isFormData = false) {
  const opts = {
    method,
    headers: {
      'X-CSRF-TOKEN': getCsrfToken(),
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'same-origin',
  };

  if (body) {
    if (isFormData) {
      opts.body = body;
    } else {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
  }

  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Terjadi kesalahan');
  }

  return data;
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body, isFormData = false) => request('POST', path, body, isFormData),
  put: (path, body, isFormData = false) => request('PUT', path, body, isFormData),
  postForm: (path, formData) => request('POST', path, formData, true),
  delete: (path) => request('DELETE', path),
};

export const auth = {
  me: () => fetch('/api/admin/me', { credentials: 'same-origin' }).then(r => r.json()),
  login: (email, password) => api.post('/login', { email, password }),
  logout: () => api.post('/logout'),
};
