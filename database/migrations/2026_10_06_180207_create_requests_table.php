<?php

use App\Enums\RequestStatus;
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
        Schema::create('requests', function (Blueprint $table) {
            $table->id('request_id');
            $table->text('description');
            $table->string('pic')->nullable();
            $table->string('request_address');
            $table->timestamp('request_date')->useCurrent();
            $table->enum('request_state', RequestStatus::cases())->default(RequestStatus::PENDING);
            $table->foreignId('provider_id')->constrained(table: 'providers', column: 'provider_id');
            $table->foreignId('customer_id')->constrained(table: 'users', column: 'user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
