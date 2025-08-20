<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Menghitung jumlah mobil dari database
        $availableCars = Car::where('status', 1)->count(); // Asumsi status 1 = tersedia

        // Data dummy untuk pesanan dan pendapatan (akan kita ganti nanti)
        $activeOrders = 5;
        $completedOrders = 28;
        $totalRevenue = 7550000;

        return response()->json([
            'available_cars' => $availableCars,
            'active_orders' => $activeOrders,
            'completed_orders' => $completedOrders,
            'total_revenue' => $totalRevenue,
        ]);
    }
}