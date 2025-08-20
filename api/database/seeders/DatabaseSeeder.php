<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Panggil CarSeeder terlebih dahulu
        $this->call(CarSeeder::class); 

        // Baru panggil OrderSeeder
        $this->call(OrderSeeder::class);
    }
}