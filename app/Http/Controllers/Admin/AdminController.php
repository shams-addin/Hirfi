<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Models\Admin\Permission;
use App\Models\Admin\Supervisor;
use App\Models\Admin\SupervisorPermission;
use App\Models\Category;
use App\Models\Provider;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::query()->get();
        $categories = Category::query()->get();
        $supervisors = Supervisor::query()->get();
        $permissions = Permission::query()->get();
        $supervisorPermissions = SupervisorPermission::query()->get();
        
        return Inertia::render('admin/AdminDashboard', [
            'users' => $users,
            'categories' => $categories,
            'supervisors' => $supervisors,
            'permissions' => $permissions,
            'supervisorPermissions' => $supervisorPermissions,
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
        $validated = $request->validate([
            'categoryName' => ['required', 'string', 'unique:categories,category_name']
        ], [
            'categoryName.required' => 'يرجى إدخال اسم الفئة',
            'categoryName.unique' => 'اسم الفئة موجود مسبقًا، يرجى إدخال اسم مختلف',
        ]);

        Category::create(['category_name' => $validated['categoryName']]);

        return back()->with('success', 'تم حفظ الفئة بنجاح');
    }
    
    public function storeSupervisor(RegistrationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Supervisor::create([
            'first_name' => $validated['firstName'],
            'second_name' => $validated['secondName'],
            'last_name' => $validated['lastName'],
            'pass_key' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
        ]);

        return back()->with('success', 'تم إنشاء حساب المشرف بنجاح');
    }
    
    public function updateSupervisor(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'firstName' => ['sometimes', 'nullable', 'string', 'max:255'],
            'secondName' => ['sometimes', 'nullable', 'string', 'max:255'],
            'lastName' => ['sometimes', 'nullable', 'string', 'max:255'],
            'password' => ['sometimes', 'nullable', 'string', 'min:8', 'confirmed'],
            'phone' => ['sometimes', 'nullable', 'digits:10', 'starts_with:09', Rule::unique('supervisors', 'phone')->ignore($id, 'supervisor_id')],
        ], [
            'password.min' => 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
            'password.confirmed' => 'كلمة المرور غير متطابقة',
            'phone.digits' => 'رقم الهاتف يجب أن يتكون من 10 أرقام',
            'phone.unique' => 'رقم الهاتف مسجل مسبقاً',
            'phone.starts_with' => 'يجب أن يبدأ رقم الهاتف ب09',
        ]);

        Supervisor::where('supervisor_id', $id)
            ->update(array_filter([
                'first_name' => $validated['firstName'] ?? null,
                'second_name' => $validated['secondName'] ?? null,
                'last_name' => $validated['lastName'] ?? null,
                'pass_key' => Hash::make($validated['password']) ?? null,
                'phone' => $validated['phone'] ?? null,
            ], static fn($value) => $value !== null && $value !== '')
        );

        return back()->with('success', 'تم تحديث بيانات المشرف');
    }

    public function search(Request $search)
    {
        $query = trim($search->input('search'));

        $user = User::where('first_name', 'like', "%{$query}%")
            ->orWhere('phone', 'like', "%{$query}%")
            ->get();
            
        $provider = Provider::find($user->user_id);

        return Inertia::render('admin/AdminDashboard',[
            'users' => $user,
            'provider' => $provider
        ]);
    }

    public function getReports(Request $request)
    {
        $filters = $request->validate([
            'type' => ['required'],
            'from' => ['required', 'date'],
            'to' => ['required', 'date', 'after_or_equal:from'],
        ]);

        $reports = Report::query()
            ->where('report_type', $filters['type'])
            ->whereDate('report_date', '>=', $filters['from'])
            ->whereDate('report_date', '<=', $filters['to'])
            ->orderBydesc('report_date')
            ->get();

        return Inertia::render('admin/AdminDashboard',[
            'reports' => $reports
        ]);
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
    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'status' =>[Rule::in(['activated', 'suspended'])]
            ]);

        User::where('user_id', $id)
            ->update(['account_state' => $validated['status']]);
        
        if ($validated['status'] == 'active' ) {
            return redirect('/admin-dashboard')
                ->with('success', 'تم تفعيل الحساب بنجاح');
        }

        return redirect('/admin-dashboard')
            ->with('success', 'تم إيقاف الحساب بنجاح');
    }

    public function updateCategory(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'categoryName' => ['required', 'string', 'unique:categories,category_name']
        ], [
            'categoryName.required' => 'يرجى إدخال اسم الفئة',
            'categoryName.unique' => 'اسم الفئة موجود مسبقًا، يرجى إدخال اسم مختلف',
        ]);

        Category::where('category_id', $id)
            ->update(['category_name' => $validated['categoryName']]);

        return back()->with('success', 'تم تعديل اسم الفئة');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $otherId = Category::where('category_name', 'أخرى')->value('category_id');

        Provider::where('category_id', $id)
            ->update(['category_id' => $otherId]);

        Category::where('category_id', $id)->delete();

        return back()->with('success', 'تم حذف الفئة');
    }
}
