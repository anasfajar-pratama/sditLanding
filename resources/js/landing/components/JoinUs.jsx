import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function JoinUs({ settings }) {
  const ppdbLink = settings.ppdb_link || '#kontak';
  const ppdbText = settings.ppdb_text || 'Daftar Sekarang';
  const whatsapp = settings.whatsapp_number || '';
  const waLink = whatsapp ? `https://wa.me/${whatsapp}` : '#kontak';

  return (
    <section id="daftar" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white rounded-3xl shadow-xl p-10 md:p-14 text-center overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-secondary/10 rounded-full" />
          <div className="absolute top-6 left-6 w-16 h-16 bg-pink-100 rounded-full opacity-60" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 font-bold px-5 py-2 rounded-full text-sm mb-6">
              🎉 Penerimaan Peserta Didik Baru (PPDB) 2025/2026
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Mari Bergabung Bersama Kami!
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
              Daftarkan putra-putri Anda segera. Kuota terbatas untuk Kelas 1 dan siswa pindahan. Jangan lewatkan kesempatan terbaik ini!
            </p>

            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-8">
              <span>📅</span>
              <span>Pendaftaran dibuka: Januari — Juni 2025</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={ppdbLink}
                className="bg-primary hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
              >
                {ppdbText}
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-lg border-2 border-gray-200"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
