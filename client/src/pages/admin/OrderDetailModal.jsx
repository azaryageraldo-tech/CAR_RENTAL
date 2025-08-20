import React from 'react';
import logo from '../../assets/logo.png'; // Pastikan logo ada di src/assets

// --- Ikon ---
const CloseIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const CarIcon = () => <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CalendarIcon = () => <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const UserIcon = () => <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
// -----------

function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const statusColor = {
    'Lunas': 'bg-green-100 text-green-800',
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
                        <p className="text-sm text-gray-500">Nama Pelanggan</p>
                        <p className="font-bold text-gray-800">{order.customer_name}</p>
                        <p className="text-sm text-gray-600">{order.customer_email}</p>
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
                        <p className="text-sm text-gray-500">Durasi Sewa</p>
                        <p className="font-bold text-gray-800">{formatDate(order.start_date)} - {formatDate(order.end_date)}</p>
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
                <span className={`px-4 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${statusColor[order.status]}`}>
                    {order.status}
                </span>
            </div>

            {/* Barcode Palsu */}
            <div className="mt-6 flex justify-center opacity-70">
                <svg width="200" height="40" viewBox="0 0 200 40">
                    <rect x="0" y="0" width="2" height="40" fill="black" />
                    <rect x="4" y="0" width="1" height="40" fill="black" />
                    <rect x="7" y="0" width="3" height="40" fill="black" />
                    <rect x="12" y="0" width="1" height="40" fill="black" />
                    <rect x="15" y="0" width="2" height="40" fill="black" />
                    <rect x="19" y="0" width="2" height="40" fill="black" />
                    <rect x="23" y="0" width="1" height="40" fill="black" />
                    <rect x="26" y="0" width="3" height="40" fill="black" />
                    <rect x="31" y="0" width="1" height="40" fill="black" />
                    <rect x="34" y="0" width="2" height="40" fill="black" />
                    <rect x="38" y="0" width="2" height="40" fill="black" />
                    <rect x="42" y="0" width="1" height="40" fill="black" />
                    <rect x="45" y="0" width="3" height="40" fill="black" />
                    <rect x="50" y="0" width="1" height="40" fill="black" />
                    <rect x="53" y="0" width="2" height="40" fill="black" />
                    <rect x="57" y="0" width="2" height="40" fill="black" />
                    <rect x="61" y="0" width="1" height="40" fill="black" />
                    <rect x="64" y="0" width="3" height="40" fill="black" />
                    <rect x="69" y="0" width="1" height="40" fill="black" />
                    <rect x="72" y="0" width="2" height="40" fill="black" />
                    <rect x="76" y="0" width="2" height="40" fill="black" />
                    <rect x="80" y="0" width="1" height="40" fill="black" />
                    <rect x="83" y="0" width="3" height="40" fill="black" />
                    <rect x="88" y="0" width="1" height="40" fill="black" />
                    <rect x="91" y="0" width="2" height="40" fill="black" />
                    <rect x="95" y="0" width="2" height="40" fill="black" />
                    <rect x="99" y="0" width="1" height="40" fill="black" />
                    <rect x="102" y="0" width="3" height="40" fill="black" />
                    <rect x="107" y="0" width="1" height="40" fill="black" />
                    <rect x="110" y="0" width="2" height="40" fill="black" />
                    <rect x="114" y="0" width="2" height="40" fill="black" />
                    <rect x="118" y="0" width="1" height="40" fill="black" />
                    <rect x="121" y="0" width="3" height="40" fill="black" />
                    <rect x="126" y="0" width="1" height="40" fill="black" />
                    <rect x="129" y="0" width="2" height="40" fill="black" />
                    <rect x="133" y="0" width="2" height="40" fill="black" />
                    <rect x="137" y="0" width="1" height="40" fill="black" />
                    <rect x="140" y="0" width="3" height="40" fill="black" />
                    <rect x="145" y="0" width="1" height="40" fill="black" />
                    <rect x="148" y="0" width="2" height="40" fill="black" />
                    <rect x="152" y="0" width="2" height="40" fill="black" />
                    <rect x="156" y="0" width="1" height="40" fill="black" />
                    <rect x="159" y="0" width="3" height="40" fill="black" />
                    <rect x="164" y="0" width="1" height="40" fill="black" />
                    <rect x="167" y="0" width="2" height="40" fill="black" />
                    <rect x="171" y="0" width="2" height="40" fill="black" />
                    <rect x="175" y="0" width="1" height="40" fill="black" />
                    <rect x="178" y="0" width="3" height="40" fill="black" />
                    <rect x="183" y="0" width="1" height="40" fill="black" />
                    <rect x="186" y="0" width="2" height="40" fill="black" />
                    <rect x="190" y="0" width="2" height="40" fill="black" />
                    <rect x="194" y="0" width="1" height="40" fill="black" />
                    <rect x="197" y="0" width="3" height="40" fill="black" />
                </svg>
            </div>

        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;