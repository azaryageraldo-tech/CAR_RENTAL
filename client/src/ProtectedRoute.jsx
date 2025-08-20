import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './context/AuthContext';

function ProtectedRoute() {
  const { user } = useAuth();

  // Jika user ada (tidak null), tampilkan halaman yang diminta (Outlet).
  // Jika tidak, alihkan ke halaman login.
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;