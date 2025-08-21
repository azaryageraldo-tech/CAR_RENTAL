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
    public function createTransaction(Request $request)
    {
        // ... (method createTransaction Anda tidak berubah)
        $request->validate(['order_id' => 'required|exists:orders,id']);
        
        $order = Order::with('car')->find($request->order_id);

        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $params = [
            'transaction_details' => [
                'order_id' => $order->id . '-' . time(),
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
                'gopay',
                'bca_va',
                'mandiri_va',
            ],
            "snap_theme" => [
                "primary_color" => "#4f46e5",
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
            
            $orderId = explode('-', $orderIdMidtrans)[0];

            $order = Order::with('car')->findOrFail($orderId); // Muat relasi mobil

            // Perbarui status pesanan DAN mobil
            if ($status == 'capture' || $status == 'settlement') {
                // 1. Ubah status pesanan menjadi 'Lunas'
                $order->update(['status' => 'Lunas']);
                
                

            } else if ($status == 'pending') {
                // Tidak melakukan apa-apa
            } else if ($status == 'deny' || $status == 'expire' || $status == 'cancel') {
                $order->update(['status' => 'Batal']);
            }

            return response()->json(['message' => 'Webhook berhasil diproses.']);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
