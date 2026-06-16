import React from 'react';
import { useAdmin } from '../App';
import {
  LayoutDashboard, Settings, Image, BarChart3, BookOpen,
  GraduationCap, Building, MessageSquare, Phone,
  LogOut, X, Info, Images
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
  { id: 'hero', label: 'Hero Section', icon: Image },
  { id: 'stats', label: 'Statistik', icon: BarChart3 },
  { id: 'about', label: 'Tentang Kami', icon: Info },
  { id: 'programs', label: 'Program', icon: BookOpen },
  { id: 'teachers', label: 'Pendidik', icon: GraduationCap },
  { id: 'facilities', label: 'Fasilitas & Eskul', icon: Building },
  { id: 'gallery', label: 'Galeri', icon: Images },
  { id: 'testimonials', label: 'Testimoni', icon: MessageSquare },
  { id: 'contact', label: 'Kontak', icon: Phone },
];

export default function Sidebar({ active, onNavigate, isOpen, onClose }) {
  const { admin, logout } = useAdmin();

  const content = (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="px-5 py-5 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center font-display font-bold text-sm shadow">
            BC
          </div>
          <div>
            <div className="font-display font-bold text-sm">SDIT Admin</div>
            <div className="text-xs text-gray-400">{admin?.name || 'Administrator'}</div>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all text-sm font-semibold ${
              active === id
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-white hover:bg-red-600 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 h-full">
        {content}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <aside className="relative w-60 h-full">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
