<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdinateurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('ordinateurs', OrdinateurController::class);
Route::apiResource('categories', CategoryController::class);




/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); */


