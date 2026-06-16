import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Contact({ contact, settings }) {
  const whatsapp = settings.whatsapp_number || '';
  const waLink = whatsapp ? `https://wa.me/${whatsapp}` : '#';

  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-100 text-teal-700 font-bold px-4 py-1.5 rounded-full text-sm mb-3">Hubungi Kami</span>
          <h2 className="font-display text-4xl font-bold text-gray-800">Kontak</h2>
          <p className="text-gray-500 mt-3">Kami siap menjawab pertanyaan Anda</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {contact.address && (
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold text-gray-800 mb-1">Alamat</div>
                <div className="text-gray-600 text-sm">{contact.address}</div>
                {contact.postal_code && <div className="text-gray-400 text-xs mt-1">Kode Pos: {contact.postal_code}</div>}
              </div>
            </div>
          )}

          {(contact.phone || contact.phone_2) && (
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="font-bold text-gray-800 mb-1">Telepon</div>
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="text-gray-600 text-sm hover:text-primary transition-colors block">{contact.phone}</a>
                )}
                {contact.phone_2 && (
                  <a href={`tel:${contact.phone_2}`} className="text-gray-600 text-sm hover:text-primary transition-colors block">{contact.phone_2}</a>
                )}
              </div>
            </div>
          )}

          {(contact.email || contact.email_2) && (
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="font-bold text-gray-800 mb-1">Email</div>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="text-gray-600 text-sm hover:text-primary transition-colors block">{contact.email}</a>
                )}
                {contact.email_2 && (
                  <a href={`mailto:${contact.email_2}`} className="text-gray-600 text-sm hover:text-primary transition-colors block">{contact.email_2}</a>
                )}
              </div>
            </div>
          )}

          {contact.operational_hours && (
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="font-bold text-gray-800 mb-1">Jam Operasional</div>
                <div className="text-gray-600 text-sm whitespace-pre-line">{contact.operational_hours}</div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 bg-green-50 hover:bg-green-100 rounded-2xl border-2 border-green-200 transition-all group"
          >
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-green-700">Chat via WhatsApp</div>
              <div className="text-green-600 text-sm">Klik untuk langsung terhubung</div>
            </div>
            <div className="ml-auto text-green-500 group-hover:translate-x-1 transition-transform text-xl">→</div>
          </a>
        </div>
      </div>
    </section>
  );
}
