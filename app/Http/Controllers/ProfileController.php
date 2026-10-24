<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Provider;
use App\Models\ProviderPhoto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $provider = Provider::query()
            ->where('provider_id', $user->getAuthIdentifier())
            ->first();

        return Inertia::render('Profile', [
            'user' => [
                'id' => $user->getAuthIdentifier(),
                'name' => trim($user->first_name) . ' ' . trim($user?->last_name ?? ''),
                'birthDate' => $user->birth_date,
                'phone' => $user->phone,
                'address' => $user->address,
                'nationality' => $user->nationality,
                'profilePicture' => $user?->profile_picture,
            ],
                'categories' => Category::query()
                    ->orderBy('category_name')
                    ->get(['category_id', 'category_name']),
                'provider' => $provider === null ? null : [
                        'id' => $provider->provider_id,
                        'category' => $provider->category_id,
                        'starAvg' => $provider->star_avg,
                        'state' => $provider->provider_state,
                    ],
                'galleries' => ProviderPhoto::query()
                    ->with('providers')
                    ->get()
                    ->map(fn ($gallery) => [
                        'id' => $gallery->providers?->provider_id,
                        'photoNumber' => $gallery->pic_number,
                        'path' => $gallery->pic,
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
    public function edit(User $id)
    {
        return Inertia::render('EditProfile', [
            'user' => [
                'id' => $id->getKey(),
                'firstName' => $id->first_name,
                'lastName' => $id?->last_name,
                'birthDate' => $id->birth_date,
                'phone' => $id->phone,
                'address' => $id->address,
                'nationality' => $id->nationality,
            ],
            'categories' => Category::query()
                ->orderBy('category_name')
                ->get(['category_id', 'category_name']),
            'providers' => Provider::query()
                ->with('users')
                ->get()
                ->map(fn ($provider) => [
                    'id' => $provider->provider_id,
                    'category' => $provider->category_id,
                    'starAvg' => $provider->star_avg,
                    'state' => $provider->provider_state,
                ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $id)
    {
        $user = $id;

        $validated = $request->validate([
            'firstName' => ['sometimes', 'nullable', 'string', 'max:255'],
            'lastName' => ['sometimes', 'nullable', 'string', 'max:255'],
            'birthDate' => ['sometimes', 'nullable', 'date', 'before_or_equal:'.now()->subYears(18)->toDateString()],
            'password' => ['sometimes', 'nullable', 'string', 'min:8', 'confirmed'],
            'phone' => ['sometimes', 'nullable', 'digits:10', Rule::unique('users', 'phone')->ignore($user->getKey(), 'user_id')],
            'address' => ['sometimes', 'nullable', 'string', 'max:255'],
            'nationality' => ['sometimes', 'nullable', 'starts_with:09', Rule::in([
                'libyan', 'sudanese', 'egyptian', 'morocan', 'syrian',
            ])],
            'accountType' => ['sometimes', 'nullable', Rule::in(['customer', 'provider'])],
            'serviceType' => [
                'exclude_unless:accountType,provider',
                'required',
                'integer',
                'exists:categories,category_id',
            ],
        ], [
            'birthDate.before_or_equal' => 'يجب أن يكون عمرك 18 عاماً أو أكثر',
            'password.min' => 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
            'password.confirmed' => 'كلمة المرور غير متطابقة',
            'phone.digits' => 'رقم الهاتف يجب أن يتكون من 10 أرقام',
            'phone.unique' => 'رقم الهاتف مسجل مسبقاً',
            'phone.starts_with' => 'يجب أن يبدأ رقم الهاتف ب09',
        ]);

        $user->update(array_filter([
            'first_name' => $validated['firstName'] ?? null,
            'last_name' => $validated['lastName'] ?? null,
            'birth_date' => $validated['birthDate'] ?? null,
            'pass_key' => $validated['password'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'nationality' => $validated['nationality'] ?? null,
        ], static fn ($value) => $value !== null && $value !== ''));

        if (($validated['accountType'] ?? null) === 'provider') {
            $user->providers()->updateOrCreate([], [
                'category_id' => $validated['serviceType'],
            ]);
        }

        return redirect('/profile')->with('success', "تم حفظ بيانات الملف الشخصي بنجاح.");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
