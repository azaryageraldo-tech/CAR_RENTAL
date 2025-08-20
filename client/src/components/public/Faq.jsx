import React, { useState } from 'react';

// --- Komponen Ikon ---
const ChevronDownIcon = ({ className }) => (
  <svg className={`w-6 h-6 transition-transform duration-300 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
// ---

const faqData = [
  {
    question: "Apa saja syarat untuk menyewa mobil?",
    answer: "Anda memerlukan KTP, SIM A yang masih berlaku, dan dokumen pendukung lainnya (seperti ID karyawan atau NPWP). Syarat lengkap akan diinformasikan oleh tim kami saat proses verifikasi."
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Pembayaran penuh dilakukan di awal melalui transfer bank atau payment gateway yang akan segera kami sediakan di website ini. Kami tidak menerima pembayaran tunai sebagian."
  },
  {
    question: "Apakah bisa sewa mobil lepas kunci?",
    answer: "Ya, kami menyediakan layanan sewa mobil lepas kunci dengan syarat dan ketentuan yang berlaku. Tim kami akan melakukan verifikasi data terlebih dahulu sebelum menyetujui penyewaan lepas kunci."
  },
  {
    question: "Apakah ada layanan antar-jemput mobil?",
    answer: "Tentu. Kami menyediakan layanan antar-jemput mobil ke lokasi Anda, seperti bandara, stasiun, atau hotel dengan biaya tambahan yang wajar. Silakan informasikan lokasi Anda saat memesan."
  }
];

const FaqItem = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6" data-aos="fade-up" data-aos-delay={index * 100}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="font-bold text-lg text-gray-800">{item.question}</h3>
        <ChevronDownIcon className={isOpen ? 'transform rotate-180' : ''} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <p className="text-gray-600">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

function Faq() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-gray-900">Pertanyaan Umum (FAQ)</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Menemukan jawaban cepat untuk pertanyaan umum seputar layanan kami.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Faq;