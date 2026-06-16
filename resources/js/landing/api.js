const BASE = '/api/public';

export async function fetchAll() {
  const res = await fetch(`${BASE}/all`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function fetchSettings() {
  const res = await fetch(`${BASE}/settings`);
  return res.json();
}
