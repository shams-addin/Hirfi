<?php

use App\Enums\ReportStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id('report_id');
            $table->enum('report_type', ReportStatus::cases())->default(ReportStatus::NEW);
            $table->text('description')->nullable();
            $table->timestamp('report_date')->useCurrent();
            $table->foreignId('reporter_id')->constrained(table: 'users', column: 'user_id');
            $table->foreignId('reported_id')->constrained(table: 'users', column: 'user_id');
            $table->foreignId('supervisor_id')->constrained(table: 'supervisors', column: 'supervisor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
