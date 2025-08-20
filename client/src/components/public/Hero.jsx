import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import bannerImage from '../../assets/mobil-rental1.jpg'; // 1. Impor gambar lokal Anda

function Hero() {
  return (
    <section 
      id="hero"
      // 2. Gunakan gambar yang sudah diimpor
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-center" 
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      <div className="container mx-auto px-6 relative">
        <div data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-4xl md:text-6xl text-white font-extrabold leading-tight shadow-text">
            Sewa Mobil Premium <br /> untuk Perjalanan Impian Anda
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-2xl mx-auto shadow-text">
            Jelajahi kebebasan di jalan dengan koleksi mobil terbaik kami. Proses cepat, harga kompetitif, dan pelayanan prima.
          </p>
          <ScrollLink
            to="daftar-mobil" 
            smooth={true} 
            duration={500} 
            offset={-70}
            className="mt-10 inline-block bg-indigo-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Lihat Pilihan Mobil
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}

export default Hero;