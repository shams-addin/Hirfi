<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class SignUp extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Validation the input
        $validated = $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'sometimes|nullable|string',
            'birth_date' => 'required|date|before:'. now(18)->toDateString(),
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|digits:10|unique:users',
            'address' => 'required|string',
            'nationality' => 'required|string|exists:users,nationality',

            'accountType' => ['required', Rule::in(['customer', 'provider'])],

            'serviceType' => ['required_if:accounType,provider', 'string', 'exists:categories,category_name']
        ],[
            'firstName.required' => 'حقل الأسم مطلوب',
            'birth_date.required' => 'حقل تاريخ الميلاد مطلوب',
            'password.required' => 'حقل كلمة المرور مطلوب',
            'password.min:8' => 'يجب أن يكون عدد الأحرف أكثر من 8',
            'password.confirmed' => 'كلمة المرور غير متطابقة',
            'phone.required' => 'حقل الهاتف مطلوب',
            // 'phone' => 'required|string|digits:10|unique:users',
            'address.required' => 'حقل العنوان مطلوب',
            'nationality.required' => 'يجب عليك أختيار الجنسية',

            'accountType.required' => 'أختر نوع الحساب',

            'serviceType.required' => 'أختر نوع الخدمة'
        ]);

        // try {
            // Create the user
        // DB::transaction(function() use ($validated) {
            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'] ?? null,
                'birth_date' => $validated['birth_date'],
                'pass_key' => Hash::make($validated['pass_key']),
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'nationality' => $validated['nationality']
            ]);

            if ($validated['accountType'] === 'provider') {
                   $provider = Provider::create([]);
                // $category = Category::where('category_name', $validated['serviceType'])->firsOrFail();
                // $user->provider()->create([
                //     'category_id' =>  $category->category_id
                // ]);
            }

            // Log them in
            Auth::login($user, true);
            return redirect()->route('home');
        
        
    }
}
