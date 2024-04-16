<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(TaskController::class)->name('task.')->group(function () {
    Route::get('task', 'api_index')->name('api_index');
    Route::post('task', 'store')->name('store');;
    Route::put('task/{task}', 'update')->name('update');
    Route::delete('task/{task}', 'destroy')->name('destroy');
});
