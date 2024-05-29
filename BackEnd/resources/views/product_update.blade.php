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
        <title>Admin</title>
    </head>

    <body>

        <div class="wrapper">
            <aside id="sidebar">
                @include('Asidebar')
            </aside>
            <div class="main p-3">
                <div class="text-center">
                    <h1 class="title-page">
                        Modifier Produit
                    </h1>
                </div>
                <h5 class="mx-5">Modifier Produit</h5>
                <div class="add-product">
                    <form action="/product_up" method="post" enctype="multipart/form-data">
                        @csrf
                        <input type="hidden" name="id" value="{{ $product->id }}">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="">Product Name</label>
                                    <input type="text" class="form-control" name="title"
                                        value="{{ $product->title }}" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="">Product Price</label>
                                    <input type="number" min="0" class="form-control" name="price"
                                        value="{{ $product->price }}" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="">Categorie</label>
                                    <select name="categorie_id" id="" class="form-select" required>
                                        <option value="" selected disabled>Select Categorie</option>
                                        @foreach ($categories as $categorie)
                                            <option value="{{ $categorie->id }}"
                                                {{ $categorie->id == $product->categorie->id ? 'selected' : '' }}>
                                                {{ $categorie->title }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="">Fournisseur</label>
                                    <select name="fournisseur_id" id="" class="form-select" required>
                                        <option value="" selected disabled>Select Categorie</option>
                                        @foreach ($fournisseurs as $fournisseur)
                                            <option value="{{ $fournisseur->id }}"
                                                {{ $fournisseur->id == $product->fournisseur->id ? 'selected' : '' }}>
                                                {{ $fournisseur->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="">Quantities</label>
                                    <input type="number" min="0" name="quantities" class="form-control"
                                        value="{{ $product->quantities }}" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="">Brand</label>
                                    <input type="text" class="form-control" name="brand"
                                        value="{{ $product->brand }}">
                                </div>
                            </div>
                            <span class="text-primary" style="font-size: 12px">Si vous souhaitez modifier l'image,
                                sélectionnez un fichier</span>
                            <br>
                            <div class="col-3">
                                <div class="form-group">
                                    <label for="">image 1</label>
                                    <input type="file" name="img" id="" class="form-control">
                                    @if ($product->img)
                                        <p>Fichier actuel : <img src="{{ asset($product->img) }}" alt="product"
                                                style="max-width: 70px;"></p>
                                    @endif
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <label for="">image 2</label>
                                    <input type="file" name="img2" id="" class="form-control">
                                    @if ($product->img2)
                                        <p>Fichier actuel : <img src="{{ asset($product->img2) }}" alt="product"
                                                style="max-width: 70px;"></p>
                                    @endif
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <label for="">image 3</label>
                                    <input type="file" name="img3" id="" class="form-control">
                                    @if ($product->img3)
                                        <p>Fichier actuel : <img src="{{ asset($product->img3) }}" alt="product"
                                                style="max-width: 70px;"></p>
                                    @endif
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <label for="">image 4</label>
                                    <input type="file" name="img4" id="" class="form-control">
                                    @if ($product->img4)
                                        <p>Fichier actuel : <img src="{{ asset($product->img4) }}" alt="product"
                                                style="max-width: 70px;"></p>
                                    @endif
                                </div>
                            </div>
                            <br>
                            <h6><span class="text-danger">Remarque :</span> L'image doit être à l'échelle [1 : 1]</h6>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="">Description</label>
                                    <textarea name="description" id="" cols="30" rows="10" class="form-control" required>{{ $product->description }}</textarea>
                                </div>
                            </div>
                            <div class="col-12">
                                <h6 class="text-center">Ce champ n'est pas obligatoire. Si vous souhaitez ajouter une
                                    publicité ou un produit favori, remplissez les champs vides.</h6>
                            </div>
                            <div class="col-12">
                                <h5>Est-ce un produit préféré ? Veuillez remplir les champs vides ?</h5>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <label for="">Offer Price</label>
                                    <input type="number" name="offerPrice" class="form-control"
                                        value="{{ $product->offerPrice }}">
                                    @error('offerPrice')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <label for="">Offer Percentage</label>
                                    <input type="number" class="form-control" max="99" name="percentage"
                                        value="{{ $product->percentage }}">
                                    @error('percentage')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <label for="">Date fin offer</label>
                                    <input type="date" name="datefin" class="form-control"
                                        value="{{ $product->datefin }}">
                                    @error('datefin')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-12">
                                <h5>Publicité</h5>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label for="">Publicité image</label>
                                    <input type="file" name="Adimg" id="" class="form-control"><br>
                                    @if ($product->Adimg)
                                        <p>Fichier actuel : <img src="{{ asset($product->Adimg) }}" alt="product"
                                                style="max-width: 100px;"></p>
                                    @endif
                                    <h6><span class="text-danger">Remarque :</span> L'image doit être à l'échelle [3 :
                                        2]
                                    </h6>
                                    @if ($product->Adimg)
                                    <a href="/publicite/{{$product->id}}" class="btn btn-danger">Supprimer Publicité</a>
                                    @endif
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group text-end">
                                    <button type="submit" class="delivered">Modifer</button>
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
