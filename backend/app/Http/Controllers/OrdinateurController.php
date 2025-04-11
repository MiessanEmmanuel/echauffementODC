<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrdinateurRequest;
use App\Http\Requests\UpdateOrdinateurRequest;
use App\Models\Ordinateur;

class OrdinateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ordinateurs = Ordinateur::with('category')->get();
        return response()->json(['ordinateurs' =>  $ordinateurs]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrdinateurRequest $request)
    {
        $ordinateur =  Ordinateur::create([
            'nom' => $request->nom,
            'annee' => $request->annee,
            'sizeScreen' => $request->sizeScreen,
            'category_id' => $request->category_id,
        ]);

        return response()->json(['ordinateur' =>  $ordinateur]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrdinateurRequest $request, Ordinateur $ordinateur)
    {

        $ordinateur = Ordinateur::findOrFail($ordinateur->id);

        $ordinateur->update([
            'nom' => $request->nom,
            'annee' => $request->annee,
            'sizeScreen' => $request->sizeScreen,
            'category_id' => $request->category_id,
        ]);

        return response()->json(['ordinateur' =>  $ordinateur]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ordinateur $ordinateur)
    {
        $ordinateur = Ordinateur::findOrFail($ordinateur->id);
        $ordinateur->delete();

        return response()->json([
            'message' =>  $ordinateur->nom . " Supprimé avec succès"
        ]);
    }
}
