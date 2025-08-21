import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../assets/logo.png';

// --- Ikon Media Sosial ---
const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    <span className="sr-only">{href}</span>
    {children}
  </a>
);

const FacebookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>;
const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.161 1.545a1.45 1.45 0 01.449 1.258c0 1.25-.012 1.545-.059 2.193a10.45 10.45 0 00-.06 1.258c-.049.795-.195 1.363-.356 1.808a2.91 2.91 0 00-.465 1.153 2.91 2.91 0 00-1.153 1.772c-.247.636-.416 1.363-.465 2.427-.048 1.024-.06 1.378-.06 3.808s.012 2.784.06 3.808c.049 1.064.218 1.791.465 2.427a2.91 2.91 0 001.153 1.772c.636.465 1.258.745 1.808.868 1.024.048 1.378.06 3.808.06s2.784-.012 3.808-.06c1.064-.049 1.791-.218 2.427-.465a2.91 2.91 0 001.772-1.153c.465-.636.745-1.258.868-1.808.048-1.024.06-1.378.06-3.808s-.012-2.784-.06-3.808c-.049-1.064-.218-1.791-.465-2.427a2.91 2.91 0 00-1.153-1.772c-.636-.465-1.258-.745-1.808-.868-1.024-.048-1.378-.06-3.808-.06s-2.784.012-3.808.06zm-1.545 1.545a1.45 1.45 0 00-.449-1.258c-.636-.247-1.258-.416-1.808-.465-1.024-.048-1.378-.06-3.808-.06s-2.784.012-3.808.06c-1.064.049-1.791.218-2.427.465a4.902 4.902 0 00-1.772 1.153 4.902 4.902 0 00-1.153 1.772c-.247.636-.416 1.363-.465 2.427-.048 1.024-.06 1.378-.06 3.808s.012 2.784.06 3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772c.636.465 1.363.745 2.427.868 1.024.048 1.378.06 3.808.06s2.784-.012 3.808-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153c.465-.636.745-1.363.868-2.427.048-1.024.06-1.378.06-3.808s-.012-2.784-.06-3.808c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772c-.636-.465-1.363-.745-2.427-.868-1.024-.048-1.378-.06-3.808-.06s-2.784.012-3.808.06z" clipRule="evenodd" /></svg>;
const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>;
// ---

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* --- BAGIAN YANG DIPERBAIKI --- */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src={logo} 
                alt="CARRENTAL Logo" 
                className="h-16 w-16 rounded-full object-cover mr-3" // 1. Ukuran diperbesar & dibuat bulat
              />
              <span className="text-xl font-bold text-white">
                CAR<span className="text-orange-500">RENTAL</span> {/* 2. Warna disesuaikan */}
              </span>
            </div>
            <p className="text-sm">Solusi rental mobil terpercaya untuk segala kebutuhan perjalanan Anda.</p>
          </div>
          {/* --- AKHIR BAGIAN YANG DIPERBAIKI --- */}
          
          <div>
            <h3 className="text-white font-semibold tracking-wider uppercase">Navigasi</h3>
            <ul className="mt-4 space-y-2">
              <li><ScrollLink to="hero" smooth={true} duration={500} className="hover:text-white cursor-pointer">Home</ScrollLink></li>
              <li><ScrollLink to="daftar-mobil" smooth={true} duration={500} offset={-70} className="hover:text-white cursor-pointer">Daftar Mobil</ScrollLink></li>
              <li><ScrollLink to="tentang-kami" smooth={true} duration={500} offset={-70} className="hover:text-white cursor-pointer">Tentang Kami</ScrollLink></li>
              <li><ScrollLink to="faq" smooth={true} duration={500} offset={-70} className="hover:text-white cursor-pointer">FAQ</ScrollLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold tracking-wider uppercase">Kontak</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:info@carrental.com" className="hover:text-white">info@carrental.com</a></li>
              <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-white">+62 812-3456-7890</a></li>
              <li><p>Jl. Sudirman No. 123, Jakarta</p></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold tracking-wider uppercase">Ikuti Kami</h3>
            <div className="flex mt-4 space-x-6">
              <SocialIcon href="#"><FacebookIcon /></SocialIcon>
              <SocialIcon href="#"><InstagramIcon /></SocialIcon>
              <SocialIcon href="#"><TwitterIcon /></SocialIcon>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CARRENTAL. Dibuat dengan cinta di Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;