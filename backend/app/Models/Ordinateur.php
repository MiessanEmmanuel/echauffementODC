<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ordinateur extends Model
{
    /** @use HasFactory<\Database\Factories\OrdinateurFactory> */
    use HasFactory;


    protected $fillable =[
        'nom',
        'annee',
        'sizeScreen',
        'category_id'
    ];


   /**
    * Get the categories that owns the Ordinateur
    *
    * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
   public function category()
   {
       return $this->belongsTo(Category::class, 'category_id');
   }
}
