import React, { useState } from 'react';
import {
  Home, Book, Monitor, Layers, Star, Coffee,
  Compass, PenTool, Activity, Music, Cpu, BookOpen,
  Map, Moon, Trophy, Award, ChevronLeft, ChevronRight
} from 'lucide-react';

const iconMap = {
  home: Home, book: Book, monitor: Monitor, layers: Layers, star: Star, coffee: Coffee,
  compass: Compass, 'pen-tool': PenTool, activity: Activity, music: Music, cpu: Cpu,
  'book-open': BookOpen, map: Map, moon: Moon, trophy: Trophy, award: Award,
};

const CARDS_PER_PAGE = 8;

function ItemCard({ item, gradient }) {
  const Icon = iconMap[item.icon] || Star;
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 card-lift overflow-hidden border border-gray-100">
      {item.image_url ? (
        <div className="img-zoom h-44">
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-12 h-12 text-white" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-display font-bold text-gray-800 text-base">{item.name}</h3>
        </div>
        {item.description && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>}
      </div>
    </div>
  );
}

function Section({ title, subtitle, items, gradient, id }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / CARDS_PER_PAGE);
  const visible = items.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  if (!items.length) return null;

  return (
    <div id={id} className="mb-16">
      <div className="text-center mb-10">
        <h3 className="font-display text-3xl font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visible.map((item) => (
          <ItemCard key={item.id} item={item} gradient={gradient} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary transition-all disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className={`w-9 h-9 rounded-full font-bold text-sm transition-all ${i === page ? 'bg-primary text-white' : 'border-2 border-gray-200 text-gray-500 hover:border-primary'}`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary transition-all disabled:opacity-40">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function FacilitiesEskul({ facilities }) {
  const fasilitas = facilities.filter(f => f.type === 'facility');
  const eskul = facilities.filter(f => f.type === 'eskul');
  const kegiatan = facilities.filter(f => f.type === 'kegiatan');

  return (
    <section id="fasilitas" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <Section
          id="fasilitas-list"
          title="Fasilitas Sekolah"
          subtitle="Fasilitas modern yang mendukung proses belajar mengajar"
          items={fasilitas}
          gradient="from-blue-400 to-indigo-500"
        />
        <Section
          title="Ekstrakurikuler"
          subtitle="Pilihan ekstrakurikuler untuk mengembangkan bakat dan minat siswa"
          items={eskul}
          gradient="from-orange-400 to-pink-500"
        />
        <Section
          title="Kegiatan Unggulan"
          subtitle="Kegiatan-kegiatan istimewa yang memperkaya pengalaman siswa"
          items={kegiatan}
          gradient="from-teal-400 to-green-500"
        />
      </div>
    </section>
  );
}
