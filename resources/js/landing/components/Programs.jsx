import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Lightbulb, Heart, Globe, Cpu, Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const iconMap = {
  'book-open': BookOpen,
  lightbulb: Lightbulb,
  heart: Heart,
  globe: Globe,
  cpu: Cpu,
  star: Star,
};

const ITEMS_PER_PAGE = 6;

export default function Programs({ programs }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(programs.length / ITEMS_PER_PAGE);
  const visible = programs.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const colors = [
    'from-orange-400 to-pink-400',
    'from-teal-400 to-cyan-400',
    'from-purple-400 to-pink-400',
    'from-blue-400 to-indigo-400',
    'from-green-400 to-teal-400',
    'from-yellow-400 to-orange-400',
  ];

  return (
    <section id="program" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-secondary/10 text-secondary font-bold px-4 py-1.5 rounded-full text-sm mb-3">Program Unggulan</span>
          <h2 className="font-display text-4xl font-bold text-gray-800">Program Kami</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Program pendidikan Islam terpadu yang dirancang untuk membentuk generasi terbaik</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((program, i) => {
            const Icon = iconMap[program.icon] || Star;
            const gradient = colors[i % colors.length];
            return (
              <Link key={program.id} to={`/program/${program.id}`} className="group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-lift bg-white border border-gray-100">
                {program.image_url ? (
                  <div className="img-zoom h-48">
                    <img src={program.image_url} alt={program.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                )}
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-800 mb-2">{program.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{program.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${i === page ? 'bg-primary text-white' : 'border-2 border-gray-200 text-gray-500 hover:border-primary hover:text-primary'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all disabled:opacity-40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {programs.length > ITEMS_PER_PAGE && (
          <div className="text-center mt-10">
            <Link
              to="/program"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-orange-600 transition-all text-sm"
            >
              Lihat Semua Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
