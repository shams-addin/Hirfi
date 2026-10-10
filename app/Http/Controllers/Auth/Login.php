<?php

namespace App\Http\Controllers\Auth;

use App\Enums\AccountState;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Login extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'phone' => ['required', 'digits:10'],
            'password' => ['required'],
        ], [
            'phone.required' => 'حقل الهاتف مطلوب',
            'phone.digits' => 'رقم الهاتف يجب أن يتكون من 10 أرقام',
            'password.required' => 'حقل كلمة المرور مطلوب',
        ]);

        if (Auth::attempt([
            'phone' => $credentials['phone'],
            'password' => $credentials['password'],
        ])) {
            $user = User::where('phone', $request->phone)->first();

            if ($user && Hash::check($request->password, $user->pass_key)) {
                if ($user?->account_state === AccountState::SUSPENDED->value) {
                    return back()->with('error', 'حسابك موقوف، يرجى التواصل مع الإدارة.');
                }
                Auth::loginUsingId($user->user_id);
                $request->session()->regenerate();

                return redirect()->intended('/');
            }

            return redirect()->intended('/');
        }

        return back()->with('error', 'بيانات الدخول غير صحيحة.');
    }
}
