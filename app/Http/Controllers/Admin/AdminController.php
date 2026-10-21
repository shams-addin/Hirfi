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
use Illuminate\Database\Eloquent\Builder;
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
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
        ]);
        $search = trim($validated['search'] ?? '');
        $users = null;

        if ($search !== '') {
            $searchTerms = preg_split('/\s+/', $search, -1, PREG_SPLIT_NO_EMPTY) ?: [];

            $users = User::query()
                ->where(function (Builder $query) use ($search, $searchTerms): void {
                    $query->where('phone', 'like', "%{$search}%")
                        ->orWhere(function (Builder $nameQuery) use ($searchTerms): void {
                            foreach ($searchTerms as $searchTerm) {
                                $nameQuery->where(function (Builder $namePartQuery) use ($searchTerm): void {
                                    $namePartQuery
                                        ->where('first_name', 'like', "%{$searchTerm}%")
                                        ->orWhere('last_name', 'like', "%{$searchTerm}%");
                                });
                            }
                        });
                })
                ->get(['user_id', 'first_name', 'last_name', 'phone', 'account_state'])
                ->map(fn (User $user): array => [
                    'user_id' => $user->user_id,
                    'user_name' => trim("{$user->first_name} {$user->last_name}"),
                    'phone' => $user->phone,
                    'account_state' => $user->account_state,
                ]);
        }

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

        return redirect('/admin-dashboard')->with('success', 'تم حفظ الفئة بنجاح');
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

        return redirect('/admin-dashboard')->with('success', 'تم إنشاء حساب المشرف بنجاح');
    }
    
    public function updateSupervisor(RegistrationRequest $request, int $id): RedirectResponse
    {
        $validated = $request->validated();

        Supervisor::where('supervisor_id', $id)
            ->update([
                'first_name' => $validated['firstName'],
                'second_name' => $validated['secondName'],
                'last_name' => $validated['lastName'],
                'pass_key' => Hash::make($validated['password']),
                'phone' => $validated['phone'],
        ]);

        return redirect('/admin-dashboard')->with('success', 'تم تحديث بيانات المشرف');
    }

    public function search(Request $request)
    {
        return $this->index($request);
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

        return redirect('/admin-dashboard')
            ->with('success', 'تم تعديل اسم الفئة');
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

        return redirect('/admin-dashboard')
            ->with('success', 'تم حذف الفئة');
    }
}
