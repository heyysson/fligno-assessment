<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PizzaController;
use App\Http\Controllers\API\AuthController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
// Route::get('send', [AuthController::class, 'sendNotification']);

// Pizza
Route::post('store-pizza', [PizzaController::class, 'store']);
Route::get('view-pizza', [PizzaController::class, 'index']);
Route::get('edit-pizza/{id}', [PizzaController::class, 'edit']);
Route::post('update-pizza/{id}', [PizzaController::class, 'update']);
Route::delete('delete-pizza/{id}', [PizzaController::class, 'destroy']);

Route::middleware(['auth:sanctum', 'isAPIAdmin']) -> group(function () {

    Route::get('checkingAuthenticated' , function () {
        return response() -> json([
            'status' => 200,
            'message' => "Welcome Admin"], 200);
    });

    
});

Route::middleware(['auth:sanctum']) -> group(function () {

    Route::get('send', [AuthController::class, 'sendNotification']);

    Route::post('logout', [AuthController::class, 'logout']);
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
