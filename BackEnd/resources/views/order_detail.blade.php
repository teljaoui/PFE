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
    <title>Orders Detail</title>
</head>

<body>


    <div class="wrapper">
        <aside id="sidebar">
            @include('Asidebar')
        </aside>
        <div class="main p-3">
            <div class="text-center">
                <h1 class="title-page">
                    Orders Detail
                </h1>
            </div>
            @if (session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @elseif(session('error'))
                <div class="alert alert-danger">
                    {{ session('error') }}
                </div>
            @endif
            <div class="add-product d-flex">

                <div class="user-detail">
                    <h7 class="title">User information</h7>
                    <div class="mt-4">
                        <ul>
                            <li>
                                <a href="tel:{{ $order->user->phone }}"><i class="bi bi-telephone-forward"></i> Call</a>
                                <a href="mailto:{{ $order->user->email }}"><i class="bi bi-envelope-arrow-up-fill"></i>
                                    Send
                                    Email</a>
                            </li>
                            <li><span>Name :</span>
                                <p>{{ $order->user->name }} {{ $order->user->lastName }}</p>
                            </li>
                            <li><span>Email :</span>
                                <p>{{ $order->user->email }}</p>
                            </li>
                            <li><span>Phone :</span>
                                <p>{{ $order->user->phone }}</p>
                            </li>
                            <li><span>City :</span>
                                <p>{{ $order->city }}</p>
                            </li>
                            <li>
                                <span>Adress : </span>
                                <p>{{ $order->adress }}</p>
                            </li>
                            <li>
                                <span>Apatement , Suiten : </span>
                                <p>{{ $order->suiteAderess }}</p>
                            </li>
                            <li><span>Total Commande :</span>
                                <p>{{ $order->total }} Dhs</p>
                            </li>
                            <li>
                                <span>Commande Statue : </span>
                                <p>
                                    @if ($order->statue == 1)
                                        <p class="statueCm">confirmed</p>
                                    @elseif ($order->statue == 0)
                                        <p class="statueCm">en coure</p>
                                    @else
                                        <p class="statueCm">Livrée</p>
                                    @endif
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="py-3">
                        <a href="/encoure/{{ $order->id }}" class="encoure">En coure</a>
                        <a href="/confirme/{{ $order->id }}" class="submit">Confirme</a>
                        <a href="/deleteOrder/{{ $order->id }}" class="btn btn-danger delete">Delete</a>
                    </div>
                    <div class="py-3">
                        <a href="/delivered/{{ $order->id }}" class="delivered">Livrée</a>

                    </div>
                </div>
                <div class="list-commande">
                    <h7 class="title">List Products</h7>
                    <div class="table-responsive dataview">
                        <table class="table datatable ">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantities</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($order_details as $item)
                                    <tr>
                                        <td class="productimgname">
                                            <img src="{{ asset($item->productImage) }}"" alt="product">
                                            <span>
                                                @if (strlen($item->productName) > 30)
                                                    {{ substr($item->productName, 0, 30) }}...
                                                @else
                                                    {{ $item->productName }}
                                                @endif
                                            </span>
                                        </td>
                                        <td>{{ $item->price }}</td>
                                        <td>{{ $item->quantitieCm }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="Total">
                        <span>Total :</span>
                        <p>{{ $order->total }} Dhs</p>
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
