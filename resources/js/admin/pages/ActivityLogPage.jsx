import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { PageHeader, Card } from '../components/FormField';
import { Search, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const actionLabels = {
  login: 'Login',
  logout: 'Logout',
  create_admin: 'Tambah Admin',
  suspend_admin: 'Nonaktifkan Admin',
  unsuspend_admin: 'Aktifkan Admin',
  delete_admin: 'Hapus Admin',
  create_guru: 'Tambah Guru',
  update_guru: 'Ubah Guru',
  delete_guru: 'Hapus Guru',
  create_program: 'Tambah Program',
  update_program: 'Ubah Program',
  delete_program: 'Hapus Program',
  create_fasilitas: 'Tambah Fasilitas',
  update_fasilitas: 'Ubah Fasilitas',
  delete_fasilitas: 'Hapus Fasilitas',
  create_galeri: 'Tambah Galeri',
  update_galeri: 'Ubah Galeri',
  delete_galeri: 'Hapus Galeri',
  activate_galeri: 'Tampilkan Galeri',
  deactivate_galeri: 'Sembunyikan Galeri',
  create_statistik: 'Tambah Statistik',
  update_statistik: 'Ubah Statistik',
  delete_statistik: 'Hapus Statistik',
  create_testimoni: 'Tambah Testimoni',
  update_testimoni: 'Ubah Testimoni',
  delete_testimoni: 'Hapus Testimoni',
  update_hero: 'Ubah Hero',
  update_tentang: 'Ubah Tentang',
  upload_gambar_tentang: 'Upload Gambar',
  delete_gambar_tentang: 'Hapus Gambar',
  update_pengaturan: 'Ubah Pengaturan',
  update_kontak: 'Ubah Kontak',
};

export default function ActivityLogPage() {
  const [logs, setLogs] = useState({ data: [], current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchLogs = async (p = page, s = search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p, per_page: '20' });
      if (s) params.set('search', s);
      const res = await fetch(`/api/admin/activity-logs?${params}`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin',
      });
      const data = await res.json();
      setLogs(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(page, search); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLogs(1, search);
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Baru saja';
    if (mins < 60) return `${mins} menit lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  return (
    <div>
      <PageHeader title="Log Aktivitas" subtitle="Riwayat aktivitas administrator" />

      <Card className="mb-6">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari admin, aksi, atau detail..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
            />
          </div>
          <button type="submit" className="bg-primary text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-orange-600 transition-all">
            Cari
          </button>
          {search && (
            <button type="button" onClick={() => { setSearch(''); setPage(1); fetchLogs(1, ''); }}
              className="bg-gray-100 text-gray-600 font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-gray-200 transition-all">
              Reset
            </button>
          )}
        </form>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wider">Admin</th>
                <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wider">Aksi</th>
                <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wider">Detail</th>
                <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wider">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-10 text-gray-400">Memuat...</td></tr>
              ) : logs.data.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-10 text-gray-400">Belum ada aktivitas</td></tr>
              ) : (
                logs.data.map((log) => (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-800">{log.admin_name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${
                        log.action === 'login' ? 'bg-blue-100 text-blue-700' :
                        log.action === 'logout' ? 'bg-gray-100 text-gray-600' :
                        log.action === 'create_admin' ? 'bg-green-100 text-green-700' :
                        log.action === 'delete_admin' ? 'bg-red-100 text-red-600' :
                        log.action === 'suspend_admin' ? 'bg-orange-100 text-orange-600' :
                        log.action === 'unsuspend_admin' ? 'bg-teal-100 text-teal-700' :
                        log.action.startsWith('create_') ? 'bg-green-100 text-green-700' :
                        log.action.startsWith('delete_') ? 'bg-red-100 text-red-600' :
                        log.action.startsWith('update_') || log.action.startsWith('ubah_') ? 'bg-blue-100 text-blue-700' :
                        log.action.startsWith('activate_') ? 'bg-teal-100 text-teal-700' :
                        log.action.startsWith('deactivate_') ? 'bg-orange-100 text-orange-600' :
                        log.action.startsWith('upload_') ? 'bg-purple-100 text-purple-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {actionLabels[log.action] || log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{log.details || '-'}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      <span title={new Date(log.created_at).toLocaleString('id-ID')}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {timeAgo(log.created_at)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {logs.last_page > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary transition-all disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-500 font-semibold">
            {logs.current_page} / {logs.last_page}
          </span>
          <button
            onClick={() => setPage(p => Math.min(logs.last_page, p + 1))}
            disabled={page === logs.last_page}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary transition-all disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
