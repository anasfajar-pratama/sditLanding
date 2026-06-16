import React from 'react';

const FloatingFlower = ({ color, size = 80, style = {} }) => (
  <div className="animate-float" style={style}>
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="12" fill={color} />
      <ellipse cx="40" cy="20" rx="9" ry="14" fill={color} opacity="0.6" />
      <ellipse cx="40" cy="60" rx="9" ry="14" fill={color} opacity="0.6" />
      <ellipse cx="20" cy="40" rx="14" ry="9" fill={color} opacity="0.6" />
      <ellipse cx="60" cy="40" rx="14" ry="9" fill={color} opacity="0.6" />
    </svg>
  </div>
);

const PlusMark = ({ color, size = 40, style = {} }) => (
  <div style={style} className="animate-float">
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="16" y="2" width="8" height="36" rx="4" fill={color} />
      <rect x="2" y="16" width="36" height="8" rx="4" fill={color} />
    </svg>
  </div>
);

function HeroCentered({ hero, settings }) {
  return (
    <section className="relative pt-24 pb-40 overflow-hidden bg-rainbow" id="beranda">
      <PlusMark color="#0d9488" size={48} style={{ position: 'absolute', bottom: 90, left: 40, opacity: 0.35, animationDelay: '0s' }} />
      <PlusMark color="#f97316" size={56} style={{ position: 'absolute', top: 80, right: 56, opacity: 0.35, animationDelay: '1.5s' }} />
      <PlusMark color="#ec4899" size={36} style={{ position: 'absolute', top: '45%', left: '8%', opacity: 0.2, animationDelay: '3s' }} />
      <FloatingFlower color="#f97316" size={60} style={{ position: 'absolute', top: 120, left: '15%', opacity: 0.2, animationDelay: '2s' }} />
      <FloatingFlower color="#0d9488" size={50} style={{ position: 'absolute', bottom: 110, right: '12%', opacity: 0.2, animationDelay: '0.8s' }} />

      {/* {{-- Rainbow arch --}} */}
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 200 Q200 -50 390 200" stroke="#ef4444" stroke-width="12" fill="none"/>
              <path d="M25 200 Q200 -20 375 200" stroke="#f97316" stroke-width="12" fill="none"/>
              <path d="M40 200 Q200 10 360 200" stroke="#facc15" stroke-width="12" fill="none"/>
              <path d="M55 200 Q200 30 345 200" stroke="#22c55e" stroke-width="12" fill="none"/>
              <path d="M70 200 Q200 50 330 200" stroke="#3b82f6" stroke-width="12" fill="none"/>
              <path d="M85 200 Q200 65 315 200" stroke="#8b5cf6" stroke-width="12" fill="none"/>
          </svg>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2 mb-8 shadow-sm">
          <span className="text-yellow-500">⭐</span>
          {/* <span className="text-sm font-bold text-gray-700"> */}
          <span className="text-sm font-bold text-orange-500">
            {hero.badge || 'Akreditasi A — Tahun Ajaran 2025/2026'}
          </span>
        </div>

        <h1 className="font-display font-bold leading-tight mb-6">
          <span className="block text-4xl sm:text-5xl lg:text-6xl text-gray-800 mb-1">
            {hero.title_line1 || 'Taman Bermain & Belajar'}
          </span>
          <span className="block text-4xl sm:text-5xl lg:text-6xl text-primary">
            {hero.title_line2 || 'Generasi Berakhlak Mulia'}
          </span>
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          {hero.description || 'Mendidik Generasi Cerdas, Berakhlak, dan Berprestasi. Lingkungan sekolah yang asri, nyaman, dan Islami untuk buah hati Anda.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={hero.cta_link || '#kontak'}
            className="bg-primary hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
          >
            {hero.cta_text || 'Informasi Pendaftaran'} →
          </a>
          {hero.secondary_cta_text && (
            <a
              href={hero.secondary_cta_link || '#program'}
              className="bg-white/80 hover:bg-white text-gray-700 font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-lg border border-gray-200"
            >
              {hero.secondary_cta_text}
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

function HeroSplit({ hero, settings }) {
  const imageUrl = hero.image_url;
  return (
    <section className="relative pt-20 pb-36 overflow-hidden bg-rainbow" id="beranda">
      <PlusMark color="#0d9488" size={44} style={{ position: 'absolute', bottom: 70, left: 36, opacity: 0.35, animationDelay: '0s' }} />
      <PlusMark color="#f97316" size={52} style={{ position: 'absolute', top: 90, right: 52, opacity: 0.35, animationDelay: '1.5s' }} />
      <FloatingFlower color="#ec4899" size={50} style={{ position: 'absolute', top: '50%', left: '48%', opacity: 0.15, animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="text-primary">🌸</span>
              <span className="text-sm font-bold text-gray-700">Sekolah Dasar Islam Terpadu</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-800 leading-tight mb-4">
              {hero.title || 'Mendidik Generasi Cerdas & Berakhlak Mulia'}
            </h1>
            {hero.subtitle && (
              <p className="text-lg text-secondary font-bold mb-4">{hero.subtitle}</p>
            )}
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
              {hero.description || 'SDIT Bunga Cempaka hadir dengan program pendidikan Islam terpadu yang komprehensif, membentuk karakter siswa yang cerdas, berakhlak mulia, dan siap menghadapi tantangan zaman.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={hero.cta_link || '#kontak'}
                className="bg-primary hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
              >
                {hero.cta_text || 'Daftar Sekarang'}
              </a>
              {hero.secondary_cta_text && (
                <a
                  href={hero.secondary_cta_link || '#tentang'}
                  className="bg-white/80 hover:bg-white text-gray-700 font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-lg border border-gray-200"
                >
                  {hero.secondary_cta_text}
                </a>
              )}
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3 scale-105" />
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="SDIT Bunga Cempaka"
                  className="relative w-full rounded-3xl shadow-2xl object-cover aspect-[4/3]"
                />
              ) : (
                <div className="relative w-full rounded-3xl shadow-2xl bg-gradient-to-br from-amber-100 to-teal-100 aspect-[4/3] flex items-center justify-center">
                  <span className="text-8xl">🏫</span>
                </div>
              )}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-xl">🌟</div>
                <div>
                  <div className="font-display font-bold text-gray-800 text-sm">Terakreditasi A</div>
                  <div className="text-xs text-gray-500">Kualitas Terjamin</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">📚</div>
                <div>
                  <div className="font-display font-bold text-gray-800 text-sm">Tahfidz Quran</div>
                  <div className="text-xs text-gray-500">Program Unggulan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

export default function Hero({ hero, settings }) {
  const style = hero.hero_style || settings.hero_style || 'centered';
  if (style === 'split') return <HeroSplit hero={hero} settings={settings} />;
  return <HeroCentered hero={hero} settings={settings} />;
}
