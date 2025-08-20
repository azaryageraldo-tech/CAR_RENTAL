<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'car_id',
        'customer_name',
        'customer_email',
        'customer_whatsapp',
        'start_date',
        'end_date',
        'total_price',
        'pickup_location',
        'return_location',
        'status',
    ];

    /**
     * Tentukan bahwa tipe data start_date dan end_date adalah datetime.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    /**
     * Mendapatkan data mobil yang berelasi dengan pesanan.
     */
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}