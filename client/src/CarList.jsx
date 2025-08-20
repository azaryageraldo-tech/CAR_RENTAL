import { useState, useEffect } from 'react';
import axios from 'axios';
// Anda bisa menambahkan file CSS khusus untuk ini nanti
// import './CarList.css'; 

function CarList() {
  // 'useState' untuk menyimpan daftar mobil
  const [cars, setCars] = useState([]);
  // 'useState' untuk status loading
  const [loading, setLoading] = useState(true);

  // 'useEffect' untuk mengambil data dari API saat komponen pertama kali dirender
  useEffect(() => {
    // Alamat API Laravel kita
    const apiUrl = '/api/cars';
    
    axios.get(apiUrl)
      .then(response => {
        setCars(response.data); // Simpan data dari API ke state 'cars'
        setLoading(false); // Set loading menjadi false setelah data didapat
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setLoading(false); // Set loading menjadi false jika terjadi error
      });
  }, []); // Array kosong berarti efek ini hanya berjalan sekali

  // Tampilan jika masih loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Tampilan utama
  return (
    <div>
      <h1>Daftar Mobil Tersedia</h1>
      <div className="car-list">
        {cars.map(car => (
          <div key={car.id} className="car-card" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h2>{car.brand} {car.model}</h2>
            <p>Plat Nomor: {car.license_plate}</p>
            <p>Harga per hari: Rp {Number(car.daily_rate).toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;