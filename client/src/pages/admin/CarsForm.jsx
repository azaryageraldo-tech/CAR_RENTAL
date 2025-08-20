import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// --- Komponen Ikon ---
const UploadIcon = () => <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;
// --------------------

function CarForm() {
  const [carData, setCarData] = React.useState({
    brand: '', model: '', license_plate: '', daily_rate: '', status: 'Tersedia',
  });
  const [image, setImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`/api/admin/cars/${id}`)
        .then(response => {
          setCarData(response.data);
          setImagePreview(`http://localhost:8000/storage/${response.data.image_url}`);
        })
        .catch(error => console.error("Gagal mengambil data mobil:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    Object.keys(carData).forEach(key => formData.append(key, carData[key]));
    if (image) {
      formData.append('image', image);
    }
    if (id) {
      formData.append('_method', 'PUT');
    }

    const url = id ? `/api/admin/cars/${id}` : '/api/admin/cars';
    
    try {
      await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/admin/cars');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Terjadi kesalahan:', error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && id) return <div>Memuat data mobil...</div>;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        {id ? 'Edit Mobil' : 'Tambah Mobil Baru'}
      </h2>
      <p className="text-sm text-gray-500 mb-6">Isi semua detail mobil di bawah ini.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Merek</label>
              <input type="text" name="brand" id="brand" value={carData.brand} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors?.brand && <p className="text-red-500 text-xs mt-1">{errors.brand[0]}</p>}
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
              <input type="text" name="model" id="model" value={carData.model} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors?.model && <p className="text-red-500 text-xs mt-1">{errors.model[0]}</p>}
            </div>
            <div>
              <label htmlFor="license_plate" className="block text-sm font-medium text-gray-700">Plat Nomor</label>
              <input type="text" name="license_plate" id="license_plate" value={carData.license_plate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {errors?.license_plate && <p className="text-red-500 text-xs mt-1">{errors.license_plate[0]}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="daily_rate" className="block text-sm font-medium text-gray-700">Harga/Hari</label>
                <input type="number" name="daily_rate" id="daily_rate" value={carData.daily_rate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                {errors?.daily_rate && <p className="text-red-500 text-xs mt-1">{errors.daily_rate[0]}</p>}
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" id="status" value={carData.status} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Tersedia</option>
                  <option>Disewa</option>
                  <option>Perawatan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto Mobil</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview Mobil" className="mx-auto h-40 w-auto object-contain rounded-md" />
                ) : (
                  <>
                    <UploadIcon />
                    <p className="text-sm text-gray-600">Pilih file untuk diupload</p>
                  </>
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload sebuah file</span>
                    <input id="file-upload" name="image" type="file" onChange={handleImageChange} className="sr-only" />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 2MB</p>
              </div>
            </div>
            {errors?.image && <p className="text-red-500 text-xs mt-1">{errors.image[0]}</p>}
          </div>
        </div>

        <div className="pt-5 border-t border-gray-200">
          <div className="flex justify-end">
            <button type="button" onClick={() => navigate('/admin/cars')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Batal</button>
            <button type="submit" disabled={loading} className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CarForm;