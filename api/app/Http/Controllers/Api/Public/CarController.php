<?php
namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Order;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();
        $today = Carbon::today()->startOfDay();

        // Tambahkan properti baru 'available_stock' ke setiap mobil
        $carsWithStock = $cars->map(function ($car) use ($today) {
            // Hitung semua pesanan yang aktif hari ini atau di masa depan
            $rentedCount = Order::where('car_id', $car->id)
                ->where('end_date', '>=', $today) // Cek semua pesanan yang belum selesai
                ->whereIn('status', ['Lunas']) // Hanya hitung pesanan yang sudah lunas
                ->count();
            
            $car->available_stock = $car->stock - $rentedCount;
            return $car;
        });

        // Hanya tampilkan mobil yang stoknya masih tersedia
        return response()->json($carsWithStock->where('available_stock', '>', 0)->values());
    }

    public function show(Car $car)
    {
        return response()->json($car);
    }
}
