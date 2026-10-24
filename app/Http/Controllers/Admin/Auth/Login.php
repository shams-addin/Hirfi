<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin\Supervisor;
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

        // if (Auth::attempt([
        //     'phone' => $credentials['phone'],
        //     'password' => $credentials['password'],
        // ])) {
            $supervisor = Supervisor::where('phone', $request->phone)->first();

            if ($supervisor && Hash::check($request->password, $supervisor->pass_key)) {
                Auth::loginUsingId($supervisor->supervisor_id);
                $request->session()->regenerate();

                return redirect()->intended('/admin-dashboard');
            }
            
        // }

        return back()->with('error', 'بيانات الدخول غير صحيحة.');
    }
}
