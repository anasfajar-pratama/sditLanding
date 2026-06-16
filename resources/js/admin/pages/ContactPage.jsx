import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { FormField, Input, Textarea, SaveButton, Card, PageHeader } from '../components/FormField';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({
    phone: '', phone_2: '', email: '', email_2: '',
    address: '', postal_code: '', operational_hours: '', map_iframe: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/contact').then(data => {
      setForm(prev => ({ ...prev, ...data }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/contact', form);
      toast.success('Kontak berhasil disimpan!');
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div>
      <PageHeader title="Kontak" subtitle="Informasi kontak dan lokasi sekolah" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Telepon & Email</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Nomor Telepon Utama">
              <Input value={form.phone} onChange={set('phone')} placeholder="021-12345678" />
            </FormField>
            <FormField label="Nomor Telepon / WhatsApp Kedua">
              <Input value={form.phone_2} onChange={set('phone_2')} placeholder="0812-3456-7890" />
            </FormField>
            <FormField label="Email Utama">
              <Input type="email" value={form.email} onChange={set('email')} placeholder="info@sekolah.sch.id" />
            </FormField>
            <FormField label="Email PPDB / Kedua">
              <Input type="email" value={form.email_2} onChange={set('email_2')} placeholder="ppdb@sekolah.sch.id" />
            </FormField>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Alamat & Jam Operasional</h3>
          <div className="space-y-4">
            <FormField label="Alamat Lengkap">
              <Textarea value={form.address} onChange={set('address')} rows={2} placeholder="Jl. Bunga Cempaka No. 1, Bekasi" />
            </FormField>
            <FormField label="Kode Pos">
              <Input value={form.postal_code} onChange={set('postal_code')} placeholder="17121" className="max-w-xs" />
            </FormField>
            <FormField label="Jam Operasional" hint="Gunakan baris baru untuk setiap hari/waktu">
              <Textarea value={form.operational_hours} onChange={set('operational_hours')} rows={3}
                placeholder={'Senin - Jumat: 07.00 - 15.00 WIB\nSabtu: 07.00 - 12.00 WIB'} />
            </FormField>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">Google Maps</h3>
          <FormField label="Kode Embed Google Maps" hint="Salin kode iframe dari Google Maps > Share > Embed a map">
            <Textarea value={form.map_iframe} onChange={set('map_iframe')} rows={4}
              placeholder={'<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'} />
          </FormField>
          {form.map_iframe && (
            <div className="mt-4 rounded-xl overflow-hidden border border-gray-200">
              <div className="h-48 w-full" dangerouslySetInnerHTML={{ __html: form.map_iframe }} />
            </div>
          )}
        </Card>

        <div className="flex justify-end">
          <SaveButton loading={loading} />
        </div>
      </form>
    </div>
  );
}
