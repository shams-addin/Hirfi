<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Override;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['nullable', 'string', 'max:255'],
            'birthDate' => ['required', 'date', 'before_or_equal:'.now()->subYears(18)->toDateString()],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['required', 'digits:10', 'unique:users,phone'],
            'address' => ['required', 'string', 'max:255'],
            'nationality' => ['required', Rule::in([
                'libyan', 'sudanese', 'egyptian', 'morocan', 'syrian',
            ])],
            'accountType' => ['required', Rule::in(['customer', 'provider'])],

            'serviceType' => [
                'exclude_unless:accountType,provider',
                'required',
                'integer',
                'exists:categories,category_id',
            ]
        ];
    }

    #[Override]
    public function messages(): array
    {
        return [
            'firstName.required' => 'حقل الاسم مطلوب',
            'birthDate.required' => 'حقل تاريخ الميلاد مطلوب',
            'birthDate.before_or_equal' => 'يجب أن يكون عمرك 18 عاماً أو أكثر',
            'password.required' => 'حقل كلمة المرور مطلوب',
            'password.min' => 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
            'password.confirmed' => 'كلمة المرور غير متطابقة',
            'phone.required' => 'حقل الهاتف مطلوب',
            'phone.digits' => 'رقم الهاتف يجب أن يتكون من 10 أرقام',
            'phone.unique' => 'رقم الهاتف مسجل مسبقاً',
            'address.required' => 'حقل العنوان مطلوب',
            'nationality.required' => 'يجب عليك اختيار الجنسية',
            'accountType.required' => 'اختر نوع الحساب',
            'serviceType.required' => 'اختر نوع الخدمة'
            ];
    }
}
