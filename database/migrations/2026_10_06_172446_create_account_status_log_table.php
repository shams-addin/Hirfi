<?php

use App\Enums\AccountState;
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
        Schema::create('account_status_log', function (Blueprint $table) {
            $table->id('log_id');
            $table->enum('new_state', AccountState::cases());
            $table->date('change_date');
            $table->text('reason')->nullable();
            $table->foreignId('user_id')->constrained(table: 'users', column: 'user_id');
            $table->foreignId('supervisor_id')->constrained(table: 'supervisors', column: 'supervisor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_status_log');
    }
};
