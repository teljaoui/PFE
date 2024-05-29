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
    <title>Modifier Produit</title>
</head>

<body>

    <div class="wrapper">
        <aside id="sidebar">
            @include('Asidebar')
        </aside>
        <div class="main p-3">
            <div class="text-center">
                <h1 class="title-page">
                    Modifier Categorie
                </h1>
            </div>
            <h5 class="mx-5">Modifier Categorie</h5>
            <div class="add-product">
                <form action="/categorie_up" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="row">
                        <div class="col-6">
                            <input type="hidden" name="id" value="{{$categorie->id}}">
                            <div class="form-group">
                                <label for="">Categorie Name</label>
                                <input type="text" class="form-control" name="title" value="{{ $categorie->title }}" required>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="">Categorie image</label>
                                <input type="file" name="img"  id="" class="form-control" ><br>
                                @if ($categorie->img)
                                    <p>Fichier actuel :  <img src="{{ asset($categorie->img) }}" alt="categorie" style="max-width: 70px;"></p>
                                    <span class="text-danger" style="font-size: 12px">Si vous souhaitez modifier l'image, sélectionnez un fichier</span>
                                @endif
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group text-end">
                                <button type="submit" class="delivered">Modifier</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>

    <script src="/Admin.js"></script>
</body>

</html>
