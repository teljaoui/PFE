<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/Admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Products page
    </title>
</head>

<body>


    <div class="wrapper">
        <aside id="sidebar">
            @include('Asidebar')
        </aside>
        <div class="main p-3">
            <div class="text-center">
                <h1 class="title-page">
                    Products page
                </h1>
            </div>
            <div class="product-head">
                <div class="d-flex">
                    <form action="/searchproduct" method="POST" class="d-flex">
                        @csrf
                        <input type="number" name="id" min="1" class="form-control"
                            placeholder="Matricule">
                        <button type="submit" class="submit">Recherche</button>
                    </form>

                </div>
                <div>
                    <a href="/product_add" class="button"><i class="bi bi-plus"></i> Ajouter Product</a>
                </div>
            </div>
            <div class="proudct-list">
                @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @elseif(session('error'))
                    <div class="alert alert-danger">
                        {{ session('error') }}
                    </div>
                @endif
                <div class="table-responsive dataview">
                    <table class="table datatable ">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Categorie</th>
                                <th>Fournisseur</th>
                                <th>Offer</th>
                                <th>Advertisement</th>
                                <th>Quantities</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($products as $product)
                                <tr>
                                    <td>{{ $product->id }}</td>
                                    <td class="productimgname">
                                        <img src="{{ asset($product->img) }}" alt="product">
                                        <span>
                                            @if (strlen($product->title) > 30)
                                                {{ substr($product->title, 0, 30) }}...
                                            @else
                                                {{ $product->title }}
                                            @endif
                                        </span>
                                    </td>
                                    <td>{{ $product->price }}</td>
                                    <td>
                                        {{ $product->categorie->title }}
                                    </td>
                                    <td>{{ $product->fournisseur->name }}</td>
                                    <td>
                                        <span class="offer">
                                            @if ($product->offer === 1)
                                                true
                                            @else
                                                false
                                            @endif
                                        </span>
                                    </td>
                                    <td>
                                        <span class="offer">
                                            @if ($product->Advertisement === 1)
                                                true
                                            @else
                                                false
                                            @endif

                                        </span>
                                    </td>
                                    <td>{{ $product->quantities }}</td>
                                    <td class="action">
                                        <a href="/product_update/{{ $product->id }}"><i
                                                class="fa-solid fa-pen-to-square"></i>
                                            Update</a>

                                        <a href="/product_delete/{{ $product->id }}/{{ $product->categorie->id }}"
                                            class="text-danger delete"><i class="bi bi-trash3"></i> Delete</a>
                                    </td>
                                </tr>
                            @endforeach

                        </tbody>
                    </table>
                    <div class="col-12">
                        <span class="text-center">{{ $products->links() }}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>








    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>

    <script src="/Admin.js"></script>
</body>

</html>
