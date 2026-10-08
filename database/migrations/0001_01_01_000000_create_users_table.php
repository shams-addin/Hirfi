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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->date('birth_date');
            $table->string('pass_key');
            $table->string('phone', length:10)->unique();
            $table->string('address');
            $table->string('nationality');
            $table->string('profile_picture')->nullable();
            $table->enum('account_state', AccountState::cases())->default(AccountState::ACTIVATED);
        });

         Schema::create('sessions', function (Blueprint $table) {
             $table->string('id')->primary();
             $table->foreignId('user_id')->nullable()->index();
             $table->string('ip_address', 45)->nullable();
             $table->text('user_agent')->nullable();
             $table->longText('payload');
             $table->integer('last_activity')->index();
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('sessions');
    }
};
