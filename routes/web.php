<?php

use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use App\Http\Controllers\Auth\SignUp;
use App\Http\Controllers\HirfiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceRequestController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HirfiController::class, 'index'])->name('home')->middleware('auth');
Route::get('/providers/{provider}', [HirfiController::class, 'show'])->name('hirfi.show');

Route::get('/requests', [ServiceRequestController::class, 'index'])->middleware('auth');
Route::post('/requests', [ServiceRequestController::class, 'store'])->name('ServiceRequest.store')->middleware('auth');

Route::get('/reports', [ReportController::class, 'index'])->middleware('auth');
Route::post('/reports', [ReportController::class, 'store'])->name('ReportController.store')->middleware('auth');

Route::get('/reviews', [ReviewController::class, 'index'])->middleware('auth');
Route::post('/reviews', [ReviewController::class, 'store'])->name('ReviewController.store')->middleware('auth');

Route::get('/profile', [ProfileController::class, 'index'])->middleware('auth');
// Route::inertia()

// Route::controller(HirfiController::class)->group(function () {
//     Route::get('/orders/{id}', 'show');
//     Route::post('/orders', 'store');
// });

Route::get('/sign-up', fn () => Inertia::render('SignUp', [
    'categories' => Category::query()
        ->orderBy('category_name')
        ->get(['category_id', 'category_name']),
]))
    ->name('sign-up');
/**
 * `name()`: Named routes allow the convenient generation of URLs
 *  or redirects for specific routes. You may specify a
 *  name for a route by chaining the name method onto the
 *  route definition. See: https://laravel.com/framework/docs/routing#named-routes
 */
Route::post('/sign-up', SignUp::class);

Route::get('/login', fn () => Inertia::render('Login'))
    ->name('login');

Route::post('/login', Login::class);

Route::post('/logout', Logout::class)->name('logout')->middleware('auth');
