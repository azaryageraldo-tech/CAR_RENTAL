<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class CarController extends Controller
{
    public function index()
    {
        $carsPaginator = Car::latest()->paginate(10);
        $today = Carbon::today()->startOfDay();

        // Tambahkan properti 'available_stock' ke setiap mobil dalam koleksi paginasi
        $carsPaginator->getCollection()->transform(function ($car) use ($today) {
            // Hitung semua pesanan yang aktif hari ini atau di masa depan
            $rentedCount = Order::where('car_id', $car->id)
                ->where('end_date', '>=', $today) // Cek semua pesanan yang belum selesai
                ->whereIn('status', ['Lunas']) // Hanya hitung pesanan yang sudah lunas
                ->count();
            
            $car->available_stock = $car->stock - $rentedCount;
            return $car;
        });

        return $carsPaginator;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'daily_rate' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagePath = $request->file('image')->store('cars', 'public');

        $car = Car::create([
            'brand' => $request->brand,
            'model' => $request->model,
            'daily_rate' => $request->daily_rate,
            'stock' => $request->stock,
            'image_url' => $imagePath,
        ]);

        return response()->json($car, 201);
    }

    public function show(Car $car)
    {
        return response()->json($car);
    }
    
    public function update(Request $request, Car $car)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'daily_rate' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $car->fill($request->except('image'));

        if ($request->hasFile('image')) {
            if ($car->image_url) {
                Storage::disk('public')->delete($car->image_url);
            }
            $car->image_url = $request->file('image')->store('cars', 'public');
        }

        $car->save();

        return response()->json($car);
    }

    public function destroy(Car $car)
    {
        if ($car->image_url) {
            Storage::disk('public')->delete($car->image_url);
        }

        $car->delete();
        return response()->json(null, 204);
    }
}
