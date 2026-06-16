import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Users, GraduationCap, BookOpen, MessageSquare, Building, Trophy, ExternalLink } from 'lucide-react';
import { Card, PageHeader } from '../components/FormField';

export default function DashboardHome({ onNavigate }) {
  const [stats, setStats] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.get('/stats').then(setStats).catch(() => {});
    api.get('/settings').then(setSettings).catch(() => {});
  }, []);

  const cards = [
    { label: 'Pengaturan', icon: '⚙️', page: 'settings', desc: 'Nama sekolah, WhatsApp, logo' },
    { label: 'Hero Section', icon: '🖼️', page: 'hero', desc: 'Judul, gambar, CTA utama' },
    { label: 'Statistik', icon: '📊', page: 'stats', desc: 'Siswa aktif, guru, prestasi' },
    { label: 'Tentang', icon: '📝', page: 'about', desc: 'Visi misi & galeri foto' },
    { label: 'Program', icon: '📚', page: 'programs', desc: 'Program unggulan sekolah' },
    { label: 'Guru', icon: '👩‍🏫', page: 'teachers', desc: 'Data guru & pengajar' },
    { label: 'Fasilitas & Eskul', icon: '🏫', page: 'facilities', desc: 'Fasilitas, eskul & kegiatan' },
    { label: 'Testimoni', icon: '💬', page: 'testimonials', desc: 'Ulasan orang tua & alumni' },
    { label: 'Kontak', icon: '📞', page: 'contact', desc: 'Telepon, email & peta' },
  ];

  return (
    <div>
      <PageHeader
        title={`Selamat Datang di Admin Panel`}
        subtitle={settings.school_name || 'SDIT Bunga Cempaka'}
      />

      {/* Quick stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.slice(0, 4).map((stat, i) => (
            <div key={stat.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="font-display font-bold text-3xl text-primary">{stat.value}{stat.suffix}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Menu grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ label, icon, page, desc }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all text-left group"
          >
            <div className="text-3xl mb-3">{icon}</div>
            <div className="font-display font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">{label}</div>
            <div className="text-gray-400 text-sm mt-1">{desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <a
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Lihat Website Publik
        </a>
      </div>
    </div>
  );
}
