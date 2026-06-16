import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { FormField, Input, Textarea, Select, Card, PageHeader, ImageUpload } from '../components/FormField';
import { Plus, Trash2, Edit, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ICONS = ['book-open', 'lightbulb', 'heart', 'globe', 'cpu', 'star', 'award', 'activity', 'compass', 'music', 'zap', 'shield'];

function ProgramForm({ initial = {}, onSave, onCancel, isNew }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    icon: initial.icon || 'book-open',
    is_active: initial.is_active !== false,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial.image_url || null);
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (file) fd.append('image', file);
      if (!isNew) fd.append('_method', 'PUT');
      const url = isNew ? '/api/admin/programs' : `/api/admin/programs/${initial.id}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
        body: fd,
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      const data = await res.json();
      onSave(data.data);
      toast.success(isNew ? 'Program ditambahkan!' : 'Program diperbarui!');
    } catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  return (
    <form onSubmit={submit} className="bg-blue-50 rounded-2xl p-4 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <FormField label="Judul" required>
          <Input value={form.title} onChange={set('title')} required />
        </FormField>
        <FormField label="Icon">
          <Select value={form.icon} onChange={set('icon')}>
            {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
          </Select>
        </FormField>
      </div>
      <FormField label="Deskripsi" required>
        <Textarea value={form.description} onChange={set('description')} rows={3} required />
      </FormField>
      <div className="grid sm:grid-cols-2 gap-3 items-end">
        <FormField label="Gambar">
          <ImageUpload
            label="Upload Gambar"
            preview={preview}
            onChange={(e) => { const f = e.target.files[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); } }}
            hint="Otomatis dikompres"
          />
        </FormField>
        <FormField label="Status">
          <Select value={String(form.is_active)} onChange={e => setForm(p => ({ ...p, is_active: e.target.value === 'true' }))}>
            <option value="true">Aktif</option>
            <option value="false">Nonaktif</option>
          </Select>
        </FormField>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="bg-primary text-white font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 disabled:opacity-60 flex items-center gap-1.5">
          {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm hover:bg-gray-300 flex items-center gap-1.5"><X className="w-3.5 h-3.5" />Batal</button>}
      </div>
    </form>
  );
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    api.get('/programs').then(setPrograms).catch(() => {});
  }, []);

  const handleSaveNew = (data) => {
    setPrograms(prev => [...prev, data]);
    setAdding(false);
  };

  const handleSaveEdit = (data) => {
    setPrograms(prev => prev.map(p => p.id === data.id ? data : p));
    setEditing(null);
  };

  const del = async (id) => {
    if (!confirm('Hapus program ini?')) return;
    try {
      await api.delete(`/programs/${id}`);
      setPrograms(prev => prev.filter(p => p.id !== id));
      toast.success('Dihapus!');
    } catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader title="Program Unggulan" subtitle="Kelola program-program sekolah" />

      <div className="space-y-3 mb-4">
        {programs.map(p => (
          <div key={p.id}>
            {editing === p.id ? (
              <ProgramForm initial={p} onSave={handleSaveEdit} onCancel={() => setEditing(null)} isNew={false} />
            ) : (
              <Card className="flex items-center gap-4">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">📚</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-gray-800 flex items-center gap-2">
                    {p.title}
                    {!p.is_active && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Nonaktif</span>}
                  </div>
                  <p className="text-gray-500 text-sm truncate">{p.description}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setEditing(p.id)} className="bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-xl px-3 py-2 transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => del(p.id)} className="bg-red-100 text-red-500 hover:bg-red-200 rounded-xl px-3 py-2 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>

      {adding ? (
        <ProgramForm onSave={handleSaveNew} onCancel={() => setAdding(false)} isNew />
      ) : (
        <button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-secondary text-white font-bold px-5 py-3 rounded-xl hover:opacity-90 transition-all text-sm">
          <Plus className="w-4 h-4" /> Tambah Program
        </button>
      )}
    </div>
  );
}
