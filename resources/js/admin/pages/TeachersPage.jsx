import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { FormField, Input, Textarea, Select, Card, PageHeader, ImageUpload } from '../components/FormField';
import { Plus, Trash2, Edit, Check, X, User, Star } from 'lucide-react';
import toast from 'react-hot-toast';

function TeacherForm({ initial = {}, onSave, onCancel, isNew }) {
  const [form, setForm] = useState({
    name: initial.name || '', position: initial.position || '',
    education: initial.education || '', bio: initial.bio || '',
    is_active: initial.is_active !== false,
    is_featured: initial.is_featured === true,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial.photo_url || null);
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (file) fd.append('photo', file);
      const url = isNew ? '/api/admin/teachers' : `/api/admin/teachers/${initial.id}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '', 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin', body: fd,
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      const data = await res.json();
      onSave(data.data);
      toast.success(isNew ? 'Guru ditambahkan!' : 'Guru diperbarui!');
    } catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  return (
    <form onSubmit={submit} className="bg-blue-50 rounded-2xl p-4 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <FormField label="Nama Guru" required>
          <Input value={form.name} onChange={set('name')} required />
        </FormField>
        <FormField label="Jabatan / Mata Pelajaran" required>
          <Input value={form.position} onChange={set('position')} required placeholder="Guru Matematika" />
        </FormField>
        <FormField label="Pendidikan Terakhir">
          <Input value={form.education} onChange={set('education')} placeholder="S1 Pendidikan Matematika" />
        </FormField>
        <FormField label="Status">
          <Select value={String(form.is_active)} onChange={e => setForm(p => ({ ...p, is_active: e.target.value === 'true' }))}>
            <option value="true">Aktif</option>
            <option value="false">Nonaktif</option>
          </Select>
        </FormField>
      </div>
      <FormField label="Bio Singkat">
        <Textarea value={form.bio} onChange={set('bio')} rows={2} placeholder="Berpengalaman mengajar selama..." />
      </FormField>
      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
        <input
          type="checkbox"
          id={`featured-${initial.id || 'new'}`}
          checked={form.is_featured}
          onChange={e => setForm(p => ({ ...p, is_featured: e.target.checked }))}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor={`featured-${initial.id || 'new'}`} className="text-sm font-semibold text-yellow-800 cursor-pointer">
          ⭐ Tandai sebagai foto utama (ditampilkan besar di bagian atas section Pendidik)
        </label>
      </div>
      <FormField label="Foto Guru">
        <ImageUpload label="Upload Foto" preview={preview}
          onChange={(e) => { const f = e.target.files[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); } }}
          hint="Foto wajah, otomatis dikompres" />
      </FormField>
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

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => { api.get('/teachers').then(setTeachers).catch(() => {}); }, []);

  const del = async (id) => {
    if (!confirm('Hapus guru ini?')) return;
    try { await api.delete(`/teachers/${id}`); setTeachers(prev => prev.filter(t => t.id !== id)); toast.success('Dihapus!'); }
    catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader title="Data Pendidik" subtitle="Kelola informasi guru dan pengajar yang tampil di section Pendidik Berdedikasi" />
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5 text-sm text-blue-700">
        💡 <strong>Tips:</strong> Tandai satu guru sebagai "foto utama" — fotonya akan ditampilkan besar di bagian atas section Pendidik. Maksimal 6 guru tampil di grid.
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {teachers.map(t => (
          <div key={t.id}>
            {editing === t.id ? (
              <TeacherForm initial={t} onSave={(d) => { setTeachers(prev => prev.map(x => x.id === d.id ? d : x)); setEditing(null); }} onCancel={() => setEditing(null)} isNew={false} />
            ) : (
              <Card className="text-center relative">
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {t.is_featured && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">⭐ Utama</span>}
                  {!t.is_active && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Nonaktif</span>}
                </div>
                {t.photo_url ? (
                  <img src={t.photo_url} alt={t.name} className="w-20 h-20 rounded-full object-cover mx-auto mt-6 mb-3 border-4 border-primary/20" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mt-6 mb-3 flex items-center justify-center"><User className="w-8 h-8 text-gray-400" /></div>
                )}
                <div className="font-display font-bold text-gray-800">{t.name}</div>
                <div className="text-primary text-sm font-semibold">{t.position}</div>
                {t.bio && <div className="text-gray-400 text-xs mt-0.5 line-clamp-2">{t.bio}</div>}
                <div className="flex gap-2 justify-center mt-3">
                  <button onClick={() => setEditing(t.id)} className="bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-xl px-3 py-1.5 text-sm transition-all flex items-center gap-1"><Edit className="w-3.5 h-3.5" />Edit</button>
                  <button onClick={() => del(t.id)} className="bg-red-100 text-red-500 hover:bg-red-200 rounded-xl px-3 py-1.5 text-sm transition-all flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" />Hapus</button>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
      {adding ? (
        <TeacherForm onSave={(d) => { setTeachers(prev => [...prev, d]); setAdding(false); }} onCancel={() => setAdding(false)} isNew />
      ) : (
        <button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-secondary text-white font-bold px-5 py-3 rounded-xl hover:opacity-90 transition-all text-sm">
          <Plus className="w-4 h-4" /> Tambah Guru
        </button>
      )}
    </div>
  );
}
