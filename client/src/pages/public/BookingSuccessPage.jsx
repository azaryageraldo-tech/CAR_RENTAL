import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas'; // 1. Impor library baru
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import logo from '../../assets/logo.png';

// --- Ikon ---
const DownloadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const CheckCircleIcon = () => <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

function BookingSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const ticketRef = useRef(null); // 2. Ref untuk menunjuk ke elemen tiket

  useEffect(() => {
    axios.get(`/api/public/orders/${orderId}`)
      .then(response => setOrder(response.data))
      .catch(err => {
        console.error("Gagal mengambil detail pesanan:", err);
        setError("Pesanan tidak ditemukan atau terjadi kesalahan.");
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  // 3. Fungsi download diubah total
  const handleDownload = () => {
    if (ticketRef.current) {
      html2canvas(ticketRef.current, { useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = `tiket-carrental-${orderId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const renderContent = () => {
    if (loading) return <p>Memuat detail pesanan...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!order || !order.car) return <p>Data pesanan tidak lengkap.</p>;

    return (
      // 4. Tambahkan ref ke div utama tiket
      <div ref={ticketRef} className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden" data-aos="fade-up">
        <div className="p-8 text-center bg-gray-50">
          <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-2 rounded-full" />
          <CheckCircleIcon />
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Pembayaran Berhasil!</h1>
          <p className="text-gray-600">Terima kasih telah memesan. Simpan bukti pemesanan ini.</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Detail Rental</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Penyewa</h3>
                <div className="mt-1 text-gray-700">
                  <p><strong>Nama:</strong> {order.customer_name}</p>
                  <p><strong>WhatsApp:</strong> {order.customer_whatsapp}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Mobil</h3>
                <p className="mt-1 text-gray-700">{order.car.brand} {order.car.model}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Jadwal & Lokasi</h3>
                <div className="mt-1 text-gray-700">
                  <p><strong>Mulai:</strong> {formatDateTime(order.start_date)}</p>
                  <p><strong>Selesai:</strong> {formatDateTime(order.end_date)}</p>
                  <p className="mt-2"><strong>Pengambilan:</strong> {order.pickup_location}</p>
                  <p><strong>Pengembalian:</strong> {order.return_location}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-dashed pt-6 flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">Total Bayar</span>
            <span className="text-2xl font-bold text-indigo-600">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        {renderContent()}
        
        {/* Tombol Aksi di luar area tiket */}
        {order && (
          <div className="mt-6 max-w-lg w-full space-y-3">
            <button 
              onClick={handleDownload}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <DownloadIcon />
              Download Nota (PNG)
            </button>
            <Link to="/" className="block text-center text-sm text-indigo-600 hover:underline">
              Kembali ke Halaman Utama
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default BookingSuccessPage;