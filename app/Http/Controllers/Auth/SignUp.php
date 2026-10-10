<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class SignUp extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SignUpRequest $request): RedirectResponse
    {
        // Validation the input
        $validated = $request->validated();

            $user = User::create([
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'] ?? null,
                'birth_date' => $validated['birthDate'],
                'pass_key' => Hash::make($validated['password']),
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'nationality' => $validated['nationality']
            ]);

            if ($validated['accountType'] === 'provider') {
                $provider = new Provider();
                $provider->provider_id = $user->user_id;
                $provider->category_id = $validated['serviceType'];
                $provider->save();
            }

            // Log them in without creating a remember-token column requirement.
            Auth::login($user);
            $request->session()->regenerate();
            return redirect()->route('home');
        
        
    }
}
