<?php

namespace App\Http\Controllers;

use App\Enums\RequestStatus;
use App\Models\Category;
use App\Models\Request as ModelsRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RequestManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $provider = Auth::id();
        return Inertia::render('RequestManagement', [
            'requests' => ModelsRequest::query()
                ->where('provider_id', value: $provider)
                ->latest()
                ->get()
                ->map(fn ($request) => [
                    'id' => $request->request_id,
                    'description' => $request->description,
                    'photo' => $request?->pic,
                    'address' => $request->request_address,
                    'date' => $request->request_date,
                    'state' => $request->request_state,
                    'customerId' => $request->customer_id
                ]),
            'users' => User::query()
                ->whereHas('requests', fn ($query) => $query->where('request_state', value:'pending' ))
                ->get()
                ->map(fn ($user) =>[
                    'id' => $user->user_id,
                    'name' => trim($user->first_name) . ' ' . trim($user?->last_name ?? ''),
                    'phone' => $user->phone,
                    'profilePicture' => $user?->profile_picture,
                ])
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
    public function update(Request $request, ModelsRequest $id)
    {
        $order = ModelsRequest::find($id);
        $validated = $request->validate([
            'state' => [
                'required',
                Rule::in(array_map(
                    static fn (RequestStatus $status): string => $status->value,
                    RequestStatus::cases(),
                )),
            ],
        ]);

        $order->request_state = $validated['state'];
        $order->save();

        return back()->with('success', 'تم تحديث حالة الطلب بنجاح.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
