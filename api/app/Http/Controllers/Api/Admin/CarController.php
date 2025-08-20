<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    public function index()
    {
        return Car::latest()->paginate(10);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'license_plate' => 'required|string|max:255|unique:cars',
            'daily_rate' => 'required|numeric',
            'status' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $imagePath = $request->file('image')->store('cars', 'public');

        $car = Car::create([
            'brand' => $request->brand,
            'model' => $request->model,
            'license_plate' => $request->license_plate,
            'daily_rate' => $request->daily_rate,
            'status' => $request->status,
            'image_url' => $imagePath,
        ]);

        return response()->json($car, 201);
    }

    public function show(Car $car)
    {
        return response()->json($car);
    }
    
    // Perhatikan: Untuk update dengan gambar, kita gunakan method POST
    public function update(Request $request, Car $car)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'license_plate' => 'required|string|max:255|unique:cars,license_plate,' . $car->id,
            'daily_rate' => 'required|numeric',
            'status' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $car->fill($request->except('image'));

        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($car->image_url) {
                Storage::disk('public')->delete($car->image_url);
            }
            // Upload gambar baru
            $car->image_url = $request->file('image')->store('cars', 'public');
        }

        $car->save();

        return response()->json($car);
    }

    public function destroy(Car $car)
    {
        // Hapus gambar dari storage
        if ($car->image_url) {
            Storage::disk('public')->delete($car->image_url);
        }

        $car->delete();
        return response()->json(null, 204);
    }
}