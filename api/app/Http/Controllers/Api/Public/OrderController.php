<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class OrderController extends Controller
{
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
        
        // Logika perhitungan hari yang benar (termasuk hari pertama)
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
}