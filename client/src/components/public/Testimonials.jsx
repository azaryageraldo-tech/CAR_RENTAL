import React from 'react';

const testimonials = [
  { name: 'Andi Pratama', role: 'Travel Blogger', text: 'Pelayanannya luar biasa cepat dan mobilnya bersih. Perjalanan saya jadi sangat menyenangkan. Sangat direkomendasikan!', image: 'https://i.pravatar.cc/150?u=andi' },
  { name: 'Siti Aisyah', role: 'Karyawan Swasta', text: 'Harga sewanya sangat kompetitif. Prosesnya juga tidak berbelit-belit. Pasti akan sewa di sini lagi untuk liburan keluarga.', image: 'https://i.pravatar.cc/150?u=siti' },
  { name: 'Budi Santoso', role: 'Pengusaha', text: 'Saya butuh mobil mendadak untuk urusan bisnis, dan CARRENTAL bisa menyediakannya dengan cepat. Profesional!', image: 'https://i.pravatar.cc/150?u=budi' },
  { name: 'Rina Wijaya', role: 'Mahasiswi', text: 'Pilihan mobilnya banyak dan harganya pas di kantong mahasiswa. Cocok untuk jalan-jalan bareng teman.', image: 'https://i.pravatar.cc/150?u=rina' },
  { name: 'David Lee', role: 'Fotografer', text: 'Kondisi mobil sangat prima, interiornya bersih. Membuat saya nyaman membawa peralatan fotografi yang mahal.', image: 'https://i.pravatar.cc/150?u=david' },
  { name: 'Maya Sari', role: 'Ibu Rumah Tangga', text: 'Aman dan nyaman untuk perjalanan keluarga. Customer service-nya juga sangat ramah dan membantu.', image: 'https://i.pravatar.cc/150?u=maya' },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-gray-900">Apa Kata Pelanggan Kami</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Kepuasan Anda adalah prioritas utama kami. Lihat pengalaman mereka bersama kami.</p>
        </div>
      </div>
      
      <div 
        className="flex overflow-x-auto space-x-8 pb-10 px-6 snap-x snap-mandatory scrollbar-hide"
        data-aos="fade-up"
        style={{ perspective: '1000px' }} // Menambahkan perspektif untuk efek 3D
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-5/6 sm:w-1/2 lg:w-1/3 snap-center">
            <div 
              className="bg-white p-8 rounded-xl shadow-2xl h-full flex flex-col justify-between transition-transform duration-500 hover:transform hover:rotate-y-6" // Efek 3D saat hover
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div>
                <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-200 shadow-lg" />
                <p className="text-gray-600 italic mt-8 text-lg text-center">"{testimonial.text}"</p>
              </div>
              <div className="mt-6 text-center">
                <p className="font-bold text-xl text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-orange-500 font-medium">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Testimonials;