<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Product;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index(){
        $categorie = Categorie::all();
        $product = Product::with('categorie')->get();
        return response()->json($product);
    }
    public function categories(){
        $categorie = Categorie::all();
        return response()->json($categorie);
    }
}
