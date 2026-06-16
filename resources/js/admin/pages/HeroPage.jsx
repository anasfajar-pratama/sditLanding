import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { FormField, Input, Textarea, SaveButton, ImageUpload, Card, PageHeader } from '../components/FormField';
import toast from 'react-hot-toast';

export default function HeroPage() {
  const [form, setForm] = useState({
    hero_style: 'centered',
    title: '', title_line1: '', title_line2: '', badge: '',
    subtitle: '', description: '',
    cta_text: '', cta_link: '', secondary_cta_text: '', secondary_cta_link: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/hero').then(data => {
      if (data) {
        setForm({
          hero_style: data.hero_style || 'centered',
          title: data.title || '',
          title_line1: data.title_line1 || '',
          title_line2: data.title_line2 || '',
          badge: data.badge || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          cta_text: data.cta_text || '',
          cta_link: data.cta_link || '',
          secondary_cta_text: data.secondary_cta_text || '',
          secondary_cta_link: data.secondary_cta_link || '',
        });
        if (data.image_url) setPreview(data.image_url);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('image', file);
      await api.postForm('/hero', fd);
      toast.success('Hero berhasil disimpan!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));
  const isCentered = form.hero_style === 'centered';

  return (
    <div>
      <PageHeader title="Hero Section" subtitle="Bagian utama yang pertama dilihat pengunjung" />
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Style selector */}
        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Tampilan Hero</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setForm(p => ({ ...p, hero_style: 'centered' }))}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all ${isCentered ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-xl h-24 flex flex-col items-center justify-center gap-1 mb-3">
                <div className="h-2 w-24 bg-gray-700 rounded-full" />
                <div className="h-2 w-32 bg-primary rounded-full" />
                <div className="flex gap-1 mt-1">
                  <div className="h-1.5 w-12 bg-gray-400 rounded-full" />
                  <div className="h-1.5 w-12 bg-white border border-gray-300 rounded-full" />
                </div>
              </div>
              <div className="font-bold text-sm text-gray-800">Versi Lama — Teks Terpusat</div>
              <div className="text-xs text-gray-500">Judul besar di tengah dengan badge akreditasi</div>
              {isCentered && <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
            </button>

            <button
              type="button"
              onClick={() => setForm(p => ({ ...p, hero_style: 'split' }))}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all ${!isCentered ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-xl h-24 flex items-center gap-3 px-4 mb-3">
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-16 bg-gray-700 rounded-full" />
                  <div className="h-1.5 w-20 bg-gray-700 rounded-full" />
                  <div className="h-1.5 w-14 bg-gray-700 rounded-full" />
                  <div className="flex gap-1 mt-1">
                    <div className="h-1.5 w-10 bg-primary rounded-full" />
                    <div className="h-1.5 w-8 bg-white border border-gray-300 rounded-full" />
                  </div>
                </div>
                <div className="w-14 h-14 bg-white/80 rounded-xl shadow flex items-center justify-center text-xl">🏫</div>
              </div>
              <div className="font-bold text-sm text-gray-800">Versi Baru — Split dengan Gambar</div>
              <div className="text-xs text-gray-500">Teks kiri, gambar kartu di kanan</div>
              {!isCentered && <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
            </button>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">
            {isCentered ? 'Konten Versi Terpusat' : 'Konten Versi Split'}
          </h3>
          <div className="space-y-4">
            {isCentered ? (
              <>
                <FormField label="Badge/Label Atas" hint="Contoh: Akreditasi A — Tahun Ajaran 2025/2026">
                  <Input value={form.badge} onChange={set('badge')} placeholder="Akreditasi A — Tahun Ajaran 2025/2026" />
                </FormField>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField label="Baris Judul 1 (warna gelap)">
                    <Input value={form.title_line1} onChange={set('title_line1')} placeholder="Taman Bermain & Belajar" />
                  </FormField>
                  <FormField label="Baris Judul 2 (warna oranye)">
                    <Input value={form.title_line2} onChange={set('title_line2')} placeholder="Generasi Berakhlak Mulia" />
                  </FormField>
                </div>
              </>
            ) : (
              <>
                <FormField label="Judul Utama">
                  <Input value={form.title} onChange={set('title')} placeholder="Mendidik Generasi Cerdas & Berakhlak Mulia" />
                </FormField>
                <FormField label="Sub Judul (warna teal)">
                  <Input value={form.subtitle} onChange={set('subtitle')} placeholder="Sekolah Dasar Islam Terpadu Terbaik" />
                </FormField>
              </>
            )}
            <FormField label="Deskripsi">
              <Textarea value={form.description} onChange={set('description')} rows={3} />
            </FormField>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Tombol Aksi</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Teks Tombol Utama">
              <Input value={form.cta_text} onChange={set('cta_text')} placeholder="Daftar Sekarang" />
            </FormField>
            <FormField label="Link Tombol Utama">
              <Input value={form.cta_link} onChange={set('cta_link')} placeholder="#kontak" />
            </FormField>
            <FormField label="Teks Tombol Sekunder">
              <Input value={form.secondary_cta_text} onChange={set('secondary_cta_text')} placeholder="Lihat Program Kami" />
            </FormField>
            <FormField label="Link Tombol Sekunder">
              <Input value={form.secondary_cta_link} onChange={set('secondary_cta_link')} placeholder="#program" />
            </FormField>
          </div>
        </Card>

        {!isCentered && (
          <Card>
            <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Gambar Hero (Versi Split)</h3>
            <ImageUpload
              label="Upload Gambar Hero"
              preview={preview}
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
              }}
              hint="Gambar akan dikompres otomatis. Rekomendasi ukuran: 800x600px"
            />
          </Card>
        )}

        <div className="flex justify-end">
          <SaveButton loading={loading} />
        </div>
      </form>
    </div>
  );
}
