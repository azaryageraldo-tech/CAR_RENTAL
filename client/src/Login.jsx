import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './context/AuthContext'; // Impor hook useAuth
import authImage from './assets/mobil-rental.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Ambil fungsi login dari context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password); // Panggil fungsi login dari context
    } catch (err) {
      setError("Login gagal. Email atau password salah.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
      <div className="flex w-full max-w-5xl m-4 overflow-hidden bg-white rounded-2xl shadow-2xl sm:m-8">
        <div className="w-full p-8 sm:p-12 md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Selamat Datang Kembali
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Silakan login untuk melanjutkan
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="email">
                Alamat Email
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-40"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-40"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-center text-red-600">{error}</p>}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-3 font-bold tracking-wide text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg hover:from-indigo-600 hover:to-blue-600 hover:scale-105 focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-8 text-sm font-light text-center text-gray-500">
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-800">
              Register di sini
            </Link>
          </p>
        </div>
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${authImage})` }}
        >
        </div>
      </div>
    </div>
  );
}

export default Login;