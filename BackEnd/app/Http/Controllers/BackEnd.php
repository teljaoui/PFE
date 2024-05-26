<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Fournisseur;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BackEnd extends Controller
{
    public function Admin()
    {
        $fournisseurs = Fournisseur::all()->count();
        $products = Product::all()->count();
        $user = User::all();
        $orders = Order::where('statue', '<=', 0)->paginate(5);
        $specials = Product::where('offer', '>', 0)->where('datefin', '>', now())->paginate(5);
        $orderenCoure = Order::where('statue', '>', 0)->count();
        return view('Admin', compact('fournisseurs', 'products', 'specials', 'orders', 'user', 'orderenCoure'));
    }
    public function product()
    {
        $products = Product::with('categorie')->paginate(10);
        $categories = Categorie::all();
        $fournisseurs = Fournisseur::all();
        return view('product', compact('products', 'categories', 'fournisseurs'));

    }
    public function product_add()
    {
        $categories = Categorie::all();
        $fournisseurs = Fournisseur::all();
        return view('product_add', compact('categories', 'fournisseurs'));
    }
    public function product_update($id)
    {
        $product = Product::find($id);
        $fournisseurs = Fournisseur::all();
        $categories = Categorie::all();
        return view('product_update', compact('product', 'categories', 'fournisseurs'));
    }
    public function categories()
    {
        $categories = Categorie::paginate(10);
        return view('categories', compact('categories'));
    }
    public function categories_add()
    {
        return view('categories_add');
    }
    public function fournisseur()
    {
        $fournisseurs = Fournisseur::paginate(5);
        return view('Fournisseur', compact('fournisseurs'));
    }
    public function orders()
    {
        $orders = Order::where('statue', '<=', 0)->paginate(10);
        return view('orders', compact('orders'));
    }
    public function orders_confirme()
    {
        $orders = Order::where('statue', '>', 0)->paginate(10);
        return view('orders_confirme', compact('orders'));
    }
    public function categorie_update($id)
    {
        $categorie = Categorie::find($id);
        return view('categorie_update', compact('categorie'));
    }
    public function fournisseur_update($id)
    {
        $fournisseur = Fournisseur::find($id);
        return view('fournisseur_update', compact('fournisseur'));
    }
    public function users()
    {
        $users = User::paginate(10);
        return view('users', compact('users'));
    }

    public function order_detail($id)
    {
        $order = Order::find($id);
        $order_details = Order_detail::where('order_id', $id)->get();
        $user = User::all();
        return view('order_detail', compact('order', 'order_details', 'user'));
    }
    public function categories_post(Request $request)
    {
        try {
            $title = str_replace(' ', '_', $request->get('title'));
            $file_name = uniqid() . "." . $request->file("img")->extension();
            $request->file("img")->storeAs("public/images", $file_name);

            Categorie::create([
                'title' => $title,
                'img' => 'storage/images/' . $file_name,
                'quantités' => '0'
            ]);

            session()->flash('success', 'Catégorie ajoutée avec succès.');
        } catch (\Exception $e) {
            session()->flash('error', 'Une erreur est survenue lors de l\'ajout de la Catégorie. Assurez-vous de remplir tous les champs et de ne pas répéter les Catégories.');
        }
        return redirect('categories');
    }

    public function categorie_up(Request $request)
    {
        $categorie = Categorie::find($request->get('id'));
        try {
            if ($request->hasFile('img')) {
                $file_name = $request->get('title') . "." . $request->file("img")->extension();
                $request->file("img")->storeAs("public/images", $file_name);
                $categorie->update([
                    'img' => 'storage/images/' . $file_name,
                    'title' => $request->get('title'),
                    'quantités' => '0'
                ]);
            } else {
                $categorie->update([
                    'title' => $request->get('title'),
                    'quantités' => '0'
                ]);
            }
            session()->flash('success', 'Categorie Modifié avec succès.');
        } catch (\Exception $e) {
            session()->flash('error', 'Une erreur est survenue lors de Modifié du Categorie.');
        }

        return redirect('/categories');
    }
    public function categorie_delete($id)
    {
        $categorie = Categorie::find($id);
        $categorie_image = $categorie->img;

        if (!$categorie) {
            return redirect('/categories')->with('error', 'Catégorie non trouvée.');
        }

        $products = Product::where('categorie_id', $id)->get();
        foreach ($products as $product) {
            $product->delete();
        }
        $categorie->delete();

        return redirect('/categories')->with('success', 'La catégorie et tous les produits associés ont été supprimés avec succès.');
    }


    public function fournisseur_post(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:25',
            'email' => 'required|email|max:30',
            'phone' => 'required|string|min:10',
        ]);
        try {
            Fournisseur::create(
                [
                    'name' => $request->get('name'),
                    'email' => $request->get('email'),
                    'phone' => $request->get('phone')
                ]
            );
            session()->flash('success', 'Fournisseur ajouté avec succès.');
        } catch (\Exception $e) {
            session()->flash('error', 'Une erreur est survenue lors de l\'ajout du Fournisseur. Assurez-vous de remplir tous les champs');
        }
        return redirect('/fournisseur');
    }
    public function fournisseur_delete($id)
    {
        $fournisseur = Fournisseur::find($id);
        if (!$fournisseur) {
            return redirect('/fournisseur')->with('error', 'Fournisseur non trouvée.');
        }
        $fournisseur->delete();
        return redirect('/fournisseur')->with('success', 'Fournisseur a été supprimée avec succès.');
    }
    public function fournisseur_up(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:25',
            'email' => 'required|email|max:30',
            'phone' => 'required|string|min:10',
        ]);
        $fournisseur = Fournisseur::find($request->get('id'));
        try {
            $fournisseur->update(
                [
                    'name' => $request->get('name'),
                    'email' => $request->get('email'),
                    'phone' => $request->get('phone')
                ]
            );
            session()->flash('success', 'Fournisseur Modifié avec succès.');
        } catch (\Exception $e) {
            session()->flash('error', 'Une erreur est survenue lors de Modifié du Fournisseur. Assurez-vous de remplir tous les champs');
        }
        return redirect('/fournisseur');
    }

    public function proudct_post(Request $request)
    {
        $offerPrice = $request->get('offerPrice');
        $Adimg = $request->file('Adimg');
        try {
            $file_name = uniqid() . "." . $request->file("img")->extension();
            $file_name2 = uniqid() . "." . $request->file("img")->extension();
            $file_name3 = uniqid() . "." . $request->file("img")->extension();
            $file_name4 = uniqid() . "." . $request->file("img")->extension();
            $request->file("img")->storeAs("public/images", $file_name);
            $request->file("img2")->storeAs("public/images", $file_name2);
            $request->file("img3")->storeAs("public/images", $file_name3);
            $request->file("img4")->storeAs("public/images", $file_name4);

            $productData = [
                'title' => $request->get('title'),
                'img' => 'storage/images/' . $file_name,
                'img2' => 'storage/images/' . $file_name2,
                'img3' => 'storage/images/' . $file_name3,
                'img4' => 'storage/images/' . $file_name4,
                'description' => $request->get('description'),
                'price' => $request->get('price'),
                'brand' => $request->get('brand'),
                'quantities' => $request->get('quantities'),
                'categorie_id' => $request->get('categorie_id'),
                'fournisseur_id' => $request->get('fournisseur_id')
            ];

            if ($offerPrice > 0) {
                $productData['offer'] = 1;
                $productData['offerPrice'] = $offerPrice;
                $productData['percentage'] = $request->get('percentage');
                $productData['datefin'] = $request->get('datefin');
            } else {
                $productData['offer'] = null;
                $productData['offerPrice'] = null;
                $productData['percentage'] = null;
                $productData['datefin'] = null;
            }

            if ($Adimg && $Adimg->isValid()) {
                $file_name = uniqid() . "." . $Adimg->extension();
                $Adimg->storeAs("public/images", $file_name);

                $productData['Advertisement'] = 1;
                $productData['Adimg'] = 'storage/images/' . $file_name;
            } else {
                $productData['Advertisement'] = 0;
                $productData['Adimg'] = null;
            }

            Product::create($productData);

            $categorie = Categorie::find($request->get('categorie_id'));
            $categorie->quantités += 1;
            $categorie->save();
            session()->flash('success', 'Product ajouté avec succès.');
        } catch (\Exception $e) {
            session()->flash('error', 'Une erreur est survenue lors de l\'ajout du Product. Assurez-vous de remplir tous les champs' . $e->getMessage());
        }
        return redirect('/product');
    }
    public function product_up(Request $request)
    {
        $product = Product::find($request->get('id'));
        $offerPrice = $request->get('offerPrice');
        $Adimg = $request->file('Adimg');
        try {
            $productData = [
                'title' => $request->get('title'),
                'description' => $request->get('description'),
                'price' => $request->get('price'),
                'brand' => $request->get('brand'),
                'quantities' => $request->get('quantities'),
                'categorie_id' => $request->get('categorie_id'),
                'fournisseur_id' => $request->get('fournisseur_id')
            ];

            if ($request->hasFile('img')) {
                $file_name = uniqid() . "." . $request->file("img")->extension();
                $request->file("img")->storeAs("public/images", $file_name);
                $productData['img'] = 'storage/images/' . $file_name;
            }


            if ($request->hasFile('img2')) {
                $file_name2 = uniqid() . "." . $request->file("img2")->extension();
                $request->file("img2")->storeAs("public/images", $file_name2);
                $productData['img2'] = 'storage/images/' . $file_name2;
            }

            if ($request->hasFile('img3')) {
                $file_name3 = uniqid() . "." . $request->file("img3")->extension();
                $request->file("img3")->storeAs("public/images", $file_name3);
                $productData['img3'] = 'storage/images/' . $file_name3;
            }

            if ($request->hasFile('img4')) {
                $file_name4 = uniqid() . "." . $request->file("img4")->extension();
                $request->file("img4")->storeAs("public/images", $file_name4);
                $productData['img4'] = 'storage/images/' . $file_name4;
            }

            if ($offerPrice > 0) {
                $request->validate([
                    'offerPrice' => 'required',
                    'percentage' => 'required',
                    'datefin' => 'required',
                ]);
                $productData['offer'] = 1;
                $productData['offerPrice'] = $offerPrice;
                $productData['percentage'] = $request->get('percentage');
                $productData['datefin'] = $request->get('datefin');
            } else {
                $productData['offer'] = null;
                $productData['offerPrice'] = null;
                $productData['percentage'] = null;
                $productData['datefin'] = null;
            }

            if ($Adimg && $Adimg->isValid()) {
                $file_name = uniqid() . "." . $Adimg->extension();
                $Adimg->storeAs("public/images", $file_name);

                $productData['Advertisement'] = 1;
                $productData['Adimg'] = 'storage/images/' . $file_name;
            }
            $product->update($productData);
            session()->flash('success', 'Product Modifié avec succès.');
        } catch (\Exception $e) {
            session()->flash('error', 'Une erreur est survenue lors de Modifié du Product. Assurez-vous de remplir tous les champs' . $e->getMessage());
        }
        return redirect('/product');
    }

    public function product_delete($id, $categorieid)
    {
        $product = Product::find($id);
        $categorie = Categorie::find($categorieid);
        $categorie->quantités -= 1;
        $categorie->save();
        if (!$product) {
            return redirect('/product')->with('error', 'Product non trouvée.');
        }
        $product->delete();

        return redirect('/product')->with('success', 'Product a été supprimée avec succès.');
    }


    public function confirme($id)
    {
        $order = Order::find($id);
        if ($order) {
            $order->statue = 1;
            $order->save();
        }
        return redirect('/order_detail' . '/' . $id)->with('success', 'Commande Statue  a été modfié avec succès.');
        ;
    }
    public function encoure($id)
    {
        $order = Order::find($id);
        if ($order) {
            $order->statue = 0;
            $order->save();
        }
        return redirect('/order_detail' . '/' . $id)->with('success', 'Commande Statue  a été modfié avec succès.');
        ;
    }
    public function deleteOrder($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return redirect('/orders')->with('error', 'Order non trouvée.');
        }
        $order->delete();
        return redirect('/orders')->with('success', 'order Supprimer avec succès.');
        ;

    }
    public function searchproduct(Request $request)
    {
        $search = Product::find($request->get('id'));
        return view('searchProduct', compact('search'));
    }
    public function searchordes(Request $request)
    {
        $search = Order::find($request->get('id'));
        return view('searchordes', compact('search'));
    }
    public function searchuser(Request $request)
    {
        $search = User::find($request->get('id'));
        return view('searchuser', compact('search'));
    }

    public function update_password()
    {
        $user = User::where('email' , 'admin')->first();;
        if (!$user) {
            session()->flash('error', 'Admin user not found.');
            return redirect('/update_password');
        }
        return view('auth.update_password', compact('user'));
    }
    public function password_up(Request $request)
    {
        $user = User::where('email' , 'admin')->first();
        $password = $request->password;
        $password_confirme = $request->password_confirme;
        if ($password === $password_confirme) {
            $user->update(
                [
                    'password' => $password
                ]
            );
            session()->flash('success', 'Password Modifié avec succès.');
        }else{
            session()->flash('error' , 'Passwords do not match');
        }
        return redirect('/update_password');
    }

}