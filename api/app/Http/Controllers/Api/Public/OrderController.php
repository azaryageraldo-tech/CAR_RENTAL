<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use PDF; // <-- TAMBAHKAN BARIS INI

class OrderController extends Controller
{
    /**
     * Menyimpan pesanan baru dari pelanggan.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'car_id' => 'required|exists:cars,id',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'required|string|min:10|max:15',
            'start_date' => 'required|date_format:Y-m-d H:i',
            'end_date' => 'required|date_format:Y-m-d H:i|after_or_equal:start_date',
            'pickup_location' => 'required|string|max:255',
            'return_location' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $car = Car::find($request->car_id);
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);
        
        $days = $startDate->diffInDays($endDate) + 1;
        $totalPrice = $days * $car->daily_rate;

        $order = Order::create([
            'car_id' => $request->car_id,
            'customer_name' => $request->name,
            'customer_email' => $request->email,
            'customer_whatsapp' => $request->whatsapp,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'pickup_location' => $request->pickup_location,
            'return_location' => $request->return_location,
            'total_price' => $totalPrice,
            'status' => 'Menunggu Pembayaran',
        ]);

        return response()->json($order, 201);
    }

    /**
     * Menampilkan detail pesanan spesifik untuk halaman sukses.
     */
    public function show(Order $order)
    {
        return $order->load('car');
    }

    /**
     * Mengunduh kwitansi PDF untuk pelanggan.
     */
    public function downloadPublicReceipt(Order $order)
    {
        if ($order->status !== 'Lunas') {
            return response()->json(['error' => 'Kwitansi hanya tersedia untuk pesanan yang lunas.'], 403);
        }

        $pdf = PDF::loadView('receipt', ['order' => $order]);
        return $pdf->download('kwitansi-carrental-' . $order->id . '.pdf');
    }
}