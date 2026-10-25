<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): void
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'reportType' => 'required|string',
            'description' => 'sometimes',
        ], [
            'reportType.required' => 'تفاصيل العمل مطلوبة',
        ]);

        Report::create([
            'reportType' => $validated['reportType'],
            'description' => $validated['description'] ?? null,
            'reporter_id' => Auth::id(),
            'reported_id' => $request->reportedId,
        ]);

        return back()->with('success', 'تم إرسال بلاغك بنجاح، ستتم مراجعته من قبل الإدارة');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
        //
    }
}
