<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'city',
        'adress',
        'suiteAderess',
        'dateCm',
        'total',
        'statue',
        'user_id'
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
    public function orderDetails()
    {
        return $this->hasMany(Order_detail::class); 
    }

}
