import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { FormField, Input, Select, Card, PageHeader } from '../components/FormField';
import { Plus, Trash2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ICONS = ['users', 'graduation-cap', 'calendar', 'trophy', 'award', 'star', 'heart', 'book'];

function StatRow({ stat, onChange, onDelete, onSave }) {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const save = async () => {
    setSaving(true);
    try { await onSave(stat.id, stat); toast.success('Disimpan!'); }
    catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const del = async () => {
    if (!confirm('Hapus statistik ini?')) return;
    setDeleting(true);
    try { await onDelete(stat.id); }
    catch (e) { toast.error(e.message); setDeleting(false); }
  };

  return (
    <div className="grid grid-cols-12 gap-3 items-end p-4 bg-gray-50 rounded-xl">
      <div className="col-span-12 sm:col-span-4">
        <FormField label="Label">
          <Input value={stat.label} onChange={e => onChange(stat.id, 'label', e.target.value)} placeholder="Siswa Aktif" />
        </FormField>
      </div>
      <div className="col-span-5 sm:col-span-2">
        <FormField label="Nilai">
          <Input value={stat.value} onChange={e => onChange(stat.id, 'value', e.target.value)} placeholder="500" />
        </FormField>
      </div>
      <div className="col-span-4 sm:col-span-2">
        <FormField label="Suffix">
          <Input value={stat.suffix} onChange={e => onChange(stat.id, 'suffix', e.target.value)} placeholder="+" />
        </FormField>
      </div>
      <div className="col-span-3 sm:col-span-2">
        <FormField label="Icon">
          <Select value={stat.icon} onChange={e => onChange(stat.id, 'icon', e.target.value)}>
            {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
          </Select>
        </FormField>
      </div>
      <div className="col-span-12 sm:col-span-2 flex gap-2">
        <button onClick={save} disabled={saving} className="flex-1 bg-primary text-white rounded-xl py-2.5 text-sm font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-1 disabled:opacity-60">
          {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Simpan
        </button>
        <button onClick={del} disabled={deleting} className="bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-xl px-3 py-2.5 transition-all disabled:opacity-60">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function StatsPage() {
  const [stats, setStats] = useState([]);
  const [newStat, setNewStat] = useState({ label: '', value: '', suffix: '+', icon: 'users' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    api.get('/stats').then(setStats).catch(() => {});
  }, []);

  const update = (id, field, value) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const save = async (id, stat) => {
    const updated = await api.put(`/stats/${id}`, {
      label: stat.label, value: stat.value, suffix: stat.suffix, icon: stat.icon
    });
    setStats(prev => prev.map(s => s.id === id ? updated.data : s));
  };

  const del = async (id) => {
    await api.delete(`/stats/${id}`);
    setStats(prev => prev.filter(s => s.id !== id));
    toast.success('Dihapus!');
  };

  const add = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await api.post('/stats', newStat);
      setStats(prev => [...prev, res.data]);
      setNewStat({ label: '', value: '', suffix: '+', icon: 'users' });
      toast.success('Statistik ditambahkan!');
    } catch (e) { toast.error(e.message); }
    finally { setAdding(false); }
  };

  return (
    <div>
      <PageHeader title="Statistik" subtitle="Siswa Aktif, Guru, Tahun, Prestasi — tampil di landing page" />

      <Card className="mb-6">
        <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Statistik Aktif</h3>
        <div className="space-y-3">
          {stats.map(stat => (
            <StatRow key={stat.id} stat={stat} onChange={update} onDelete={del} onSave={save} />
          ))}
          {!stats.length && <p className="text-gray-400 text-sm">Belum ada statistik.</p>}
        </div>
      </Card>

      <Card>
        <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Tambah Statistik</h3>
        <form onSubmit={add}>
          <div className="grid sm:grid-cols-4 gap-3 mb-3">
            <FormField label="Label" required>
              <Input value={newStat.label} onChange={e => setNewStat(p => ({ ...p, label: e.target.value }))} required placeholder="Siswa Aktif" />
            </FormField>
            <FormField label="Nilai" required>
              <Input value={newStat.value} onChange={e => setNewStat(p => ({ ...p, value: e.target.value }))} required placeholder="500" />
            </FormField>
            <FormField label="Suffix">
              <Input value={newStat.suffix} onChange={e => setNewStat(p => ({ ...p, suffix: e.target.value }))} placeholder="+" />
            </FormField>
            <FormField label="Icon">
              <Select value={newStat.icon} onChange={e => setNewStat(p => ({ ...p, icon: e.target.value }))}>
                {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </Select>
            </FormField>
          </div>
          <button type="submit" disabled={adding} className="bg-secondary text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 text-sm disabled:opacity-60">
            {adding ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus className="w-4 h-4" />}
            Tambah
          </button>
        </form>
      </Card>
    </div>
  );
}
