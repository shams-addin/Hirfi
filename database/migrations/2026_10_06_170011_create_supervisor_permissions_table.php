<?php

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
        Schema::create('supervisor_permissions', function (Blueprint $table) {
            $table->foreignId('supervisor_id')->constrained(table: 'supervisors', column: 'supervisor_id');
            $table->foreignId('permission_id')->constrained(table: 'permissions', column: 'permission_id');
            $table->date('grant_date');

            $table->primary(['supervisor_id', 'permission_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisor_permissions');
    }
};
