import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetailModal from './OrderDetailModal';
import ConfirmationModal from './ConfirmationModal'; // 1. Impor modal baru

// --- Ikon ---
const ViewIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const CheckCircleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

function OrdersIndex() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // 2. State baru untuk mengontrol modal konfirmasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToComplete, setOrderToComplete] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // 3. Fungsi untuk membuka modal
  const handleCompleteClick = (order) => {
    setOrderToComplete(order);
    setIsModalOpen(true);
  };

  // 4. Fungsi yang dijalankan saat konfirmasi
  const handleConfirmComplete = async () => {
    if (!orderToComplete) return;
    try {
        await axios.post(`/api/admin/orders/${orderToComplete.id}/complete`);
        fetchOrders(); // Muat ulang daftar pesanan
    } catch (error) {
        console.error("Gagal menyelesaikan pesanan:", error);
        alert('Gagal menyelesaikan pesanan. Pastikan pesanan sudah lunas.');
    } finally {
        setIsModalOpen(false);
        setOrderToComplete(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Pesanan</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobil</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Sewa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Biaya</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-indigo-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{order.customer_name}</div>
                    <div className="text-sm text-gray-500">{order.customer_email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.car.brand} {order.car.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(order.start_date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Lunas' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Selesai' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'Batal' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors"
                        title="Lihat Detail"
                      >
                        <ViewIcon />
                      </button>
                      {order.status === 'Lunas' && (
                        <button
                          onClick={() => handleCompleteClick(order)}
                          className="p-2 text-green-500 hover:text-green-700 rounded-full hover:bg-green-100 transition-colors"
                          title="Tandai Selesai"
                        >
                          <CheckCircleIcon />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}

      {/* 5. Render modal konfirmasi */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmComplete}
        title="Selesaikan Pesanan"
        message="Apakah Anda yakin ingin menyelesaikan pesanan ini? Status mobil akan menjadi 'Tersedia'."
      />
    </>
  );
}

export default OrdersIndex;
