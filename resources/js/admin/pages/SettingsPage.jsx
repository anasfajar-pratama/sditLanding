import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { FormField, Input, Textarea, SaveButton, ImageUpload, Card, PageHeader } from '../components/FormField';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [form, setForm] = useState({
    school_name: '', tagline: '', whatsapp_number: '', address: '',
    email: '', phone: '', facebook: '', instagram: '', youtube: '',
    footer_description: '', copyright_text: '', ppdb_link: '', ppdb_text: '',
    map_iframe: '',
  });
  const [files, setFiles] = useState({ logo: null, logo_yayasan: null });
  const [previews, setPreviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    api.get('/settings').then(data => {
      setForm(prev => ({ ...prev, ...data }));
      const p = {};
      if (data.logo) p.logo = `/${data.logo}`;
      if (data.logo_yayasan) p.logo_yayasan = `/${data.logo_yayasan}`;
      setPreviews(p);
    }).finally(() => setFetching(false));
  }, []);

  const handleFile = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFiles(prev => ({ ...prev, [field]: file }));
    setPreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v || ''));
      if (files.logo) fd.append('logo', files.logo);
      if (files.logo_yayasan) fd.append('logo_yayasan', files.logo_yayasan);
      // Use POST with _method=PUT for FormData
      fd.append('_method', 'PUT');
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
        body: fd,
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      toast.success('Pengaturan berhasil disimpan!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  if (fetching) return <div className="animate-pulse">Memuat...</div>;

  return (
    <div>
      <PageHeader title="Pengaturan" subtitle="Konfigurasi umum website sekolah" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Identitas Sekolah</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Nama Sekolah" required>
              <Input value={form.school_name} onChange={set('school_name')} required />
            </FormField>
            <FormField label="Tagline">
              <Input value={form.tagline} onChange={set('tagline')} placeholder="Cerdas & Berakhlak" />
            </FormField>
            <FormField label="Nomor WhatsApp" hint="Format: 6281234567890 (tanpa +)">
              <Input value={form.whatsapp_number} onChange={set('whatsapp_number')} placeholder="6281234567890" />
            </FormField>
            <FormField label="Telepon">
              <Input value={form.phone} onChange={set('phone')} />
            </FormField>
            <FormField label="Email" className="md:col-span-2">
              <Input type="email" value={form.email} onChange={set('email')} />
            </FormField>
            <FormField label="Alamat" className="md:col-span-2">
              <Textarea value={form.address} onChange={set('address')} rows={2} />
            </FormField>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Logo</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Logo Sekolah">
              <ImageUpload
                label="Upload Logo"
                preview={previews.logo}
                onChange={(e) => handleFile('logo', e)}
                hint="Gambar akan dikompres otomatis. Rekomendasi: PNG transparan"
              />
            </FormField>
            <FormField label="Logo Yayasan">
              <ImageUpload
                label="Upload Logo Yayasan"
                preview={previews.logo_yayasan}
                onChange={(e) => handleFile('logo_yayasan', e)}
              />
            </FormField>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Tombol PPDB</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Teks Tombol">
              <Input value={form.ppdb_text} onChange={set('ppdb_text')} placeholder="Daftar Sekarang" />
            </FormField>
            <FormField label="Link Tombol">
              <Input value={form.ppdb_link} onChange={set('ppdb_link')} placeholder="#kontak atau URL PPDB" />
            </FormField>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Media Sosial</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <FormField label="Facebook">
              <Input value={form.facebook} onChange={set('facebook')} placeholder="https://facebook.com/..." />
            </FormField>
            <FormField label="Instagram">
              <Input value={form.instagram} onChange={set('instagram')} placeholder="https://instagram.com/..." />
            </FormField>
            <FormField label="YouTube">
              <Input value={form.youtube} onChange={set('youtube')} placeholder="https://youtube.com/..." />
            </FormField>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Footer</h3>
          <div className="space-y-4">
            <FormField label="Deskripsi Footer">
              <Textarea value={form.footer_description} onChange={set('footer_description')} rows={3} />
            </FormField>
            <FormField label="Teks Copyright">
              <Input value={form.copyright_text} onChange={set('copyright_text')} placeholder="© 2024 SDIT Bunga Cempaka" />
            </FormField>
          </div>
        </Card>

        <div className="flex justify-end">
          <SaveButton loading={loading} />
        </div>
      </form>
    </div>
  );
}
