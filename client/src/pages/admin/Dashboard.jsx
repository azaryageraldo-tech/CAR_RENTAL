import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Komponen Ikon & StatCard (tidak berubah) ---
const DownloadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const CarIcon = () => <svg className="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /></svg>;
const OrderIcon = () => <svg className="w-8 h-8 text-yellow-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const CompletedIcon = () => <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const StatCard = ({ title, value, icon, color, loading }) => {
  if (loading) { return <div className="p-6 bg-white rounded-xl shadow-lg animate-pulse"><div className="w-3/4 h-4 mb-4 bg-gray-200 rounded"></div><div className="w-1/2 h-8 bg-gray-300 rounded"></div></div>; }
  return ( <div className="p-6 bg-white rounded-xl shadow-lg flex items-start"><div className={`flex items-center justify-center w-16 h-16 mr-6 rounded-full ${color}`}>{icon}</div><div><p className="text-lg font-semibold text-gray-500">{title}</p><p className="text-3xl font-bold text-gray-800">{value}</p></div></div> );
};

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setDashboardData(response.data);
      } catch (error) { console.error("Gagal mengambil data dashboard:", error); } 
      finally { setLoading(false); }
    };
    fetchDashboardData();
  }, []);

  // --- FUNGSI INI DIKEMBALIKAN KE VERSI CSV ---
  const handleExport = async () => {
    try {
        const response = await axios.get('/api/admin/reports/export-orders');
        const orders = response.data;

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "ID,Nama Pelanggan,WhatsApp,Mobil,Tgl Mulai,Tgl Selesai,Total Harga,Status\n";

        orders.forEach(order => {
            const row = [
                order.id,
                `"${order.customer_name}"`,
                order.customer_whatsapp,
                `"${order.car.brand} ${order.car.model}"`,
                order.start_date,
                order.end_date,
                order.total_price,
                order.status
            ].join(",");
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "laporan_pesanan.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error("Gagal mengekspor data:", error);
        alert("Gagal mengekspor data.");
    }
  };

  const popularCarsChartData = {
    labels: dashboardData?.popular_cars.map(c => `${c.car.brand} ${c.car.model}`) || [],
    datasets: [ { label: 'Jumlah Pesanan', data: dashboardData?.popular_cars.map(c => c.total_orders) || [], backgroundColor: 'rgba(79, 70, 229, 0.8)', borderColor: 'rgba(79, 70, 229, 1)', borderWidth: 1, borderRadius: 5, }, ],
  };
  const chartOptions = { responsive: true, plugins: { legend: { position: 'top', }, title: { display: false, }, }, scales: { y: { beginAtZero: true } } };

  return (
    <div className="space-y-8">
      {/* Kartu Statistik Utama */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Mobil Tersedia" value={dashboardData?.stats.available_cars || 0} icon={<CarIcon />} color="bg-blue-200" loading={loading} />
        <StatCard title="Pesanan Aktif" value={dashboardData?.stats.active_orders || 0} icon={<OrderIcon />} color="bg-yellow-200" loading={loading} />
        <StatCard title="Pesanan Selesai" value={dashboardData?.stats.completed_orders || 0} icon={<CompletedIcon />} color="bg-gray-300" loading={loading} />
      </div>

      {/* Laporan & Analitik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8" data-aos="fade-right">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Laporan Pemasukan</h3>
                <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Pemasukan Hari Ini</p>
                        <p className="text-3xl font-bold text-green-600">Rp {new Intl.NumberFormat('id-ID').format(dashboardData?.revenue.daily || 0)}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Pemasukan Bulan Ini</p>
                        <p className="text-3xl font-bold text-green-600">Rp {new Intl.NumberFormat('id-ID').format(dashboardData?.revenue.monthly || 0)}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Ekspor Data</h3>
                <p className="text-sm text-gray-500 mb-4">Unduh semua data pesanan yang sudah lunas atau selesai dalam format CSV.</p>
                <button 
                    onClick={handleExport}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <DownloadIcon />
                    Export Pesanan (CSV) {/* --- TEKS TOMBOL DIPERBARUI --- */}
                </button>
            </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg" data-aos="fade-left">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Grafik Mobil Terlaris</h3>
          <div className="p-4 bg-gray-50 rounded-lg h-96">
            <Bar options={chartOptions} data={popularCarsChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
