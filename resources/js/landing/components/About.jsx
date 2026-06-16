import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export default function About({ about }) {
  const [current, setCurrent] = useState(0);
  const images = about.images || [];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prev = () => setCurrent(c => (c - 1 + images.length) % images.length);
  const next = () => setCurrent(c => (c + 1) % images.length);

  const missions = (about.mission || '').split(';').filter(Boolean);

  return (
    <section id="tentang" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-sm mb-3">Tentang Kami</span>
          <h2 className="font-display text-4xl font-bold text-gray-800">{about.title || 'Tentang SDIT Bunga Cempaka'}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Slider */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3]">
            {images.length > 0 ? (
              <>
                {images.map((img, i) => (
                  <div
                    key={img.id}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === current ? 1 : 0 }}
                  >
                    <img src={img.image_url} alt={img.caption || ''} className="w-full h-full object-cover" />
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-semibold text-sm">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
                {images.length > 1 && (
                  <>
                    <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all">
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all">
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'w-2 bg-white/60'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-6xl">🏫</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 whitespace-pre-line">{about.content}</p>

            {about.vision && (
              <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm border-l-4 border-primary">
                <h3 className="font-display font-bold text-lg text-primary mb-2">Visi</h3>
                <p className="text-gray-600">{about.vision}</p>
              </div>
            )}

            {missions.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-secondary">
                <h3 className="font-display font-bold text-lg text-secondary mb-3">Misi</h3>
                <ul className="space-y-2">
                  {missions.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{m.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
