import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { PageHeader, Card } from '../components/FormField';
import { Plus, Trash2, Eye, EyeOff, Upload, Image as ImageIcon, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

function GalleryCard({ item, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title || '');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(item.image_url);
  const [saving, setSaving] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      if (file) fd.append('image', file);
      const data = await api.postForm(`/gallery/${item.id}`, fd);
      onUpdate(data.data || data);
      setFile(null);
      setEditing(false);
      toast.success('Berhasil diperbarui');
    } catch (e) {
      toast.error('Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`relative group rounded-2xl overflow-hidden shadow-md bg-white border-2 transition-all ${item.is_active ? 'border-gray-100' : 'border-dashed border-gray-300 opacity-60'}`}>
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        {preview ? (
          <img src={preview} alt={item.title || 'Galeri'} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ImageIcon className="w-10 h-10" />
          </div>
        )}
      </div>

      {editing ? (
        <div className="p-3 space-y-2">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Judul gambar (opsional)"
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <label className="block w-full">
            <div className="flex items-center gap-2 text-sm text-primary font-semibold cursor-pointer bg-primary/5 hover:bg-primary/10 rounded-lg px-3 py-1.5 transition-colors">
              <Upload className="w-4 h-4" />
              Ganti Gambar
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving}
              className="flex-1 bg-primary text-white rounded-lg py-1.5 text-sm font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button onClick={() => { setEditing(false); setFile(null); setPreview(item.image_url); setTitle(item.title || ''); }}
              className="flex-1 bg-gray-100 text-gray-600 rounded-lg py-1.5 text-sm font-semibold hover:bg-gray-200 transition-colors">
              Batal
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3">
          <p className="text-sm font-semibold text-gray-700 truncate">{item.title || `Foto ${item.order}`}</p>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={() => setEditing(true)}
              className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-lg py-1.5 transition-colors">
              Edit
            </button>
            <button onClick={() => onToggle(item.id)}
              className={`p-1.5 rounded-lg transition-colors ${item.is_active ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              title={item.is_active ? 'Sembunyikan' : 'Tampilkan'}>
              {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button onClick={() => onDelete(item.id)}
              className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get('/gallery').then(setItems).finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append('image', file);
        fd.append('title', '');
        const data = await api.postForm('/gallery', fd);
        setItems(prev => [...prev, data.data || data]);
      }
      toast.success(`${files.length} gambar berhasil diunggah`);
    } catch (e) {
      toast.error('Gagal mengunggah gambar');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleToggle = async (id) => {
    try {
      const data = await api.postForm(`/gallery/${id}/toggle`, new FormData());
      setItems(prev => prev.map(it => it.id === id ? (data.data || data) : it));
    } catch {
      toast.error('Gagal mengubah status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus gambar ini?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      setItems(prev => prev.filter(it => it.id !== id));
      toast.success('Gambar dihapus');
    } catch {
      toast.error('Gagal menghapus');
    }
  };

  const handleUpdate = (updated) => {
    setItems(prev => prev.map(it => it.id === updated.id ? updated : it));
  };

  const activeCount = items.filter(i => i.is_active).length;

  return (
    <div>
      <PageHeader title="Galeri" subtitle="Kelola foto-foto yang tampil di section galeri" />

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">{items.length}</span> total foto •{' '}
            <span className="font-semibold text-green-600">{activeCount}</span> ditampilkan
            {activeCount > 6 && (
              <span className="text-gray-400 ml-2">• Tampil 6 di halaman utama, sisanya di halaman galeri</span>
            )}
          </div>
          <label className={`flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-xl cursor-pointer hover:bg-orange-600 transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
            <Upload className="w-4 h-4" />
            {uploading ? 'Mengunggah...' : 'Upload Foto'}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </Card>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Memuat...</div>
      ) : items.length === 0 ? (
        <Card>
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-semibold mb-2">Belum ada foto galeri</p>
            <p className="text-gray-400 text-sm">Upload foto di atas untuk mulai mengisi galeri</p>
          </div>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {items.map(item => (
            <GalleryCard
              key={item.id}
              item={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
