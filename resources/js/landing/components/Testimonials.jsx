import React from 'react';
import { Star, Quote } from 'lucide-react';

function TestimonialCard({ t }) {
  const initials = (t.name || 'A').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['bg-primary', 'bg-secondary', 'bg-pink-500', 'bg-blue-500', 'bg-purple-500'];
  const colorIdx = (t.name || '').charCodeAt(0) % colors.length;

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-7 flex flex-col border border-gray-100 relative">
      <Quote className="w-8 h-8 text-gray-200 mb-3" />
      <div className="flex gap-1 mb-4">
        {[...Array(t.rating || 5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 leading-relaxed flex-1 text-sm md:text-base italic mb-6">
        "{t.content || t.message}"
      </p>
      <div className="flex items-center gap-3">
        {t.photo_url ? (
          <img src={t.photo_url} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
        ) : (
          <div className={`w-11 h-11 ${colors[colorIdx]} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
            {initials}
          </div>
        )}
        <div>
          <div className="font-display font-bold text-gray-800 text-sm">{t.name}</div>
          <div className="text-xs text-gray-400">{t.position || t.relation}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ testimonials }) {
  const visible = testimonials.slice(0, 3);
  if (!visible.length) return null;

  return (
    <section id="testimoni" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold text-gray-800">
            Apa Kata Wali Murid? 🪸
          </h2>
          <p className="text-gray-500 mt-3">Kepercayaan orang tua adalah motivasi terbesar kami</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <TestimonialCard key={t.id || i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
