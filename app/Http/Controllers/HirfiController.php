<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Provider;
use App\Models\ProviderPhoto;
use App\Models\Rating;
use App\Models\Request as ModelsRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HirfiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Home', [
            'signedUserId' => Auth::id(),
            'categories' => Category::query()
                ->orderBy('category_name')
                ->get(['category_id', 'category_name']),
            'users' => User::query()
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->user_id,
                    'name' => trim($user->first_name).' '.($user?->last_name ?? ''),
                ]),
            'providers' => Provider::query()
                ->with('users')
                ->whereHas('users', fn ($query) => $query->where('account_state', 'activated'))
                ->get()
                ->map(fn ($provider) => [
                    'id' => $provider->provider_id,
                    'name' => trim(($provider->users->first_name).' '.($provider->users?->last_name ?? '')),
                    'category' => $provider->category_id,
                    'address' => $provider->users?->address,
                    'nationality' => $provider->users->nationality,
                    'starAvg' => $provider->star_avg,
                    'state' => $provider->provider_state,
                    'avatar' => $provider->users?->profile_picture,
                ]),
            'galleries' => ProviderPhoto::query()
                ->with('providers')
                ->get()
                ->map(fn ($gallery) => [
                    'id' => $gallery->providers?->provider_id,
                    'photoNumber' => $gallery->pic_number,
                    'path' => $gallery->pic,
                ]),
            'reviews' => Rating::query()
                ->with(['providers', 'users'])
                ->orderBy('rating_date')
                ->get()
                ->map(fn ($review) => [
                    'providerId' => $review->providers?->provider_id,
                    'customerId' => $review->users?->user_id,
                    'rating' => $review->star_number,
                    'comment' => $review->comment,
                    'date' => $review->rating_date,
                ]),
            'requests' => ModelsRequest::query()
                ->with(['providers', 'users'])
                ->get()
                ->map(fn ($order) => [
                    'id' => $order->request_id,
                    'providerId' => $order->providers?->provider_id,
                    'customerId' => $order->users?->user_id,
                    'orderState' => $order->request_state,
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
    public function show(Provider $provider): Response
    {
        return Inertia::render('Home/HomeView/MainGrid/ProvidersList/ProviderCard/ProviderDetails/ProviderGallery', [
            'provider' => $provider->load('providerPhotos'),
        ]);
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
