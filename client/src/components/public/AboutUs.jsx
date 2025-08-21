import React from 'react';
// 1. Impor gambar Anda dari folder assets
import aboutImage from '../../assets/about-us-image.jpg'; 

// --- Ikon untuk Poin Keunggulan ---
const ShieldCheckIcon = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.944c2.832 0 5.48-.93 7.618-2.544A12.02 12.02 0 0021 12.056a11.955 11.955 0 01-5.382-3.016z" /></svg>;
const ClockIcon = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CurrencyDollarIcon = () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 12v4m0 4v.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
// ---

function AboutUs() {
  return (
    <section id="tentang-kami" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Kolom Gambar */}
          <div data-aos="fade-right" className="relative">
            {/* --- BAGIAN INI DIPERBARUI --- */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-orange-200 rounded-lg transform -rotate-3"></div>
            <img 
              src={aboutImage}
              alt="Armada Mobil CarRental" 
              className="relative rounded-lg shadow-2xl w-full h-full object-cover"
            />
          </div>

          {/* Kolom Teks */}
          <div data-aos="fade-left">
            {/* --- BAGIAN INI DIPERBARUI --- */}
            <span className="text-orange-500 font-semibold uppercase tracking-wider">Tentang Kami</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-6">Partner Perjalanan Terpercaya Anda</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Selamat datang di CARRENTAL, solusi persewaan mobil yang mengutamakan kenyamanan, keamanan, dan kemudahan. Kami hadir untuk memastikan setiap perjalanan Anda, baik untuk bisnis maupun liburan, berjalan lancar tanpa hambatan.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                {/* --- BAGIAN INI DIPERBARUI --- */}
                <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-orange-500 text-white rounded-full shadow-lg">
                  <ShieldCheckIcon />
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-bold text-gray-800">Armada Terawat & Aman</h4>
                  <p className="text-gray-600 mt-1">Semua mobil kami menjalani servis rutin untuk menjamin performa dan keselamatan Anda di jalan.</p>
                </div>
              </div>
              <div className="flex items-start">
                {/* --- BAGIAN INI DIPERBARUI --- */}
                <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-orange-500 text-white rounded-full shadow-lg">
                  <ClockIcon />
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-bold text-gray-800">Proses Cepat & Mudah</h4>
                  <p className="text-gray-600 mt-1">Kami menghargai waktu Anda. Proses booking kami rancang agar cepat, sederhana, dan transparan.</p>
                </div>
              </div>
              <div className="flex items-start">
                {/* --- BAGIAN INI DIPERBARUI --- */}
                <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-orange-500 text-white rounded-full shadow-lg">
                  <CurrencyDollarIcon />
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-bold text-gray-800">Harga Kompetitif</h4>
                  <p className="text-gray-600 mt-1">Nikmati kualitas layanan premium dengan harga sewa yang bersahabat dan tanpa biaya tersembunyi.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
export default AboutUs;
