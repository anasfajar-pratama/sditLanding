import React from 'react';

export function FormField({ label, required, children, hint }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm ${className}`}
      {...props}
    />
  );
}

export function Textarea({ rows = 4, className = '', ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm resize-none ${className}`}
      {...props}
    />
  );
}

export function Select({ children, className = '', ...props }) {
  return (
    <select
      className={`w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm bg-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SaveButton({ loading, children = 'Simpan' }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-primary hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 disabled:opacity-60 text-sm"
    >
      {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {loading ? 'Menyimpan...' : children}
    </button>
  );
}

export function ImageUpload({ label = 'Pilih Gambar', preview, name, onChange, hint }) {
  return (
    <div>
      {preview && (
        <div className="mb-3">
          <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200" />
        </div>
      )}
      <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {label}
        <input type="file" name={name} accept="image/*" onChange={onChange} className="hidden" />
      </label>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}
