<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicApiController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\StatController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\FacilityController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\AdminManagementController;
use App\Http\Controllers\Admin\ActivityLogController;

// Public API endpoints (no auth)
Route::prefix('public')->group(function () {
    Route::get('/all', [PublicApiController::class, 'all']);
    Route::get('/settings', [PublicApiController::class, 'settings']);
    Route::get('/hero', [PublicApiController::class, 'hero']);
    Route::get('/stats', [PublicApiController::class, 'stats']);
    Route::get('/about', [PublicApiController::class, 'about']);
    Route::get('/programs', [PublicApiController::class, 'programs']);
    Route::get('/teachers', [PublicApiController::class, 'teachers']);
    Route::get('/facilities', [PublicApiController::class, 'facilities']);
    Route::get('/testimonials', [PublicApiController::class, 'testimonials']);
    Route::get('/contact', [PublicApiController::class, 'contact']);
    Route::get('/gallery', [PublicApiController::class, 'gallery']);
});

// Admin auth (no middleware)
Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Admin protected routes
Route::prefix('admin')->middleware('admin.auth')->group(function () {
    // Settings — accept POST (with or without _method=PUT) and PUT
    Route::get('/settings', [SettingController::class, 'index']);
    Route::match(['post', 'put'], '/settings', [SettingController::class, 'update']);

    // Hero
    Route::get('/hero', [HeroController::class, 'index']);
    Route::match(['post', 'put'], '/hero', [HeroController::class, 'update']);

    // Stats
    Route::get('/stats', [StatController::class, 'index']);
    Route::post('/stats', [StatController::class, 'store']);
    Route::match(['post', 'put'], '/stats/{id}', [StatController::class, 'update']);
    Route::delete('/stats/{id}', [StatController::class, 'destroy']);

    // About
    Route::get('/about', [AboutController::class, 'index']);
    Route::match(['post', 'put'], '/about', [AboutController::class, 'update']);
    Route::post('/about/images', [AboutController::class, 'uploadImage']);
    Route::delete('/about/images/{id}', [AboutController::class, 'deleteImage']);

    // Programs
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::post('/programs', [ProgramController::class, 'store']);
    Route::match(['post', 'put'], '/programs/{id}', [ProgramController::class, 'update']);
    Route::delete('/programs/{id}', [ProgramController::class, 'destroy']);

    // Teachers
    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::post('/teachers', [TeacherController::class, 'store']);
    Route::match(['post', 'put'], '/teachers/{id}', [TeacherController::class, 'update']);
    Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);

    // Facilities (eskul/kegiatan)
    Route::get('/facilities', [FacilityController::class, 'index']);
    Route::post('/facilities', [FacilityController::class, 'store']);
    Route::match(['post', 'put'], '/facilities/{id}', [FacilityController::class, 'update']);
    Route::delete('/facilities/{id}', [FacilityController::class, 'destroy']);

    // Testimonials
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::match(['post', 'put'], '/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

    // Contact
    Route::get('/contact', [ContactController::class, 'index']);
    Route::match(['post', 'put'], '/contact', [ContactController::class, 'update']);

    // Gallery
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::match(['post', 'put'], '/gallery/{id}', [GalleryController::class, 'update']);
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);
    Route::match(['post', 'put'], '/gallery/{id}/toggle', [GalleryController::class, 'toggle']);

    // Admin management
    Route::get('/admins', [AdminManagementController::class, 'index']);
    Route::post('/admins', [AdminManagementController::class, 'store']);
    Route::post('/admins/{id}/suspend', [AdminManagementController::class, 'suspend']);
    Route::post('/admins/{id}/unsuspend', [AdminManagementController::class, 'unsuspend']);
    Route::post('/admins/{id}/delete', [AdminManagementController::class, 'destroy']);

    // Activity logs
    Route::get('/activity-logs', [ActivityLogController::class, 'index']);
});
