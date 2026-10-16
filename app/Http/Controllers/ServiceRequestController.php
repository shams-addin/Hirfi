<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Inertia::render('RequestPanel');
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
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'photo' => 'sometimes',
            'address' => 'required|string',
        ], [
            'description.required' => 'تفاصيل العمل مطلوبة',
            'address.required' => 'موقع التنفيذ مطلوب',
        ]);

        ModelsRequest::create([
            'description' => $validated['description'],
            'pic' => $validated['photo'] ?? null,
            'request_address' => $validated['address'],
            'customer_id' => Auth::id(),
            'provider_id' => $request->provider_id,
        ]);

        return back()->with('success', 'تمت العملية بنجاح');
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
