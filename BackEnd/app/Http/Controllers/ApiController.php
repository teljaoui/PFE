<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index()
    {
        $categorie = Categorie::all();
        $review = Review::all();
        $product = Product::with(['categorie', 'reviews'])->get();
        return response()->json($product);
    }
    public function categories()
    {
        $categorie = Categorie::all();
        return response()->json($categorie);
    }
    public function store(Request $request)
    {
        try {
            $request->validate([
                'city' => 'required|string',
                'adress' => 'required|string',
                'suiteAderess' => 'required|string',
                'total' => 'required|numeric',
                'dateCm' => 'required|date',
                'user_id' => 'required|integer',
                'carts' => 'required|array'
            ]);

            $order = Order::create([
                'city' => $request->city,
                'adress' => $request->adress,
                'suiteAderess' => $request->suiteAderess,
                'total' => $request->total,
                'statue' => 0,
                'dateCm' => $request->dateCm,
                'user_id' => $request->user_id
            ]);

            foreach ($request->carts as $cart) {
                Order_detail::create([
                    'productImage' => $cart['ProductImage'],
                    'quantitieCm' => $cart['ProductQuantity'],
                    'price' => $cart['ProductPrice'],
                    'order_id' => $order->id
                ]);
            }

            return response()->json(['message' => 'Order created successfully'], 201);
        } catch (\Exception $e) {
            \Log::error('Error creating order: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
    }
    public function storeReview(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required',
                'review' => 'required',
                'content' => 'required',
                'product_id' => 'required'
            ]);
            Review::create(
                [
                    'email' => $request->email,
                    'review' => $request->review,
                    'content' => $request->content,
                    'product_id' => $request->product_id
                ]
            );
            return response()->json(['message' => 'Review created successfully'], 201);
        } catch (\Exception $e) {
            \Log::error('Error creating Review: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
    }
}
