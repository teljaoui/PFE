<?php

use App\Http\Controllers\BackEnd;
use App\Http\Controllers\loginController;
use App\Http\Middleware\Authmidlleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [BackEnd::class , 'Admin'])->middleware(Authmidlleware::class);
Route::get('/product' , [BackEnd::class , 'product']);
Route::get('/product_add', [BackEnd::class , 'product_add']);
Route::get('/product_update/{id}' , [BackEnd::class , 'product_update']);
Route::get('/categories', [BackEnd::class, 'categories']);
Route::get('/categories_add' , [BackEnd::class , 'categories_add']);
Route::get('/fournisseur' , [BackEnd::class , 'fournisseur']);
Route::get('/orders', [BackEnd::class , 'orders']);
Route::get('/orders_confirme' , [BackEnd::class , 'orders_confirme']);
Route::get('/orders_delivered' , [BackEnd::class , 'orders_delivered']);
Route::get('/order_detail/{id}', [BackEnd::class , 'order_detail']);

Route::get('/categorie_update/{id}', [BackEnd::class, 'categorie_update']);
Route::get('/fournisseur_update/{id}', [BackEnd::class, 'fournisseur_update']);
Route::get('/users', [BackEnd::class, 'users']);


/*Ajouter dans base de deonné  */

Route::post('/categories_post', [BackEnd::class , 'categories_post']);
Route::post('/fournisseur_post' , [BackEnd::class , 'fournisseur_post']);
Route::post('/proudct_post' , [BackEnd::class , 'proudct_post']);

/*Supprimer  */
Route::get('/categorie_delete/{id}', [BackEnd::class, 'categorie_delete']);
Route::get('/fournisseur_delete/{id}' , [BackEnd::class , 'fournisseur_delete']);
Route::get('/product_delete/{id}/{categorieid}' , [BackEnd::class , 'product_delete']);
Route::get('/deleteOrder/{id}' , [BackEnd::class , 'deleteOrder']);
Route::get('/publicite/{id}' , [BackEnd::class , 'publicite']);
Route::get('/review_delete/{id}'  , [BackEnd::class , 'review_delete']);

/*update */

Route::post('/categorie_up' , [BackEnd::class , 'categorie_up']);
Route::post('/fournisseur_up', [BackEnd::class, 'fournisseur_up']);
Route::post('/product_up' , [BackEnd::class , 'product_up']);
Route::get('/confirme/{id}' , [BackEnd::class , 'confirme']);
Route::get('/encoure/{id}' , [BackEnd::class , 'encoure']);
Route::get('/delivered/{id}' , [BackEnd::class , 'delivered']);
Route::get('/update_password' , [BackEnd::class , 'update_password']);
Route::post('/password_up' , [BackEnd::class , 'password_up']);
Route::get('/review_update/{id}'  , [BackEnd::class , 'review_update']);
Route::post('/review_up' , [BackEnd::class , 'review_up']);
/*search*/

Route::post('/searchproduct' , [BackEnd::class , 'searchproduct']);
Route::post('/searchordes' , [BackEnd::class , 'searchordes']);
Route::post('/searchuser' , [BackEnd::class , 'searchuser']);


/*login */

Route::get('/login' , [loginController::class , 'login']);
Route::post('/login_post' , [loginController::class , 'login_post']);
Route::get('/logout' , [loginController::class , 'logout']);