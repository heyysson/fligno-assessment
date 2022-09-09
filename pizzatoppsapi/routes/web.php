<?php

use Illuminate\Support\Facades\Route;
use App\http\Controllers\PizzaController;


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
