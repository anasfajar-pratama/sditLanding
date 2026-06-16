import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer({ settings, contact }) {
  const name = settings.school_name || 'SDIT Bunga Cempaka';
  const logoUrl = settings.logo ? `/${settings.logo}` : null;
  const whatsapp = settings.whatsapp_number || '';
  const waLink = whatsapp ? `https://wa.me/${whatsapp}` : '#';

  const quickLinks = [
    { href: '#tentang', label: 'Tentang Sekolah' },
    { href: '#program', label: 'Program Unggulan' },
    { href: '#pendidik', label: 'Dewan Guru' },
    { href: '#fasilitas', label: 'Fasilitas' },
    { href: '#testimoni', label: 'Testimoni' },
    { href: '#kontak', label: 'Info Pendaftaran' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {logoUrl ? (
                <img src={logoUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-sm shadow-md">
                  BC
                </div>
              )}
              <div className="font-display font-bold text-base text-white">{name}</div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-5 text-sm">
              {settings.footer_description || 'Mendidik Generasi Cerdas, Berakhlak, dan Berprestasi sejak tahun 2005.'}
            </p>
            <div className="flex gap-3">
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-base text-white mb-4">Kontak Kami</h4>
            <ul className="space-y-3">
              {contact.address && (
                <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </li>
              )}
              {contact.phone && (
                <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">{contact.phone}</a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">{contact.email}</a>
                </li>
              )}
              {whatsapp && (
                <li className="flex items-center gap-2.5 text-sm">
                  <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors font-semibold">
                    Chat WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-base text-white mb-4">Menu Cepat</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Maps */}
          <div>
            <h4 className="font-display font-bold text-base text-white mb-4">Lokasi</h4>
            <div className="rounded-xl overflow-hidden bg-gray-800 h-44">
              {contact.map_iframe ? (
                <div
                  className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                  dangerouslySetInnerHTML={{ __html: contact.map_iframe }}
                />
              ) : (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(contact.address || 'SDIT Bunga Cempaka')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-400 transition-colors"
                >
                  <MapPin className="w-8 h-8 mb-2" />
                  <span className="text-sm">Lihat di Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-gray-500 text-sm">
        {settings.copyright_text || `© ${new Date().getFullYear()} ${name}. Hak Cipta Dilindungi. 🌸`}
      </div>
    </footer>
  );
}
