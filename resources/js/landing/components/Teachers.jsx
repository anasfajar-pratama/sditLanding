import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FlowerIcon = ({ color = '#f97316' }) => (
  <svg width="32" height="32" viewBox="0 0 80 80">
    <circle cx="40" cy="40" r="11" fill={color} />
    <ellipse cx="40" cy="20" rx="8" ry="13" fill={color} opacity="0.55" />
    <ellipse cx="40" cy="60" rx="8" ry="13" fill={color} opacity="0.55" />
    <ellipse cx="20" cy="40" rx="13" ry="8" fill={color} opacity="0.55" />
    <ellipse cx="60" cy="40" rx="13" ry="8" fill={color} opacity="0.55" />
  </svg>
);

const flowerColors = ['#f97316', '#0d9488', '#ec4899', '#8b5cf6', '#f59e0b', '#3b82f6'];
const bgColors = ['bg-orange-50', 'bg-teal-50', 'bg-pink-50', 'bg-purple-50', 'bg-yellow-50', 'bg-blue-50'];
const textColors = ['text-primary', 'text-secondary', 'text-pink-500', 'text-purple-500', 'text-yellow-600', 'text-blue-500'];

function TeacherCard({ teacher, idx }) {
  const color = flowerColors[idx % flowerColors.length];
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className={`w-14 h-14 ${bgColors[idx % bgColors.length]} rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden`}>
        {teacher.photo_url ? (
          <img src={teacher.photo_url} alt={teacher.name} className="w-full h-full rounded-2xl object-cover" />
        ) : (
          <FlowerIcon color={color} />
        )}
      </div>
      <div className="min-w-0">
        <div className="font-display font-bold text-gray-800 text-sm leading-tight">{teacher.name}</div>
        <div className={`text-sm font-semibold ${textColors[idx % textColors.length]} mb-1`}>
          {teacher.position || teacher.subject}
        </div>
        {teacher.bio && (
          <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{teacher.bio}</div>
        )}
      </div>
    </div>
  );
}

export default function Teachers({ teachers, settings }) {
  if (!teachers.length) return null;
  const grid = teachers.slice(0, 6);
  const prestasiImage = settings?.prestasi_image ? '/' + settings.prestasi_image : null;

  return (
    <section id="pendidik" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl font-bold text-gray-800">Pendidik Berdedikasi</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Dewan guru kami adalah pendidik profesional yang ramah, sholeh, dan berkomitmen membimbing anak-anak dengan penuh kasih sayang.
          </p>
        </div>

        {/* Featured image */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-video bg-gradient-to-br from-teal-100 to-orange-100">
            {prestasiImage ? (
              <img
                src={prestasiImage}
                alt="Pendidik SDIT Bunga Cempaka"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-3">👩‍🏫</div>
                  <p className="text-gray-500 font-semibold">Tim Pendidik Kami</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-primary rounded-full opacity-30 animate-float" />
        </div>

        {/* Teacher grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {grid.map((teacher, i) => (
            <TeacherCard key={teacher.id} teacher={teacher} idx={i} />
          ))}
        </div>

        {teachers.length > 6 && (
          <div className="text-center mt-10">
            <Link
              to="/pendidik"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-orange-600 transition-all text-sm"
            >
              Lihat Semua Pendidik <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
