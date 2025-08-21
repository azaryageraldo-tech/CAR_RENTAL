import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../assets/logo.png'; // Pastikan path logo benar

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`;
  const textClasses = `transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`;
  const navLinkClasses = `cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-gray-600 hover:text-orange-500' : 'text-gray-200 hover:text-white'}`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <ScrollLink to="hero" smooth={true} duration={500} className="flex items-center cursor-pointer">
          {/* --- BAGIAN YANG DIPERBAIKI --- */}
          <img 
            src={logo} 
            alt="CARRENTAL Logo" 
            className="h-16 w-16 rounded-full object-cover mr-3 border-2 border-white/50 shadow-md" // 1. Ukuran diperbesar dan dibuat bulat
          />
          <span className={`text-2xl font-bold ${textClasses}`}>
            CAR<span className="text-orange-500">RENTAL</span> {/* 2. Warna disesuaikan */}
          </span>
          {/* --- AKHIR BAGIAN YANG DIPERBAIKI --- */}
        </ScrollLink>
        <nav className="hidden md:flex items-center space-x-8">
          <ScrollLink to="hero" smooth={true} duration={500} className={navLinkClasses}>Home</ScrollLink>
          <ScrollLink to="daftar-mobil" smooth={true} duration={500} offset={-70} className={navLinkClasses}>Daftar Mobil</ScrollLink>
          <ScrollLink to="tentang-kami" smooth={true} duration={500} offset={-70} className={navLinkClasses}>Tentang Kami</ScrollLink>
          <ScrollLink to="kontak" smooth={true} duration={500} offset={-70} className={navLinkClasses}>Kontak</ScrollLink>
        </nav>
        <ScrollLink to="daftar-mobil" smooth={true} duration={500} offset={-70} className="hidden md:block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-transform transform hover:scale-105 cursor-pointer">
          Pesan Sekarang
        </ScrollLink>
      </div>
    </header>
  );
}
export default Header;