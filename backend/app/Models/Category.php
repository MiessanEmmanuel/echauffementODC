<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;


    protected $fillable = [
        'nom'
    ];


    /**
     * Get all of the ordinateurs for the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ordinateurs()
    {
        return $this->hasMany(Ordinateur::class, 'category_id');
    }
}
