<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('cars', function (Blueprint $table) {
        $table->id();
        $table->string('brand'); // Merek mobil
        $table->string('model'); // Model mobil
        $table->string('license_plate')->unique(); // Plat nomor, harus unik
        $table->decimal('daily_rate', 8, 2); // Harga sewa per hari
        $table->string('image_url')->nullable(); // URL gambar mobil
        $table->timestamps(); // Kolom created_at dan updated_at
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
