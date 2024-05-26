<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_detail extends Model
{
    use HasFactory;
     
    public $timestamps = false;

    protected $fillable = [
        'prodcutName',
        'productImage',
        'quantitieCm',
        'price',
        'order_id'
    ];

    public function Order()
    {
        return $this->belongsTo(Order::class);
    }
}
