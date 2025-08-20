import React from 'react'; // Pastikan baris ini benar
import { Link } from 'react-router-dom';
import axios from 'axios';

// --- Komponen Ikon ---
const PlusIcon = () => <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const EditIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const DeleteIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
// --------------------

function CarsIndex() {
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/cars');
      setCars(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data mobil:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mobil ini?')) {
      try {
        await axios.delete(`/api/admin/cars/${id}`);
        fetchCars();
      } catch (error) {
        console.error("Gagal menghapus mobil:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Mobil</h2>
            <p className="text-sm text-gray-500 mt-1">Daftar semua mobil yang terdaftar di sistem.</p>
        </div>
        <Link 
          to="/admin/cars/create" 
          className="flex items-center mt-4 sm:mt-0 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg hover:from-indigo-600 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 transition-transform transform hover:scale-105 shadow-md"
        >
          <PlusIcon />
          Tambah Mobil
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merek & Model</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plat Nomor</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga/Hari</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.length > 0 ? cars.map(car => (
              <tr key={car.id} className="hover:bg-indigo-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`http://localhost:8000/storage/${car.image_url}`} alt={`${car.brand} ${car.model}`} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{car.brand}</div>
                  <div className="text-sm text-gray-500">{car.model}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{car.license_plate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Rp {new Intl.NumberFormat('id-ID').format(car.daily_rate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    car.status === 'Tersedia' ? 'bg-green-100 text-green-800' : 
                    car.status === 'Disewa' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {car.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <Link to={`/admin/cars/edit/${car.id}`} className="text-indigo-600 hover:text-indigo-900" title="Edit">
                      <EditIcon />
                    </Link>
                    <button onClick={() => deleteCar(car.id)} className="text-red-600 hover:text-red-900" title="Hapus">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  Tidak ada data mobil. Silakan tambahkan mobil baru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CarsIndex;