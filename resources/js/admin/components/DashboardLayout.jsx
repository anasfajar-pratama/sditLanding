import React, { useState } from 'react';
import { useAdmin } from '../App';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

// Pages
import SettingsPage from '../pages/SettingsPage';
import HeroPage from '../pages/HeroPage';
import StatsPage from '../pages/StatsPage';
import AboutPage from '../pages/AboutPage';
import ProgramsPage from '../pages/ProgramsPage';
import TeachersPage from '../pages/TeachersPage';
import FacilitiesPage from '../pages/FacilitiesPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import ContactPage from '../pages/ContactPage';
import DashboardHome from '../pages/DashboardHome';
import GalleryPage from '../pages/GalleryPage';
import AdminPage from '../pages/AdminPage';
import ActivityLogPage from '../pages/ActivityLogPage';

const PAGES = {
  dashboard: DashboardHome,
  settings: SettingsPage,
  hero: HeroPage,
  stats: StatsPage,
  about: AboutPage,
  programs: ProgramsPage,
  teachers: TeachersPage,
  facilities: FacilitiesPage,
  testimonials: TestimonialsPage,
  contact: ContactPage,
  gallery: GalleryPage,
  admins: AdminPage,
  'activity-logs': ActivityLogPage,
};

export default function DashboardLayout() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const PageComponent = PAGES[activePage] || DashboardHome;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        active={activePage}
        onNavigate={(page) => { setActivePage(page); setSidebarOpen(false); }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-16 flex items-center justify-between flex-shrink-0 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm hidden sm:block">Admin Panel</span>
            <span className="text-gray-300 hidden sm:block">/</span>
            <span className="font-semibold text-gray-700 capitalize">{activePage}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-sm text-secondary hover:underline hidden sm:block"
            >
              Lihat Website
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <PageComponent onNavigate={setActivePage} />
        </main>
      </div>
    </div>
  );
}
