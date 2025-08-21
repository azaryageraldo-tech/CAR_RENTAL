<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Mengambil data statistik untuk ditampilkan di dashboard admin.
     */
    public function index()
    {
        // --- Statistik Utama ---

        // PENTING: Pastikan status 'Tersedia' sama persis (termasuk huruf besar/kecil)
        // dengan yang ada di kolom 'status' pada tabel 'cars' Anda.
        $availableCars = Car::where('status', 'Tersedia')->count();

        // PENTING: Pastikan status 'Selesai' dan 'Batal' sama persis dengan di database.
        // Pesanan aktif adalah semua pesanan yang statusnya BUKAN 'Selesai' atau 'Batal'.
        $activeOrders = Order::whereNotIn('status', ['Selesai', 'Batal'])->count();
        $completedOrders = Order::where('status', 'Selesai')->count();
        
        // --- Laporan Pemasukan ---

        // PERBAIKAN 1: Menghitung pemasukan dari status 'Lunas' ATAU 'Selesai'
        // Ini untuk memastikan transaksi yang sudah selesai tetap terhitung.
        $revenueQueryBase = Order::whereIn('status', ['Lunas', 'Selesai']);

        // PERBAIKAN 2: Menggunakan 'updated_at' sebagai acuan tanggal pembayaran.
        // Ini lebih akurat daripada 'created_at', karena diasumsikan status diubah saat pembayaran.
        // Jika Anda punya kolom 'tanggal_pembayaran', ganti 'updated_at' dengan kolom tersebut.
        $dailyRevenue = (clone $revenueQueryBase)->whereDate('updated_at', Carbon::today())->sum('total_price');
        $monthlyRevenue = (clone $revenueQueryBase)->whereMonth('updated_at', Carbon::now()->month)
                                                    ->whereYear('updated_at', Carbon::now()->year)
                                                    ->sum('total_price');

        // --- Grafik Mobil Terlaris (Top 5) ---
        $popularCars = Order::select(
                'cars.brand', 
                'cars.model', 
                DB::raw('count(orders.car_id) as total_orders')
            )
            ->join('cars', 'orders.car_id', '=', 'cars.id')
            ->whereIn('orders.status', ['Lunas', 'Selesai'])
            ->groupBy('orders.car_id', 'cars.brand', 'cars.model')
            ->orderBy('total_orders', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($car) {
                return [
                    'label' => $car->brand . ' ' . $car->model,
                    'total' => $car->total_orders,
                ];
            });

        // Mengirim semua data dalam format JSON ke frontend
        return response()->json([
            'stats' => [
                'available_cars' => $availableCars,
                'active_orders' => $activeOrders,
                'completed_orders' => $completedOrders,
            ],
            'revenue' => [
                'daily' => (float) $dailyRevenue, // Konversi ke float untuk konsistensi
                'monthly' => (float) $monthlyRevenue,
            ],
            'popular_cars' => $popularCars,
        ]);
    }

    /**
     * Mengirimkan data pesanan untuk diekspor sebagai CSV di frontend.
     */
    public function exportOrders()
    {
        // Disarankan untuk memilih kolom tertentu agar tidak mengirim data berlebih
        $orders = Order::with('user:id,name', 'car:id,brand,model')
            ->whereIn('status', ['Lunas', 'Selesai'])
            ->latest()
            ->get([
                'id', 
                'user_id', 
                'car_id', 
                'start_date', 
                'end_date', 
                'total_price', 
                'status', 
                'created_at'
            ]);
            
        return response()->json($orders);
    }
}