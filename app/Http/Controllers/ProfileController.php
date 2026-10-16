<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Profile', [
            'users' => User::query()
                ->get()
                ->map(fn ($user) =>[
                    'id' => Auth::id(),
                    'firstName' => trim($user->first_name), 
                    'lastName' => trim($user?->last_name ?? ''),
                    'birthDate' => $user->birth_date,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'nationality' => $user->nationality,
                    'profilePicture' => $user?->profile_picture,
                ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
