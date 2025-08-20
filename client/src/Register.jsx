import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import authImage from './assets/mobil-rental.jpg'; // Pastikan gambar ini ada di folder src/assets

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirmation) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login'); // Arahkan ke halaman login setelah berhasil
    } catch (err) {
      setError("Registrasi gagal. Email mungkin sudah terdaftar.");
      console.error('Error registrasi:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
      <div className="flex w-full max-w-5xl m-4 overflow-hidden bg-white rounded-2xl shadow-2xl sm:m-8">
        {/* Kolom Form */}
        <div className="w-full p-8 sm:p-12 md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Buat Akun Baru
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Hanya butuh beberapa detik
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="name">Nama Lengkap</label>
              <input className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-40" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="email">Alamat Email</label>
              <input className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-40" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
              <input className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-40" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password-confirm">Konfirmasi Password</label>
              <input className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-40" id="password-confirm" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-center text-red-600">{error}</p>}
            <div className="mt-8">
              <button type="submit" className="w-full px-4 py-3 font-bold tracking-wide text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg hover:from-indigo-600 hover:to-blue-600 hover:scale-105 focus:outline-none focus:shadow-outline">
                Register
              </button>
            </div>
          </form>
          <p className="mt-8 text-sm font-light text-center text-gray-500">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-800">
              Login di sini
            </Link>
          </p>
        </div>

        {/* Kolom Gambar */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${authImage})` }}
        >
        </div>
      </div>
    </div>
  );
}

export default Register;