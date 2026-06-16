import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <img
          src={images[idx].image_url}
          alt={images[idx].title || `Galeri ${idx + 1}`}
          className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
        {images[idx].title && (
          <div className="text-center text-white mt-4 font-semibold">{images[idx].title}</div>
        )}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={prev} className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors text-sm">← Prev</button>
            <span className="text-white/60 text-sm">{idx + 1} / {images.length}</span>
            <button onClick={next} className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors text-sm">Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Gallery({ gallery }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
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
          {visible.map((item, i) => (
            <div
              key={item.id || i}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
              onClick={() => setLightboxIdx(i)}
            >
              <img
                src={item.image_url}
                alt={item.title || `Galeri ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-lg">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {lightboxIdx !== null && (
          <Lightbox images={visible} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </div>
    </section>
  );
}
