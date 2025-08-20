<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        Car::create([
            'brand' => 'Toyota',
            'model' => 'Avanza',
            'license_plate' => 'B 1234 ABC',
            'daily_rate' => 300000,
            'image_url' => 'cars/toyota-avanza.jpg', // <-- DIUBAH
            'status' => 'Tersedia',
        ]);

        Car::create([
            'brand' => 'Daihatsu',
            'model' => 'Xenia',
            'license_plate' => 'B 5678 DEF',
            'daily_rate' => 300000,
            'image_url' => 'cars/toyota-avanza.jpg', // <-- DIUBAH (gunakan gambar yang sama untuk contoh)
            'status' => 'Tersedia',
        ]);
        
        Car::create([
            'brand' => 'Honda',
            'model' => 'Brio',
            'license_plate' => 'B 9101 GHI',
            'daily_rate' => 250000,
            'image_url' => 'cars/toyota-avanza.jpg', // <-- DIUBAH (gunakan gambar yang sama untuk contoh)
            'status' => 'Tersedia',
        ]);
    }
}