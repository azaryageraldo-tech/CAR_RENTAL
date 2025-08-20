<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Car;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $cars = Car::all();

        if ($cars->isEmpty()) {
            $this->command->info('Tidak ada data mobil. Silakan jalankan CarSeeder terlebih dahulu.');
            return;
        }

        $locations = ['Kantor Pusat', 'Bandara', 'Stasiun Kereta'];

        for ($i = 0; $i < 15; $i++) {
            $car = $cars->random();
            $startDate = $faker->dateTimeBetween('-1 month', '+1 week');
            $days = rand(1, 7);
            $endDate = (clone $startDate)->modify("+$days days");

            Order::create([
                'car_id' => $car->id,
                'customer_name' => $faker->name,
                'customer_email' => $faker->email,
                'customer_whatsapp' => $faker->phoneNumber, // <-- TAMBAHKAN INI
                'start_date' => $startDate,
                'end_date' => $endDate,
                'total_price' => $car->daily_rate * $days,
                'pickup_location' => $faker->randomElement($locations),
                'return_location' => $faker->randomElement($locations),
                'status' => $faker->randomElement(['Lunas', 'Selesai', 'Batal', 'Menunggu Pembayaran']),
            ]);
        }
    }
}