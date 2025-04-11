<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json(['categories' =>  $categories]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category =  Category::create([
            'nom' => $request->nom,
        ]);

        return response()->json(['category' =>  $category]);

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category = Category::findOrFail($category->id);

        $category->update([
            'nom' => $request->nom,
        ]);

        return response()->json(['category' =>  $category]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category = Category::findOrFail($category->id);
        $category->delete();

        return response()->json([
            'message' =>  $category->nom . " Supprimé avec succès"
        ]);
    }
}
