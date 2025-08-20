<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        // Ambil pesanan dan data mobil terkait menggunakan 'with'
        $orders = Order::with('car')->latest()->paginate(10);
        return response()->json($orders);
    }
}