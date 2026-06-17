import React, { useEffect, useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Book, Monitor, Layers, Star, Coffee, Compass, PenTool, Activity, Music, Cpu, BookOpen, Map, Moon, Trophy, Award } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const iconMap = {
  home: Home, book: Book, monitor: Monitor, layers: Layers, star: Star, coffee: Coffee,
  compass: Compass, 'pen-tool': PenTool, activity: Activity, music: Music, cpu: Cpu,
  'book-open': BookOpen, map: Map, moon: Moon, trophy: Trophy, award: Award,
};

function ItemCard({ item, gradient, linkTo }) {
  const Icon = iconMap[item.icon] || Star;
  return (
    <Link to={linkTo} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 card-lift overflow-hidden border border-gray-100">
      {item.image_url || item.photo_url ? (
        <div className="img-zoom h-44">
          <img src={item.image_url || item.photo_url} alt={item.name || item.title} className="w-full h-full object-cover" />
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
          <h3 className="font-display font-bold text-gray-800 text-base">{item.name || item.title}</h3>
        </div>
        {(item.description || item.bio) && (
          <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{item.description || item.bio}</p>
        )}
      </div>
    </Link>
  );
}

function TeacherCard({ teacher, idx }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className={`w-14 h-14 ${['bg-orange-50', 'bg-teal-50', 'bg-pink-50', 'bg-purple-50', 'bg-yellow-50', 'bg-blue-50'][idx % 6]} rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden`}>
        {teacher.photo_url ? (
          <img src={teacher.photo_url} alt={teacher.name} className="w-full h-full rounded-2xl object-cover" />
        ) : (
          <svg width="32" height="32" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="11" fill={['#f97316', '#0d9488', '#ec4899', '#8b5cf6', '#f59e0b', '#3b82f6'][idx % 6]} />
            <ellipse cx="40" cy="20" rx="8" ry="13" fill={['#f97316', '#0d9488', '#ec4899', '#8b5cf6', '#f59e0b', '#3b82f6'][idx % 6]} opacity="0.55" />
            <ellipse cx="40" cy="60" rx="8" ry="13" fill={['#f97316', '#0d9488', '#ec4899', '#8b5cf6', '#f59e0b', '#3b82f6'][idx % 6]} opacity="0.55" />
            <ellipse cx="20" cy="40" rx="13" ry="8" fill={['#f97316', '#0d9488', '#ec4899', '#8b5cf6', '#f59e0b', '#3b82f6'][idx % 6]} opacity="0.55" />
            <ellipse cx="60" cy="40" rx="13" ry="8" fill={['#f97316', '#0d9488', '#ec4899', '#8b5cf6', '#f59e0b', '#3b82f6'][idx % 6]} opacity="0.55" />
          </svg>
        )}
      </div>
      <div className="min-w-0">
        <div className="font-display font-bold text-gray-800 text-sm leading-tight">{teacher.name}</div>
        <div className={`text-sm font-semibold ${['text-primary', 'text-secondary', 'text-pink-500', 'text-purple-500', 'text-yellow-600', 'text-blue-500'][idx % 6]} mb-1`}>
          {teacher.position || teacher.subject}
        </div>
        {teacher.bio && (
          <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{teacher.bio}</div>
        )}
      </div>
    </div>
  );
}

function GalleryCard({ item, linkTo }) {
  return (
    <Link to={linkTo} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]">
      <img src={item.image_url} alt={item.title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
      {item.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-semibold">{item.title}</p>
        </div>
      )}
    </Link>
  );
}

const gradients = {
  program: 'from-blue-400 to-indigo-500',
  facility: 'from-blue-400 to-indigo-500',
  eskul: 'from-orange-400 to-pink-500',
  kegiatan: 'from-teal-400 to-green-500',
};

const titles = {
  program: 'Program Kami',
  facility: 'Fasilitas Sekolah',
  eskul: 'Ekstrakurikuler',
  kegiatan: 'Kegiatan Unggulan',
  galeri: 'Galeri',
  pendidik: 'Pendidik Berdedikasi',
};

export default function CategoryDetail({ allData }) {
  const { category, id } = useParams();
  const location = useLocation();
  const topRef = useRef(null);
  const settings = allData?.settings || {};
  const contact = allData?.contact || {};

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.pathname]);

  let items = [];
  let type = category;

  if (category === 'program') {
    items = allData?.programs || [];
  } else if (category === 'fasilitas') {
    items = (allData?.facilities || []).filter(f => f.type === 'facility');
    type = 'facility';
  } else if (category === 'eskul') {
    items = (allData?.facilities || []).filter(f => f.type === 'eskul');
    type = 'eskul';
  } else if (category === 'kegiatan') {
    items = (allData?.facilities || []).filter(f => f.type === 'kegiatan');
    type = 'kegiatan';
  } else if (category === 'galeri') {
    items = allData?.gallery || [];
  } else if (category === 'pendidik') {
    items = allData?.teachers || [];
  }

  const selectedItem = id ? items.find(item => String(item.id) === id) : null;

  const gradient = gradients[type] || 'from-blue-400 to-indigo-500';
  const title = titles[category] || category;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar settings={settings} />
      <div ref={topRef} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-semibold text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        {selectedItem && (
          <div className="mb-12">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {selectedItem.image_url || selectedItem.photo_url ? (
                <div className="w-full max-h-[500px] overflow-hidden">
                  <img
                    src={selectedItem.image_url || selectedItem.photo_url}
                    alt={selectedItem.name || selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`h-64 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <span className="text-white/80 text-6xl font-display font-bold">{(selectedItem.name || selectedItem.title || '').charAt(0)}</span>
                </div>
              )}
              <div className="p-8">
                <h1 className="font-display text-3xl font-bold text-gray-800 mb-3">{selectedItem.name || selectedItem.title}</h1>
                {selectedItem.position && (
                  <p className="text-primary font-semibold text-lg mb-3">{selectedItem.position}</p>
                )}
                {(selectedItem.description || selectedItem.bio) && (
                  <p className="text-gray-600 leading-relaxed text-lg">{selectedItem.description || selectedItem.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-gray-800">
            {selectedItem ? `${title} Lainnya` : title}
          </h2>
          {!selectedItem && <p className="text-gray-500 mt-2">Semua {title.toLowerCase()}</p>}
        </div>

        {category === 'pendidik' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <TeacherCard key={item.id} teacher={item} idx={i} />
            ))}
          </div>
        ) : category === 'galeri' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <GalleryCard key={item.id} item={item} linkTo={`/galeri/${item.id}`} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} gradient={gradient} linkTo={`/${category}/${item.id}`} />
            ))}
          </div>
        )}
      </div>
      <Footer settings={settings} contact={contact} />
      <WhatsAppButton whatsapp={settings.whatsapp_number} />
    </div>
  );
}
