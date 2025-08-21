import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// --- Ikon ---
const UploadIcon = () => <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;

// --- Komponen Input ---
const FormInput = ({ label, id, error, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input 
            id={id}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error[0]}</p>}
    </div>
);


function CarForm() {
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    daily_rate: '',
    stock: 1,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`/api/admin/cars/${id}`)
        .then(response => {
          setCarData(response.data);
          if (response.data.image_url) {
            setImagePreview(`http://localhost:8000/storage/${response.data.image_url}`);
          }
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
    formData.append('brand', carData.brand);
    formData.append('model', carData.model);
    formData.append('daily_rate', carData.daily_rate);
    formData.append('stock', carData.stock);
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
        setErrors(error.response.data.errors || {});
      } else {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan saat menyimpan data.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && id) return <div className="text-center p-10">Memuat data mobil...</div>;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {id ? 'Edit Mobil' : 'Tambah Mobil Baru'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Isi semua detail mobil di bawah ini.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri: Detail Teks */}
          <div className="space-y-5">
            <FormInput 
              label="Merek" 
              id="brand" 
              name="brand" 
              type="text" 
              value={carData.brand} 
              onChange={handleInputChange} 
              error={errors?.brand}
            />
            <FormInput 
              label="Model" 
              id="model" 
              name="model" 
              type="text" 
              value={carData.model} 
              onChange={handleInputChange} 
              error={errors?.model}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormInput 
                label="Harga/Hari" 
                id="daily_rate" 
                name="daily_rate" 
                type="number" 
                value={carData.daily_rate} 
                onChange={handleInputChange} 
                error={errors?.daily_rate}
              />
              <FormInput 
                label="Jumlah Unit" 
                id="stock" 
                name="stock" 
                type="number" 
                value={carData.stock} 
                onChange={handleInputChange} 
                error={errors?.stock}
              />
            </div>
          </div>

          {/* Kolom Kanan: Upload Gambar */}
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

        {/* Tombol Aksi */}
        <div className="pt-5 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={() => navigate('/admin/cars')} 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default CarForm;
