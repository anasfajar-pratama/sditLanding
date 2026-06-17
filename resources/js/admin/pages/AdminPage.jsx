import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAdmin } from '../App';
import { FormField, Input, Card, PageHeader } from '../components/FormField';
import { Plus, Shield, ShieldOff, Trash2, X, Check, User, Lock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function PasswordModal({ title, onConfirm, onCancel }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    await onConfirm(password);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <h3 className="font-display font-bold text-lg text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">Masukkan password administrator untuk melanjutkan.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Password Administrator">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
                placeholder="Masukkan password..."
                autoFocus
              />
            </div>
          </FormField>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onCancel} className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm hover:bg-gray-200 transition-all">
              Batal
            </button>
            <button type="submit" disabled={loading || !password}
              className="bg-primary text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-orange-600 disabled:opacity-60 transition-all flex items-center gap-1.5">
              {loading ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddAdminModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    setSaving(true);
    try {
      const res = await api.post('/admins', form);
      onSaved(res.data);
      toast.success('Admin ditambahkan!');
      onClose();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-gray-800">Tambah Admin Baru</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Nama" required>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Nama admin" />
            </FormField>
            <FormField label="Email" required>
              <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="admin@sekolah.sch.id" />
            </FormField>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 flex items-start gap-2">
            <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Admin baru akan dibuat sebagai <strong>Operator</strong> — hanya dapat mengelola konten, tidak bisa mengelola admin lain.</span>
          </div>
          <FormField label="Password" required>
            <Input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required placeholder="Minimal 6 karakter" minLength={6} />
          </FormField>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm hover:bg-gray-200 transition-all">Batal</button>
            <button type="submit" disabled={saving}
              className="bg-primary text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-orange-600 disabled:opacity-60 transition-all flex items-center gap-1.5">
              {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { admin } = useAdmin();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const isAdmin = admin?.role === 'administrator';

  useEffect(() => {
    api.get('/admins').then(d => setAdmins(d.data || d)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleConfirm = async (password) => {
    try {
      const { id, action } = confirm;
      let res;
      if (action === 'suspend') res = await api.post(`/admins/${id}/suspend`, { password });
      else if (action === 'unsuspend') res = await api.post(`/admins/${id}/unsuspend`, { password });
      else if (action === 'delete') res = await api.post(`/admins/${id}/delete`, { password });

      setAdmins(prev => {
        if (action === 'delete') return prev.filter(a => a.id !== id);
        return prev.map(a => a.id === id ? { ...a, is_suspended: action === 'suspend' } : a);
      });
      toast.success(res.message || 'Berhasil!');
      setConfirm(null);
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (loading) return <div className="animate-pulse">Memuat...</div>;

  return (
    <div>
      <PageHeader title="Kelola Admin" subtitle={isAdmin ? 'Tambah, nonaktifkan, atau hapus akun administrator' : 'Lihat daftar administrator dan operator'} />

      <Card className="mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-gray-800">{admin?.name}</div>
          <div className="text-sm text-gray-500">{admin?.email}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            admin?.role === 'administrator' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {admin?.role === 'administrator' ? 'Administrator' : 'Operator'}
          </span>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Akun Anda</span>
        </div>
      </Card>

      {!isAdmin && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4 text-sm text-orange-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>Anda login sebagai <strong>Operator</strong>. Hanya <strong>Administrator</strong> yang dapat menambah, menonaktifkan, atau menghapus akun.</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{admins.length} admin</p>
        {isAdmin && (
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-secondary text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm">
            <Plus className="w-4 h-4" /> Tambah Admin
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {admins.map(a => {
          const isSelf = a.id === admin?.id;
          const isAdministrator = a.role === 'administrator';
          return (
            <Card key={a.id} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${a.is_suspended ? 'bg-gray-200 text-gray-400' : isAdministrator ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                  {a.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 text-sm truncate">{a.name}</div>
                  <div className="text-xs text-gray-400 truncate">{a.email}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${a.is_suspended ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                    {a.is_suspended ? 'Nonaktif' : 'Aktif'}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isAdministrator ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {isAdministrator ? 'Administrator' : 'Operator'}
                  </span>
                </div>
              </div>
              {!isSelf && isAdmin && !isAdministrator && (
                <div className="flex gap-2 border-t border-gray-100 pt-3">
                  {a.is_suspended ? (
                    <button onClick={() => setConfirm({ id: a.id, action: 'unsuspend' })}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-teal-100 text-teal-700 hover:bg-teal-200 rounded-xl py-1.5 text-xs font-bold transition-all">
                      <ShieldOff className="w-3.5 h-3.5" /> Aktifkan
                    </button>
                  ) : (
                    <button onClick={() => setConfirm({ id: a.id, action: 'suspend' })}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-orange-100 text-orange-600 hover:bg-orange-200 rounded-xl py-1.5 text-xs font-bold transition-all">
                      <Shield className="w-3.5 h-3.5" /> Nonaktifkan
                    </button>
                  )}
                  <button onClick={() => setConfirm({ id: a.id, action: 'delete' })}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-red-100 text-red-500 hover:bg-red-200 rounded-xl py-1.5 text-xs font-bold transition-all">
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {showAdd && <AddAdminModal onClose={() => setShowAdd(false)} onSaved={(d) => setAdmins(prev => [...prev, d])} />}

      {confirm && (
        <PasswordModal
          title={confirm.action === 'delete' ? 'Hapus Admin' : confirm.action === 'suspend' ? 'Nonaktifkan Admin' : 'Aktifkan Admin'}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
