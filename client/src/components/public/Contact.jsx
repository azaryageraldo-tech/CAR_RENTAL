import React from 'react';

function Contact() {
  return (
    <section id="kontak" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-6 text-center" data-aos="fade-up">
        <h2 className="text-4xl font-extrabold">Hubungi Kami</h2>
        <p className="mt-4 max-w-2xl mx-auto">Punya pertanyaan atau ingin memesan langsung? Tim kami siap membantu Anda.</p>
        <div className="mt-10">
          <a 
            href="https://wa.me/6281234567890" // Ganti dengan nomor WA Anda
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-green-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            Chat via WhatsApp
          </a>
          <p className="mt-6">Atau hubungi kami via email: <a href="mailto:info@carrental.com" className="text-indigo-400">info@carrental.com</a></p>
        </div>
      </div>
    </section>
  );
}
export default Contact;