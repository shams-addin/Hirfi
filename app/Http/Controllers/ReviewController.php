<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): void
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rating' => 'required|integer',
            'comment' => 'sometimes',
        ], [
            'rating.required' => 'يرجى تحديد عدد النجوم (من 1 إلى 5) قبل إرسال التقييم.',
        ]);

        Rating::create([
            'star_number' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
            'request_address' => $validated['address'],
            'customer_id' => Auth::id(),
            'provider_id' => $request->provider_id,
        ]);

        return back()->with('success', 'تم حفظ تقييمك');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
        //
    }
}
