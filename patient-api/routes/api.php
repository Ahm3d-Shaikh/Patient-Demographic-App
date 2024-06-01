<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('cors') -> group(function() {
    Route::get('patients', [PatientController::class, 'index']);
    Route::post('patients', [PatientController::class, 'store']);
    Route::get('patients/{id}', [PatientController::class, 'show']);
    Route::put('patients/{id}', [PatientController::class, 'update']);
    Route::delete('patients/{id}', [PatientController::class, 'destroy']);

});
