import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { FormField, Input, Textarea, SaveButton, Card, PageHeader } from '../components/FormField';
import { Trash2, Upload, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AboutPage() {
  const [form, setForm] = useState({ title: '', content: '', vision: '', mission: '' });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    api.get('/about').then(data => {
      if (data) {
        setForm({ title: data.title || '', content: data.content || '', vision: data.vision || '', mission: data.mission || '' });
        setImages(data.images || []);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/about', form);
      toast.success('Tentang berhasil disimpan!');
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (images.length >= 8) { toast.error('Maksimal 8 gambar'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      if (caption) fd.append('caption', caption);
      const res = await fetch('/api/admin/about/images', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
        body: fd,
      });
      if (!res.ok) throw new Error('Gagal upload');
      const data = await res.json();
      setImages(prev => [...prev, data.data]);
      setCaption('');
      toast.success('Gambar berhasil diupload!');
    } catch (e) { toast.error(e.message); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const deleteImage = async (id) => {
    if (!confirm('Hapus gambar ini?')) return;
    try {
      await api.delete(`/about/images/${id}`);
      setImages(prev => prev.filter(img => img.id !== id));
      toast.success('Gambar dihapus!');
    } catch (e) { toast.error(e.message); }
  };

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div>
      <PageHeader title="Tentang Kami" subtitle="Kelola konten halaman tentang sekolah" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <div className="space-y-4">
            <FormField label="Judul" required>
              <Input value={form.title} onChange={set('title')} required placeholder="Tentang SDIT Bunga Cempaka" />
            </FormField>
            <FormField label="Konten / Deskripsi" required>
              <Textarea value={form.content} onChange={set('content')} rows={5} required />
            </FormField>
            <FormField label="Visi">
              <Textarea value={form.vision} onChange={set('vision')} rows={3} placeholder="Visi sekolah..." />
            </FormField>
            <FormField label="Misi" hint="Pisahkan setiap poin misi dengan titik koma (;)">
              <Textarea value={form.mission} onChange={set('mission')} rows={4} placeholder="Misi 1; Misi 2; Misi 3" />
            </FormField>
          </div>
          <div className="mt-4 flex justify-end">
            <SaveButton loading={loading} />
          </div>
        </Card>
      </form>

      <Card className="mt-6">
        <h3 className="font-display font-bold text-lg text-gray-800 mb-2">Galeri Foto (Slider)</h3>
        <p className="text-gray-500 text-sm mb-4">Maksimal 8 gambar. Akan ditampilkan sebagai slider di halaman tentang.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
              <img src={img.image_url} alt={img.caption || ''} className="w-full h-full object-cover" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1.5 truncate">{img.caption}</div>
              )}
              <button
                onClick={() => deleteImage(img.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {images.length < 8 && (
          <div className="flex items-center gap-3 flex-wrap">
            <Input
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Keterangan gambar (opsional)"
              className="max-w-xs"
            />
            <label className={`inline-flex items-center gap-2 cursor-pointer ${uploading ? 'opacity-60 pointer-events-none' : ''} bg-secondary text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all`}>
              {uploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
              Upload Gambar
              <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
            </label>
          </div>
        )}
      </Card>
    </div>
  );
}
