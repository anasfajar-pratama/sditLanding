import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { FormField, Input, Textarea, Select, Card, PageHeader, ImageUpload } from '../components/FormField';
import { Plus, Trash2, Edit, Check, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';

function TestimonialForm({ initial = {}, onSave, onCancel, isNew }) {
  const [form, setForm] = useState({
    name: initial.name || '', relation: initial.relation || '',
    content: initial.content || '', rating: initial.rating || 5,
    is_active: initial.is_active !== false,
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
      if (!isNew) fd.append('_method', 'PUT');
      const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${initial.id}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '', 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin', body: fd,
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      const data = await res.json();
      onSave(data.data);
      toast.success(isNew ? 'Testimoni ditambahkan!' : 'Diperbarui!');
    } catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  return (
    <form onSubmit={submit} className="bg-yellow-50 rounded-2xl p-4 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <FormField label="Nama" required>
          <Input value={form.name} onChange={set('name')} required placeholder="Bapak/Ibu Ahmad" />
        </FormField>
        <FormField label="Keterangan (hubungan)">
          <Input value={form.relation} onChange={set('relation')} placeholder="Orang Tua Siswa Kelas 4" />
        </FormField>
      </div>
      <FormField label="Isi Testimoni" required>
        <Textarea value={form.content} onChange={set('content')} rows={3} required />
      </FormField>
      <div className="grid sm:grid-cols-3 gap-3 items-end">
        <FormField label="Rating (1-5)">
          <Select value={String(form.rating)} onChange={e => setForm(p => ({ ...p, rating: Number(e.target.value) }))}>
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Bintang</option>)}
          </Select>
        </FormField>
        <FormField label="Status">
          <Select value={String(form.is_active)} onChange={e => setForm(p => ({ ...p, is_active: e.target.value === 'true' }))}>
            <option value="true">Tampil</option>
            <option value="false">Sembunyikan</option>
          </Select>
        </FormField>
        <FormField label="Foto">
          <ImageUpload label="Upload Foto" preview={preview}
            onChange={(e) => { const f = e.target.files[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); } }} />
        </FormField>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="bg-primary text-white font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 disabled:opacity-60 flex items-center gap-1.5">
          {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          Simpan
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm hover:bg-gray-300 flex items-center gap-1.5"><X className="w-3.5 h-3.5" />Batal</button>}
      </div>
    </form>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => { api.get('/testimonials').then(setTestimonials).catch(() => {}); }, []);

  const del = async (id) => {
    if (!confirm('Hapus testimoni ini?')) return;
    try { await api.delete(`/testimonials/${id}`); setTestimonials(prev => prev.filter(t => t.id !== id)); toast.success('Dihapus!'); }
    catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <PageHeader title="Testimoni" subtitle="Kelola ulasan orang tua dan alumni" />
      <div className="space-y-3 mb-4">
        {testimonials.map(t => (
          <div key={t.id}>
            {editing === t.id ? (
              <TestimonialForm initial={t}
                onSave={(d) => { setTestimonials(prev => prev.map(x => x.id === d.id ? d : x)); setEditing(null); }}
                onCancel={() => setEditing(null)} isNew={false} />
            ) : (
              <Card className="flex items-start gap-3">
                {t.photo_url ? (
                  <img src={t.photo_url} alt={t.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 font-bold text-yellow-600">{t.name.charAt(0)}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-gray-800">{t.name}</span>
                    {t.relation && <span className="text-gray-400 text-xs">— {t.relation}</span>}
                    {!t.is_active && <span className="text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">Tersembunyi</span>}
                  </div>
                  <div className="flex gap-0.5 my-1">
                    {Array.from({ length: t.rating || 5 }, (_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">"{t.content}"</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setEditing(t.id)} className="bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-xl px-3 py-2"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(t.id)} className="bg-red-100 text-red-500 hover:bg-red-200 rounded-xl px-3 py-2"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
      {adding ? (
        <TestimonialForm onSave={(d) => { setTestimonials(prev => [...prev, d]); setAdding(false); }} onCancel={() => setAdding(false)} isNew />
      ) : (
        <button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-secondary text-white font-bold px-5 py-3 rounded-xl hover:opacity-90 transition-all text-sm">
          <Plus className="w-4 h-4" /> Tambah Testimoni
        </button>
      )}
    </div>
  );
}
