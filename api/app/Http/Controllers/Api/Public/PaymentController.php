<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;
use Exception;

class PaymentController extends Controller
{
    /**
     * Membuat transaksi baru di Midtrans dan mendapatkan token pembayaran.
     */
    public function createTransaction(Request $request)
    {
        $request->validate(['order_id' => 'required|exists:orders,id']);
        
        $order = Order::with('car')->find($request->order_id);

        // Set konfigurasi Midtrans dari file config/services.php
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // Siapkan parameter untuk Midtrans
        $params = [
            'transaction_details' => [
                'order_id' => $order->id . '-' . time(), // Buat ID pesanan unik untuk Midtrans
                'gross_amount' => $order->total_price,
            ],
            'customer_details' => [
                'first_name' => $order->customer_name,
                'email' => $order->customer_email,
                'phone' => $order->customer_whatsapp,
            ],
            'item_details' => [[
                'id' => $order->car->id,
                'price' => $order->total_price,
                'quantity' => 1,
                'name' => 'Sewa ' . $order->car->brand . ' ' . $order->car->model,
            ]],
            'enabled_payments' => [
                'gopay',         // Untuk QRIS
                'bca_va',        // Virtual Account BCA
                'mandiri_va',    // Virtual Account Mandiri
            ],
            "snap_theme" => [
                "primary_color" => "#4f46e5", // Warna Indigo
                "button_text_color" => "#ffffff"
            ]
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            return response()->json(['token' => $snapToken]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Menerima notifikasi dari Midtrans (Webhook Handler).
     */
    public function webhook(Request $request)
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');

        try {
            $notification = new Notification();
            
            $status = $notification->transaction_status;
            $orderIdMidtrans = $notification->order_id;
            
            // Ambil ID pesanan asli dari order_id Midtrans
            $orderId = explode('-', $orderIdMidtrans)[0];

            $order = Order::findOrFail($orderId);

            // Perbarui status pesanan berdasarkan notifikasi Midtrans
            if ($status == 'capture' || $status == 'settlement') {
                $order->update(['status' => 'Lunas']);
            } else if ($status == 'pending') {
                // Tidak melakukan apa-apa, status tetap "Menunggu Pembayaran"
            } else if ($status == 'deny' || $status == 'expire' || $status == 'cancel') {
                $order->update(['status' => 'Batal']);
            }

            return response()->json(['message' => 'Webhook berhasil diproses.']);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}