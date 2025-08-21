import React from 'react';
import logo from '../../assets/logo.png';

// --- Ikon ---
const CloseIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const CarIcon = () => <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>; // Ganti ikon mobil
const CalendarIcon = () => <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const UserIcon = () => <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LocationPinIcon = () => <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657l-5.657 5.657a1 1 0 01-1.414 0l-5.657-5.657A8 8 0 1118 8a8 8 0 01-.343 8.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
// -----------

function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  // Fungsi untuk memformat tanggal DAN jam
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };
  
  const statusColors = {
    'Lunas': 'bg-green-100 text-green-800',
    'Menunggu Pembayaran': 'bg-yellow-100 text-yellow-800',
    'Selesai': 'bg-blue-100 text-blue-800',
    'Batal': 'bg-red-100 text-red-800',
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-auto transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative bg-gray-50 p-6 rounded-t-lg">
            <div className="flex items-center space-x-4">
                <img src={logo} alt="Logo" className="w-16 h-16 rounded-full shadow-md" />
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Detail Rental Mobil</h3>
                    <p className="text-sm text-gray-500">CARRENTAL</p>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200">
                <CloseIcon />
            </button>
        </div>
        
        <div className="p-6">
            <div className="space-y-4">
                <div className="flex items-start">
                    <UserIcon />
                    <div>
                        <p className="text-sm text-gray-500">Info Pelanggan</p>
                        <p className="font-bold text-gray-800">{order.customer_name}</p>
                        <p className="text-sm text-gray-600"><strong>WA:</strong> {order.customer_whatsapp}</p>
                        <p className="text-sm text-gray-600"><strong>Email:</strong> {order.customer_email || '-'}</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <CarIcon />
                    <div>
                        <p className="text-sm text-gray-500">Mobil</p>
                        <p className="font-bold text-gray-800">{order.car.brand} {order.car.model}</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <CalendarIcon />
                    <div>
                        <p className="text-sm text-gray-500">Jadwal Sewa</p>
                        <p className="font-semibold text-gray-700">Mulai: {formatDateTime(order.start_date)}</p>
                        <p className="font-semibold text-gray-700">Selesai: {formatDateTime(order.end_date)}</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <LocationPinIcon />
                    <div>
                        <p className="text-sm text-gray-500">Lokasi</p>
                        <p className="text-sm text-gray-600"><strong>Ambil:</strong> {order.pickup_location}</p>
                        <p className="text-sm text-gray-600"><strong>Kembali:</strong> {order.return_location}</p>
                    </div>
                </div>
            </div>

            <div className="border-t-2 border-dashed my-6"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Total Biaya</span>
              <span className="text-2xl font-bold text-indigo-600">
                Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}
              </span>
            </div>
            
            <div className="text-center">
              <span className={`px-4 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${statusColors[order.status] || 'bg-gray-100'}`}>
                {order.status}
              </span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;