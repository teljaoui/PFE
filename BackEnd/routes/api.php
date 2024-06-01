<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/productlist' , [ApiController::class , 'index']);
Route::get('/categorielist' , [ApiController::class , 'categories']);
Route::post('/register', [AuthController::class,'createUser']);
Route::post('/login', [AuthController::class,'loginUser']);
Route::get('/dashboard', [AuthController::class, 'userInfo'])->middleware('auth:sanctum');
Route::get('/user/{userId}/orders', [AuthController::class, 'getUserOrders']);
Route::middleware('auth:sanctum')->put('/user/password', [AuthController::class, 'updatePassword']);
Route::post('/orders', [ApiController::class, 'store']);
Route::post('/storeReview' , [ApiController::class , 'storeReview']);
