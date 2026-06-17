import React, { useState, useEffect, useRef } from 'react';
import { api } from '../api';
import { FormField, Input, Textarea, Select, Card, PageHeader, ImageUpload } from '../components/FormField';
import {
  Plus, Trash2, Edit, Check, X,
  Home, Book, Monitor, Layers, Star, Coffee,
  Compass, PenTool, Activity, Music, Cpu, BookOpen,
  Map, Moon, Trophy, Award, Heart, Globe, Camera, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

const ICON_MAP = {
  home: Home, book: Book, monitor: Monitor, layers: Layers, star: Star, coffee: Coffee,
  compass: Compass, 'pen-tool': PenTool, activity: Activity, music: Music, cpu: Cpu,
  'book-open': BookOpen, map: Map, moon: Moon, trophy: Trophy, award: Award,
  heart: Heart, globe: Globe, camera: Camera, zap: Zap,
};

const ICONS = Object.keys(ICON_MAP);

const TYPES = [
  { value: 'facility', label: 'Fasilitas', color: 'bg-blue-500' },
  { value: 'eskul', label: 'Ekstrakurikuler', color: 'bg-orange-500' },
  { value: 'kegiatan', label: 'Kegiatan', color: 'bg-teal-500' },
];

function IconPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-8 gap-1.5 max-h-36 overflow-y-auto p-2 bg-white rounded-xl border-2 border-gray-200">
      {ICONS.map(key => {
        const Icon = ICON_MAP[key];
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              selected
                ? 'bg-primary text-white shadow-sm scale-110'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
            title={key}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}

function FacilityForm({ initial = {}, onSave, onCancel, isNew }) {
  const [form, setForm] = useState({
    name: initial.name || '', type: initial.type || 'facility',
    description: initial.description || '', icon: initial.icon || 'home',
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
      const url = isNew ? '/api/admin/facilities' : `/api/admin/facilities/${initial.id}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '', 'X-Requested-With': 'XMLHttpRequest' },
        credentials: 'same-origin', body: fd,
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      const data = await res.json();
      onSave(data.data);
      toast.success(isNew ? 'Ditambahkan!' : 'Diperbarui!');
    } catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  return (
    <form onSubmit={submit} className="bg-blue-50 rounded-2xl p-4 space-y-3">
      <div className="grid sm:grid-cols-3 gap-3">
        <FormField label="Nama" required>
          <Input value={form.name} onChange={set('name')} required />
        </FormField>
        <FormField label="Tipe">
          <Select value={form.type} onChange={set('type')}>
            {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </Select>
        </FormField>
        <FormField label="Icon">
          <IconPicker value={form.icon} onChange={(v) => setForm(p => ({ ...p, icon: v }))} />
        </FormField>
      </div>
      <FormField label="Deskripsi">
        <Textarea value={form.description} onChange={set('description')} rows={2} />
      </FormField>
      <div className="grid sm:grid-cols-2 gap-3 items-end">
        <FormField label="Gambar">
          <ImageUpload label="Upload Gambar" preview={preview}
            onChange={(e) => { const f = e.target.files[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); } }}
            hint="Otomatis dikompres" />
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

function FacilityGroup({ title, type, items, onEdit, onDelete, editingId }) {
  if (!items.length && !editingId) return null;
  const typeColor = TYPES.find(t => t.value === type)?.color || 'bg-gray-500';
  return (
    <div className="mb-6">
      <h3 className="font-display font-bold text-lg text-gray-700 mb-3 flex items-center gap-2">
        <span className={`w-2 h-6 rounded-full ${typeColor}`} />
        {title}
        <span className="text-sm font-normal text-gray-400 ml-1">({items.length})</span>
      </h3>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id}>
            {editingId === item.id ? null : (
              <Card className="flex items-center gap-3">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400">
                    {(() => { const Ic = ICON_MAP[item.icon]; return Ic ? <Ic className="w-5 h-5" /> : item.icon; })()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 text-sm flex items-center gap-2">
                    {item.name}
                    {!item.is_active && <span className="text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">Nonaktif</span>}
                  </div>
                  {item.description && <div className="text-gray-400 text-xs truncate">{item.description}</div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(item.id)} className="bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-xl px-3 py-1.5 transition-all"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => onDelete(item.id)} className="bg-red-100 text-red-500 hover:bg-red-200 rounded-xl px-3 py-1.5 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FacilitiesPage() {
  const [items, setItems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [addType, setAddType] = useState('facility');
  const topRef = useRef(null);

  useEffect(() => { api.get('/facilities').then(setItems).catch(() => {}); }, []);

  const del = async (id) => {
    if (!confirm('Hapus item ini?')) return;
    try { await api.delete(`/facilities/${id}`); setItems(prev => prev.filter(x => x.id !== id)); toast.success('Dihapus!'); }
    catch (e) { toast.error(e.message); }
  };

  const save = (data) => {
    if (editing) { setItems(prev => prev.map(x => x.id === data.id ? data : x)); setEditing(null); }
    else { setItems(prev => [...prev, data]); setAdding(false); }
  };

  const getByType = (type) => items.filter(x => x.type === type);

  const editItem = items.find(x => x.id === editing);

  const handleEdit = (id) => {
    setEditing(id);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <PageHeader title="Fasilitas, Eskul & Kegiatan" subtitle="Kelola fasilitas sekolah, ekstrakurikuler, dan kegiatan" />
      <div ref={topRef} />

      {/* Add / Edit form always at top */}
      {adding ? (
        <div className="mb-4">
          <FacilityForm onSave={save} onCancel={() => setAdding(false)} isNew initial={{ type: addType }} />
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <Select value={addType} onChange={e => setAddType(e.target.value)} className="w-auto">
            {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </Select>
          <button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-secondary text-white font-bold px-5 py-3 rounded-xl hover:opacity-90 transition-all text-sm">
            <Plus className="w-4 h-4" /> Tambah {TYPES.find(t => t.value === addType)?.label}
          </button>
        </div>
      )}

      {editing && editItem && (
        <div className="mb-4">
          <FacilityForm key={editing} initial={editItem} onSave={save} onCancel={() => setEditing(null)} isNew={false} />
        </div>
      )}

      {['facility', 'eskul', 'kegiatan'].map((type) => (
        <FacilityGroup
          key={type}
          title={TYPES.find(t => t.value === type)?.label}
          type={type}
          items={getByType(type)}
          onEdit={handleEdit}
          onDelete={del}
          editingId={editing}
        />
      ))}
    </div>
  );
}
