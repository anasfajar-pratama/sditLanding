import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Gallery({ gallery }) {
  const visible = gallery.slice(0, 6);
  if (!visible.length) return null;

  return (
    <section id="galeri" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-pink-100 text-pink-600 font-bold px-4 py-1.5 rounded-full text-sm mb-3">Galeri</span>
          <h2 className="font-display text-4xl font-bold text-gray-800">Kegiatan Sekolah</h2>
          <p className="text-gray-500 mt-3">Momen berharga dari keseharian SDIT Bunga Cempaka</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {visible.map((item) => (
            <Link
              key={item.id}
              to={`/galeri/${item.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
            >
              <img
                src={item.image_url}
                alt={item.title || `Galeri`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-lg">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                </div>
              )}
            </Link>
          ))}
        </div>

        {gallery.length > 6 && (
          <div className="text-center mt-10">
            <Link
              to="/galeri"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-orange-600 transition-all text-sm"
            >
              Lihat Semua Galeri <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
