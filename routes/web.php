<?php

use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use App\Http\Controllers\Auth\Logut;
use App\Http\Controllers\Auth\SignUp;
use App\Http\Controllers\HirfiController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HirfiController::class, 'index'])->name('home');
// Route::inertia()

// Route::controller(HirfiController::class)->group(function () {
//     Route::get('/orders/{id}', 'show');
//     Route::post('/orders', 'store');
// });

Route::get('/sign-up', fn() => Inertia::render('SignUp', [
    'categories' => Category::query()
        ->orderBy('category_name')
        ->get(['category_id', 'category_name'])
]))
    ->name('sign-up');
/**
     * `name()`: Named routes allow the convenient generation of URLs
     *  or redirects for specific routes. You may specify a
     *  name for a route by chaining the name method onto the
     *  route definition. See: https://laravel.com/framework/docs/routing#named-routes
*/
Route::post('/sign-up', SignUp::class);

Route::get('/login', fn() => Inertia::render('Login'))
    ->name('login');

Route::post('/login', Login::class);

Route::post('/logout', Logout::class)->name('logout');