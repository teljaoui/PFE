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
    <title>
        Résultat de Recherche
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
                    Résultat de Recherche </h1>
            </div>
            <div class="proudct-list">
                @if (!$search)
                <div class="searchresult">
                    <h6 class="text-center">Product Not Found<h6>
                </div>
                @else
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
                            <tr>
                                <td>{{ $search->id }}</td>
                                <td class="productimgname">
                                    <img src="{{ asset($search->img) }}" alt="product">
                                    <span>
                                        @if (strlen($search->title) > 30)
                                            {{ substr($search->title, 0, 30) }}...
                                        @else
                                            {{ $search->title }}
                                        @endif
                                    </span>
                                </td>
                                <td>{{ $search->price }}</td>
                                <td>
                                    {{ $search->categorie->title }}
                                </td>
                                <td>{{ $search->fournisseur->name }}</td>
                                <td>
                                    <span class="offer">
                                        @if ($search->offer === 1)
                                            true
                                        @else
                                            false
                                        @endif
                                    </span>
                                </td>
                                <td>
                                    <span class="offer">
                                        @if ($search->Advertisement === 1)
                                            true
                                        @else
                                            false
                                        @endif

                                    </span>
                                </td>
                                <td>{{ $search->quantities }}</td>
                                <td class="action">
                                    <a href="/product_update/{{ $search->id }}"><i
                                            class="fa-solid fa-pen-to-square"></i>
                                        Update</a>

                                    <a href="/product_delete/{{ $search->id }}/{{ $search->categorie->id }}"
                                        class="text-danger delete"><i class="bi bi-trash3"></i> Delete</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                @endif
            </div>
        </div>


    </div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>

    <script src="/Admin.js"></script>
</body>

</html>
