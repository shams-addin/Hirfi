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
        Schema::create('supervisors', function (Blueprint $table) {
            $table->id('supervisor_id');
            $table->string('first_name');
            $table->string('second_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('pass_key');
            $table->string('phone', length:10)->unique();
            $table->string('role'); // for now it's string type
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisors');
    }
};
