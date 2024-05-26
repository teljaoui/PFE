<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_detail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function createUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'name' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed',
                'phone' => 'required'
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => $request->password,
                'phone' => $request->phone,
            ]);

            $token = $user->createToken('API TOKEN')->plainTextToken;

            Auth::login($user);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $token
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email or password is incorrect'
                ], 401);
            }

            $user = Auth::user();

            $token = $user->createToken('API TOKEN')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $token
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function userInfo(Request $request)
    {
        try {
            $user = Auth::user();
            return response()->json([
                'status' => true,
                'user' => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function getUserOrders(Request $request, $userId)
    {
        try {
            $orders = Order::where('user_id', $userId)->with('orderDetails')->get();
            return response()->json([
                'status' => true,
                'orders' => $orders
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = Auth::user();
        $user->password = $request->password;
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }


}
