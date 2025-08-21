import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import logo from '../../assets/logo.png';

// --- Komponen Ikon ---
const DashboardIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CarIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const OrderIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const LogoutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const WarningIcon = () => <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;

// --- Komponen Modal Konfirmasi Logout ---
const LogoutConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <WarningIcon />
          </div>
          <div className="ml-4 text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Konfirmasi Logout</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Apakah Anda yakin ingin keluar dari sesi ini?
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onConfirm}
          >
            Yakin, Logout
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onCancel}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};


function AdminLayout() {
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const activeLinkStyle = {
    backgroundColor: '#4f46e5', // bg-indigo-600
    color: 'white',
  };

  return (
    <>
      <div className="flex h-screen font-sans bg-gray-100">
        {/* Sidebar */}
        <aside className="flex-shrink-0 hidden w-64 bg-gray-800 md:block">
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="flex flex-col items-center justify-center pt-8 pb-4 border-b border-gray-700">
              <img 
                src={logo} 
                alt="Logo Perusahaan" 
                className="w-20 h-20 rounded-full"
              />
              <span className="mt-3 text-xl font-bold text-orange-500"> 
                CARRENTAL
              </span>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-4">
              <NavLink 
                to="/admin/dashboard" 
                className="flex items-center px-4 py-2 text-gray-300 transition-colors duration-200 rounded-md hover:bg-gray-700"
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              >
                <DashboardIcon />
                <span className="ml-4">Dashboard</span>
              </NavLink>
              <NavLink 
                to="/admin/cars" 
                className="flex items-center px-4 py-2 mt-4 text-gray-300 transition-colors duration-200 rounded-md hover:bg-gray-700"
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              >
                <CarIcon />
                <span className="ml-4">Manajemen Mobil</span>
              </NavLink>
               <NavLink 
                to="/admin/orders" 
                className="flex items-center px-4 py-2 mt-4 text-gray-300 transition-colors duration-200 rounded-md hover:bg-gray-700"
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              >
                <OrderIcon />
                <span className="ml-4">Manajemen Pesanan</span>
              </NavLink>
            </nav>

            {/* --- BAGIAN LOGOUT DIPINDAHKAN KE SINI --- */}
            <div className="px-4 py-4 border-t border-gray-700">
              <button 
                  onClick={handleLogoutClick} 
                  className="flex items-center w-full px-4 py-2 text-gray-300 transition-colors duration-200 rounded-md hover:bg-red-500 hover:text-white"
              >
                  <LogoutIcon />
                  <span className="ml-4">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between p-6 bg-white border-b">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
              <p className="text-sm text-gray-500">Selamat datang, {user?.name || 'Admin'}!</p>
            </div>
          </header>
          
          {/* Content Area */}
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>

      <LogoutConfirmationModal 
        isOpen={isLogoutModalOpen}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}

export default AdminLayout;
