import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/public/Header';
import Footer from './components/public/Footer';

// --- Ikon untuk Form ---
const UserIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>;

function BookingPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    startDate: getTodayString(),
    startTime: '09:00',
    endDate: '',
    endTime: '09:00',
    pickup_location: '',
    return_location: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`/api/public/cars/${carId}`)
      .then(response => setCar(response.data))
      .catch(error => {
        console.error("Gagal mengambil detail mobil:", error);
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [carId, navigate]);
  
  useEffect(() => {
    if (formData.startDate && formData.endDate && car) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end >= start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
        setTotalPrice(diffDays * car.daily_rate);
      } else {
        setTotalPrice(0);
      }
    } else {
        setTotalPrice(0);
    }
  }, [formData.startDate, formData.endDate, car]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "startTime") {
      setFormData(prev => ({ ...prev, startTime: value, endTime: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const payload = {
      car_id: car.id,
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      start_date: `${formData.startDate} ${formData.startTime}`,
      end_date: `${formData.endDate} ${formData.endTime}`,
      pickup_location: formData.pickup_location,
      return_location: formData.return_location,
    };
    try {
      const orderResponse = await axios.post('/api/public/orders', payload);
      const newOrder = orderResponse.data;
      const paymentResponse = await axios.post('/api/public/payment/create-transaction', { order_id: newOrder.id });
      const { token } = paymentResponse.data;
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log(result);
          navigate(`/booking/success/${newOrder.id}`);
        },
        onPending: (result) => { alert("Menunggu pembayaran Anda!"); console.log(result); navigate('/'); },
        onError: (result) => { alert("Pembayaran gagal!"); console.log(result); },
        onClose: () => { alert('Anda menutup popup tanpa menyelesaikan pembayaran'); }
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data);
      } else {
        console.error("Terjadi kesalahan:", error);
        alert('Gagal membuat pesanan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormInvalid = !formData.name || !formData.whatsapp || !formData.endDate || !formData.pickup_location || !formData.return_location || totalPrice <= 0;

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!car) return <div className="flex justify-center items-center h-screen">Mobil tidak ditemukan.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-24 pt-32">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 bg-gray-100 flex flex-col justify-between">
              <div>
                <span className="text-indigo-600 font-semibold">Mobil Pilihan Anda</span>
                <h1 className="text-4xl font-bold text-gray-800 mt-2">{car.brand}</h1>
                <h2 className="text-3xl font-light text-gray-700">{car.model}</h2>
                <img src={`http://localhost:8000/storage/${car.image_url}`} alt={car.brand} className="rounded-lg w-full my-6 shadow-lg" />
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-600">Harga per hari</p>
                <p className="text-indigo-600 font-bold text-5xl">Rp {new Intl.NumberFormat('id-ID').format(car.daily_rate)}</p>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Isi Detail Pemesanan</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                      <input type="text" name="name" placeholder="Nama Lengkap *" required onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon /></div>
                      <input type="tel" name="whatsapp" placeholder="Nomor WhatsApp *" required onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp[0]}</p>}
                    </div>
                    <div className="relative md:col-span-2">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MailIcon /></div>
                      <input type="email" name="email" placeholder="Alamat Email (Opsional)" onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Mulai Sewa</label>
                    <input type="date" name="startDate" value={formData.startDate} min={getTodayString()} required onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="time" name="startTime" value={formData.startTime} required onChange={handleInputChange} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date[0]}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Selesai Sewa</label>
                    <input type="date" name="endDate" value={formData.endDate} min={formData.startDate || getTodayString()} required onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="time" name="endTime" value={formData.endTime} readOnly className="mt-2 w-full p-2 border border-gray-200 bg-gray-100 rounded-md" />
                    {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date[0]}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Lokasi Pengambilan</label>
                  <input type="text" name="pickup_location" placeholder="Contoh: Bandara Soekarno Hatta *" required onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  {errors.pickup_location && <p className="text-red-500 text-xs mt-1">{errors.pickup_location[0]}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Lokasi Pengembalian</label>
                  <input type="text" name="return_location" placeholder="Contoh: Stasiun Gambir *" required onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  {errors.return_location && <p className="text-red-500 text-xs mt-1">{errors.return_location[0]}</p>}
                </div>

                <div className="pt-6 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-medium text-gray-700">Total Biaya:</span>
                    <span className="text-3xl font-bold text-indigo-600">Rp {new Intl.NumberFormat('id-ID').format(totalPrice)}</span>
                  </div>
                  <button type="submit" disabled={isSubmitting || isFormInvalid} className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all">
                    {isSubmitting ? 'Memproses...' : 'Lanjutkan ke Pembayaran'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BookingPage;