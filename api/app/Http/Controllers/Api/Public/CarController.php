<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        // Hanya ambil mobil dengan status 'Tersedia'
        $cars = Car::where('status', 'Tersedia')->latest()->get();
        return response()->json($cars);
    }

    // TAMBAHKAN METHOD BARU DI BAWAH INI
    public function show(Car $car)
    {
        // Laravel akan otomatis mencari mobil berdasarkan ID dari URL
        // dan mengembalikannya sebagai JSON.
        return response()->json($car);
    }
}