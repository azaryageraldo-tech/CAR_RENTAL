<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\CarController;
use App\Http\Controllers\Api\Admin\OrderController;
use App\Http\Controllers\Api\Public\CarController as PublicCarController;
use App\Http\Controllers\Api\Public\OrderController as PublicOrderController;
use App\Http\Controllers\Api\Public\PaymentController;

// --- RUTE PUBLIK (TIDAK PERLU LOGIN) ---

// Otentikasi
Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
    ]);
    return User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);
});

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);
    $user = User::where('email', $credentials['email'])->first();
    if (! $user || ! Hash::check($credentials['password'], $user->password)) {
        throw ValidationException::withMessages(['email' => ['The provided credentials are not correct.']]);
    }
    $user->tokens()->delete();
    $token = $user->createToken('auth-token')->plainTextToken;
    return response()->json(['user' => $user, 'token' => $token]);
});

// Landing Page, Proses Pemesanan, dan Kwitansi
Route::get('/public/cars', [PublicCarController::class, 'index']);
Route::get('/public/cars/{car}', [PublicCarController::class, 'show']);
Route::post('/public/orders', [PublicOrderController::class, 'store']);
Route::post('/public/payment/create-transaction', [PaymentController::class, 'createTransaction']);
Route::get('/public/orders/{order}', [PublicOrderController::class, 'show']);
Route::get('/public/orders/{order}/receipt', [PublicOrderController::class, 'downloadPublicReceipt']);

// Webhook dari Midtrans
Route::post('/midtrans/webhook', [PaymentController::class, 'webhook']);


// --- RUTE YANG MEMERLUKAN OTENTIKASI ---
Route::middleware('auth:sanctum')->group(function () {
    // Info User
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    });

    // Grup untuk Panel Admin
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/reports/export-orders', [DashboardController::class, 'exportOrders']);
        Route::apiResource('cars', CarController::class);
        Route::get('orders', [OrderController::class, 'index']);
        Route::post('orders/{order}/complete', [OrderController::class, 'completeOrder']);
        Route::get('orders/{order}/receipt', [OrderController::class, 'downloadReceipt']);
    });
});