import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Komponen Kartu Statistik yang diperbarui
const StatCard = ({ title, value, icon, color, loading }) => {
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg animate-pulse">
        <div className="w-3/4 h-4 mb-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg flex items-start">
      <div className={`flex items-center justify-center w-16 h-16 mr-6 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

// Ikon untuk kartu (dibuat lebih besar dan berwarna)
const CarIcon = () => <svg className="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /></svg>;
const OrderIcon = () => <svg className="w-8 h-8 text-yellow-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const RevenueIcon = () => <svg className="w-8 h-8 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;
const CompletedIcon = () => <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        // Beri sedikit jeda agar skeleton terlihat
        setTimeout(() => setLoading(false), 500); 
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Pendapatan (Bulan Ini)" 
        value={stats ? `Rp ${new Intl.NumberFormat('id-ID').format(stats.total_revenue)}` : '...'}
        icon={<RevenueIcon />}
        color="bg-green-200"
        loading={loading}
      />
      <StatCard 
        title="Mobil Tersedia" 
        value={stats ? stats.available_cars : '...'}
        icon={<CarIcon />}
        color="bg-blue-200"
        loading={loading}
      />
      <StatCard 
        title="Pesanan Aktif" 
        value={stats ? stats.active_orders : '...'}
        icon={<OrderIcon />}
        color="bg-yellow-200"
        loading={loading}
      />
      <StatCard 
        title="Pesanan Selesai" 
        value={stats ? stats.completed_orders : '...'}
        icon={<CompletedIcon />}
        color="bg-gray-300"
        loading={loading}
      />
    </div>
  );
}

export default Dashboard;