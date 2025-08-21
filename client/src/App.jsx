import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';

// Halaman & Komponen Publik
import LandingPage from './LandingPage';
import BookingPage from './BookingPage';
import BookingSuccessPage from './pages/public/BookingSuccessPage'; 

// Halaman & Komponen Admin
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import CarsIndex from './pages/admin/CarsIndex';
import CarForm from './pages/admin/CarsForm'; // <-- PERBAIKI DI SINI
import OrdersIndex from './pages/admin/OrdersIndex';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/booking/:carId" element={<BookingPage />} />
      <Route path="/booking/success/:orderId" element={<BookingSuccessPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Rute Admin yang Dilindungi */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars" element={<CarsIndex />} />
          <Route path="cars/create" element={<CarForm />} />
          <Route path="cars/edit/:id" element={<CarForm />} />
          <Route path="orders" element={<OrdersIndex />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;