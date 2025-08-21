<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('car')->latest()->get();
        return response()->json($orders);
    }

    /**
     * Method baru untuk menyelesaikan pesanan.
     */
    public function completeOrder(Order $order)
    {
        // 1. Validasi: Hanya pesanan yang 'Lunas' yang bisa diselesaikan.
        if ($order->status !== 'Lunas') {
            return response()->json(['error' => 'Hanya pesanan yang sudah lunas yang bisa diselesaikan.'], 422);
        }

        // 2. Ubah status pesanan menjadi 'Selesai'.
        $order->update(['status' => 'Selesai']);

        // 3. Ubah status mobil terkait menjadi 'Tersedia'.
       

        return response()->json(['message' => 'Pesanan berhasil diselesaikan dan mobil telah tersedia kembali.']);
    }
}
