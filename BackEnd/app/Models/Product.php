<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'img',
        'img2',
        'img3',
        'img4',
        'price',
        'brand',
        'quantities',
        'offer',
        'offerPrice',
        'percentage',
        'datefin',
        'Advertisement',
        'Adimg',
        'fournisseur_id',
        'categorie_id'
    ];

    
    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
