import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <-- PASTIKAN INI DIIMPOR

// --- Ikon ---
const UserGroupIcon = () => <svg className="w-5 h-5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const CogIcon = () => <svg className="w-5 h-5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const CarCard = ({ car }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group" data-aos="fade-up">
    <div className="relative">
      <img src={`http://localhost:8000/storage/${car.image_url}`} alt={`${car.brand} ${car.model}`} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
      <div className="absolute top-4 right-4 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">Tersedia</div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800">{car.brand} {car.model}</h3>
      <p className="text-gray-500 text-sm">{car.license_plate}</p>
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center"><UserGroupIcon /><span className="text-sm text-gray-700">4 Penumpang</span></div>
        <div className="flex items-center"><CogIcon /><span className="text-sm text-gray-700">Manual</span></div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <span className="text-gray-500 text-sm">Mulai dari</span>
          <p className="text-indigo-600 font-bold text-2xl">
            Rp {new Intl.NumberFormat('id-ID').format(car.daily_rate)}<span className="text-sm font-normal text-gray-500">/hari</span>
          </p>
        </div>
        {/* PASTIKAN BAGIAN INI MENGGUNAKAN <Link> */}
        <Link 
            to={`/booking/${car.id}`}
            className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-black transition-transform transform hover:scale-105"
        >
          Sewa
        </Link>
      </div>
    </div>
  </div>
);

function CarListSection() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/public/cars')
      .then(response => { setCars(response.data); })
      .catch(error => console.error("Gagal mengambil data mobil publik:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="daftar-mobil" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-gray-900">Armada Pilihan Kami</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Temukan mobil yang paling sesuai dengan kebutuhan perjalanan Anda, dari mobil kota yang lincah hingga SUV yang tangguh.</p>
        </div>
        {loading ? (
          <p className="text-center">Memuat daftar mobil...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default CarListSection;