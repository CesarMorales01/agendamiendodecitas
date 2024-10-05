<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistroController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [SessionController::class, 'index'])->name('home');
Route::post('/calendar/registrarcita', [SessionController::class, 'store']);
Route::get('/miscitas/{mensaje?}', [SessionController::class, 'mostrarCitasUsuario'])->name('calendar.citasusuario');
Route::resource('/calendar', SessionController::class);
Route::resource('/registro', RegistroController::class);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
