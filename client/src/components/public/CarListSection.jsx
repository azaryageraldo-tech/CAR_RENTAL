import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// --- Ikon Baru untuk Search Bar ---
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// --- Komponen Kartu Mobil yang Disederhanakan ---
const CarCard = ({ car }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col" data-aos="fade-up">
    <div className="relative">
      <img src={`http://localhost:8000/storage/${car.image_url}`} alt={`${car.brand} ${car.model}`} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
      <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
        {car.available_stock} Unit Tersedia
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-gray-800">{car.brand} {car.model}</h3>
      </div>
      <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <span className="text-gray-500 text-sm">Mulai dari</span>
          <p className="text-indigo-600 font-bold text-2xl">
            Rp {new Intl.NumberFormat('id-ID').format(car.daily_rate)}<span className="text-sm font-normal text-gray-500">/hari</span>
          </p>
        </div>
        <Link 
            to={`/booking/${car.id}`}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Sewa
        </Link>
      </div>
    </div>
  </div>
);

function CarListSection() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null); // Ref untuk scrolling

  useEffect(() => {
    axios.get('/api/public/cars')
      .then(response => { 
        setAllCars(response.data);
      })
      .catch(error => console.error("Gagal mengambil data mobil publik:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredCars = allCars.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowLess = () => {
    setShowAll(false);
    // Scroll ke atas seksi daftar mobil untuk pengalaman pengguna yang lebih baik
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const carsToDisplay = showAll ? filteredCars : filteredCars.slice(0, 3);

  return (
    <section id="daftar-mobil" className="py-20 bg-gray-100" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-gray-900">Armada Pilihan Kami</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Temukan mobil yang paling sesuai dengan kebutuhan perjalanan Anda.</p>
        </div>
        
        <div className="mb-12 max-w-lg mx-auto" data-aos="fade-up">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input 
                    type="text"
                    placeholder="Cari mobil (contoh: Avanza, Brio)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
        </div>

        {loading ? (
          <p className="text-center">Memuat daftar mobil...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {carsToDisplay.length > 0 ? (
                carsToDisplay.map(car => (
                  <CarCard key={car.id} car={car} />
                ))
              ) : (
                <p className="md:col-span-3 text-center text-gray-500">Mobil yang Anda cari tidak ditemukan.</p>
              )}
            </div>

            <div className="text-center mt-12" data-aos="fade-up">
              {/* Tombol "Lihat Lebih Banyak" */}
              {!showAll && filteredCars.length > 3 && (
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg"
                >
                  Lihat Lebih Banyak
                </button>
              )}
              {/* Tombol "Lihat Lebih Sedikit" */}
              {showAll && filteredCars.length > 3 && (
                <button
                  onClick={handleShowLess}
                  className="bg-gray-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-transform transform hover:scale-105 shadow-lg"
                >
                  Lihat Lebih Sedikit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
export default CarListSection;
