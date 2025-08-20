import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../assets/logo.png';

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

  const navLinkClasses = `cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-200 hover:text-white'}`;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <img src={logo} alt="CARRENTAL Logo" className="h-12 w-12 mr-3" />
          <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            CARRENTAL
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <ScrollLink to="hero" smooth={true} duration={500} className={navLinkClasses}>Home</ScrollLink>
          <ScrollLink to="daftar-mobil" smooth={true} duration={500} offset={-70} className={navLinkClasses}>Daftar Mobil</ScrollLink>
          <ScrollLink to="tentang-kami" smooth={true} duration={500} offset={-70} className={navLinkClasses}>Tentang Kami</ScrollLink>
          <ScrollLink to="kontak" smooth={true} duration={500} offset={-70} className={navLinkClasses}>Kontak</ScrollLink>
        </nav>
        <ScrollLink to="daftar-mobil" smooth={true} duration={500} offset={-70} className="hidden md:block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 cursor-pointer">
          Pesan Sekarang
        </ScrollLink>
      </div>
    </header>
  );
}
export default Header;