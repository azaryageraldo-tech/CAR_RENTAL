import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../context/AuthContext"; // Impor hook useAuth
import logo from "../../assets/logo.png";

// Komponen Ikon
const DashboardIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);
const CarIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const LogoutIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);
const OrderIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

function AdminLayout() {
  const { user, logout } = useAuth(); // Ambil user dan fungsi logout dari context
  const activeLinkStyle = {
    backgroundColor: "#4f46e5", // bg-indigo-600
    color: "white",
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <aside className="flex-shrink-0 hidden w-64 bg-gray-800 md:block">
        <div className="flex flex-col h-full">
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
          <nav className="flex-1 px-4 py-4">
            <NavLink
              to="/admin/dashboard"
              className="flex items-center px-4 py-2 text-gray-300 transition-colors duration-200 rounded-md hover:bg-gray-700"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <DashboardIcon />
              <span className="ml-4">Dashboard</span>
            </NavLink>
            <NavLink
              to="/admin/cars"
              className="flex items-center px-4 py-2 mt-4 text-gray-300 transition-colors duration-200 rounded-md hover:bg-gray-700"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <CarIcon />
              <span className="ml-4">Manajemen Mobil</span>
            </NavLink>
            <NavLink
              to="/admin/orders"
              className="flex items-center px-4 py-2 mt-4 text-gray-300 transition-colors duration-200 rounded-md hover:bg-gray-700"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <OrderIcon />
              <span className="ml-4">Manajemen Pesanan</span>
            </NavLink>
          </nav>
        </div>
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between p-6 bg-white border-b">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500">
              Selamat datang, {user?.name}!
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-4 font-semibold text-gray-700">
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="p-2 text-gray-500 transition-colors duration-200 rounded-full hover:bg-gray-200 focus:outline-none"
              title="Logout"
            >
              <LogoutIcon />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
