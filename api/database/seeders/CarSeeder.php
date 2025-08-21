<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
  // Di dalam CarSeeder.php
public function run(): void
{
    Car::create([
        'brand' => 'Toyota', 'model' => 'Avanza', 'daily_rate' => 300000,
        'stock' => 5, 'image_url' => 'cars/toyota-avanza.jpg',
    ]);
    Car::create([
        'brand' => 'Daihatsu', 'model' => 'Xenia', 'daily_rate' => 300000,
        'stock' => 3, 'image_url' => 'cars/toyota-avanza.jpg',
    ]);
    Car::create([
        'brand' => 'Honda', 'model' => 'Brio', 'daily_rate' => 250000,
        'stock' => 7, 'image_url' => 'cars/toyota-avanza.jpg',
    ]);
}
}