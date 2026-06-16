import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from './api';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import toast, { Toaster } from 'react-hot-toast';

export const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.me()
      .then(data => {
        if (data.authenticated) setAdmin(data.admin);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (adminData) => {
    setAdmin(adminData);
    toast.success('Login berhasil! Selamat datang.');
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      setAdmin(null);
      toast.success('Logout berhasil.');
    } catch (e) {
      setAdmin(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{ admin, setAdmin, logout: handleLogout }}>
      <Toaster position="top-right" />
      {!admin ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <DashboardLayout />
      )}
    </AdminContext.Provider>
  );
}
