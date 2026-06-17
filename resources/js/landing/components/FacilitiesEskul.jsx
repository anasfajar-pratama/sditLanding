import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Book, Monitor, Layers, Star, Coffee,
  Compass, PenTool, Activity, Music, Cpu, BookOpen,
  Map, Moon, Trophy, Award, ArrowRight
} from 'lucide-react';

const iconMap = {
  home: Home, book: Book, monitor: Monitor, layers: Layers, star: Star, coffee: Coffee,
  compass: Compass, 'pen-tool': PenTool, activity: Activity, music: Music, cpu: Cpu,
  'book-open': BookOpen, map: Map, moon: Moon, trophy: Trophy, award: Award,
};

function ItemCard({ item, gradient, linkTo }) {
  const Icon = iconMap[item.icon] || Star;
  return (
    <Link to={linkTo} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 card-lift overflow-hidden border border-gray-100">
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
    </Link>
  );
}

function Section({ title, subtitle, items, gradient, id, linkPrefix }) {
  if (!items.length) return null;
  const visible = items.slice(0, 4);

  return (
    <div id={id} className="mb-16">
      <div className="text-center mb-10">
        <h3 className="font-display text-3xl font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visible.map((item) => (
          <ItemCard key={item.id} item={item} gradient={gradient} linkTo={`/${linkPrefix}/${item.id}`} />
        ))}
      </div>
      {items.length > 4 && (
        <div className="text-center mt-8">
          <Link
            to={`/${linkPrefix}`}
            className="inline-flex items-center gap-2 bg-white text-gray-700 font-bold px-5 py-2.5 rounded-full border-2 border-gray-200 hover:border-primary hover:text-primary transition-all text-sm"
          >
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
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
          linkPrefix="fasilitas"
        />
        <Section
          title="Ekstrakurikuler"
          subtitle="Pilihan ekstrakurikuler untuk mengembangkan bakat dan minat siswa"
          items={eskul}
          gradient="from-orange-400 to-pink-500"
          linkPrefix="eskul"
        />
        <Section
          title="Kegiatan Unggulan"
          subtitle="Kegiatan-kegiatan istimewa yang memperkaya pengalaman siswa"
          items={kegiatan}
          gradient="from-teal-400 to-green-500"
          linkPrefix="kegiatan"
        />
      </div>
    </section>
  );
}
