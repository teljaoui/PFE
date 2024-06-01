<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'review',
        'content',
        'product_id'
    ];

    public function Product()
    {
        return $this->belongsTo(Product::class);
    }
}
