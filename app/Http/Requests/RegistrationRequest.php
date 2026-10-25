<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class RegistrationRequest extends FormRequest
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
            'secondName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['required', 'digits:10', 'unique:supervisors,phone', 'starts_with:09'],
        ];
    }

    #[Override]
    public function messages(): array
    {
        return [
            'firstName.required' => 'حقل الاسم الأول مطلوب',
            'secondName.required' => 'حقل الاسم الثاني مطلوب',
            'lasttName.required' => 'حقل الاسم الأخير مطلوب',
            'password.required' => 'حقل كلمة المرور مطلوب',
            'password.min' => 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
            'password.confirmed' => 'كلمة المرور غير متطابقة',
            'phone.required' => 'حقل الهاتف مطلوب',
            'phone.digits' => 'رقم الهاتف يجب أن يتكون من 10 أرقام',
            'phone.unique' => 'رقم الهاتف مسجل مسبقاً',
            'phone.starts_with' => 'يجب أن يبدأ رقم الهاتف ب09',
        ];
    }
}
