import React, { useEffect, useState } from 'react';
import { fetchAll } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Programs from './components/Programs';
import FacilitiesEskul from './components/FacilitiesEskul';
import Teachers from './components/Teachers';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import JoinUs from './components/JoinUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Butterflies from './components/Butterflies';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold">Memuat...</p>
        </div>
      </div>
    );
  }

  const settings = data?.settings || {};
  const hero = data?.hero || {};
  const stats = data?.stats || [];
  const about = data?.about || {};
  const programs = data?.programs || [];
  const teachers = data?.teachers || [];
  const facilities = data?.facilities || [];
  const testimonials = data?.testimonials || [];
  const contact = data?.contact || {};
  const gallery = data?.gallery || [];

  return (
    <div className="bg-white text-gray-800">
      <Butterflies />
      <Navbar settings={settings} />
      <Hero hero={hero} settings={settings} />
      <Stats stats={stats} />
      <About about={about} />
      <Programs programs={programs} />
      <FacilitiesEskul facilities={facilities} />
      <Teachers teachers={teachers} />
      <Gallery gallery={gallery} />
      <Testimonials testimonials={testimonials} />
      <JoinUs settings={settings} />
      <Contact contact={contact} settings={settings} />
      <Footer settings={settings} contact={contact} />
      <WhatsAppButton whatsapp={settings.whatsapp_number} />
    </div>
  );
}
