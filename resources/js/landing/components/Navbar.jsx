import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '#tentang', label: 'Tentang' },
    { href: '#program', label: 'Program' },
    { href: '#pendidik', label: 'Pendidik' },
    { href: '#fasilitas', label: 'Fasilitas' },
    { href: '#testimoni', label: 'Testimoni' },
    { href: '#kontak', label: 'Kontak' },
  ];

  const logoUrl = settings.logo ? `/${settings.logo}` : null;
  const name = settings.school_name || 'SDIT Bunga Cempaka';
  const tagline = settings.tagline || 'Cerdas & Berakhlak';

  return (
    <header className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" style={{ height: 72 }}>
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="w-11 h-11 rounded-full object-cover" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-lg shadow-md">
              BC
            </div>
          )}
          <div>
            <div className="font-display font-bold text-lg text-primary leading-tight">{name}</div>
            <div className="text-xs text-gray-400 font-semibold">{tagline}</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7 font-bold text-sm text-gray-600">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={settings.ppdb_link || '#kontak'}
            className="hidden sm:block bg-primary hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all text-sm"
          >
            {settings.ppdb_text || 'Daftar Sekarang'}
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-4 gap-3 font-semibold text-gray-700">
            {links.map(l => (
              <a key={l.href} href={l.href} className="hover:text-primary py-1" onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a
              href={settings.ppdb_link || '#kontak'}
              className="bg-primary text-white text-center py-2.5 rounded-full font-bold"
              onClick={() => setOpen(false)}
            >
              {settings.ppdb_text || 'Daftar Sekarang'}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
