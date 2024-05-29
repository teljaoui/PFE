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
    <title>Orders page</title>
</head>

<body>


    <div class="wrapper">
        <aside id="sidebar">
            @include('Asidebar')
        </aside>
        <div class="main p-3">
            <div class="text-center">
                <h1 class="title-page">
                    Orders page
                </h1>
            </div>
            <div class="orders m-5">
                <h6 class="title">orders</h6>
                <div class="table-responsive dataview">
                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @elseif(session('error'))
                        <div class="alert alert-danger">
                            {{ session('error') }}
                        </div>
                    @endif
                    <table class="table datatable ">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>City</th>
                                <th>Adress</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($orders as $order)
                                <tr>
                                    <td>{{ $order->id }}</td>
                                    <td>{{ $order->user->email }}</td>
                                    <td>{{ $order->city }}</td>
                                    <td>{{ $order->adress }}</td>
                                    <td>{{ $order->dateCm }}</td>
                                    <td>
                                        @if ($order->statue == 1)
                                            <span class="statueCm">confirmed</span>
                                        @elseif ($order->statue == 0)
                                            <span class="statueCm">en coure</span>
                                        @else
                                            <span class="statueCm">Livrée</span>
                                        @endif
                                    </td>
                                    <td>{{ $order->total }}</td>
                                    <td><a href="/order_detail/{{ $order->id }}"><i class="bi bi-eye-fill"></i>
                                            Detail</a></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    <div class="col-12">
                        <span class="text-center">{{ $orders->links() }}</span>
                    </div>
                </div>
            </div>




            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
            </script>

            <script src="/Admin.js"></script>
</body>

</html>
