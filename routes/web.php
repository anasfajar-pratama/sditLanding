<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicController;

// Landing page - serve React SPA
Route::get('/', [PublicController::class, 'index']);

// Admin login page - serve before auth check
Route::get('/admin/login', function () {
    return view('admin');
});

// Admin panel - all admin routes serve React SPA
Route::middleware('admin.auth')->group(function () {
    Route::get('/admin', function () {
        return view('admin');
    });
    Route::get('/admin/{any}', function () {
        return view('admin');
    })->where('any', '.*');
});
