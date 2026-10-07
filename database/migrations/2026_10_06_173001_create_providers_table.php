<?php

use App\Enums\ProviderStatus;
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
        Schema::create('providers', function (Blueprint $table) {
            $table->foreignId('provider_id')->constrained(table: 'users', column: 'user_id');
            $table->enum('provider_state', ProviderStatus::cases())->default(ProviderStatus::BUSY);
            $table->float('star_avg');// for now it is float
            $table->foreignId('category_id')->constrained(table: 'categories', column: 'category_id');

            $table->primary('provider_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('providers');
    }
};
