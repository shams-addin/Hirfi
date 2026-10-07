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
        Schema::create('ratings', function (Blueprint $table) {
            $table->foreignId('provider_id')->constrained(table: 'providers', column: 'provider_id');
            $table->foreignId('customer_id')->constrained(table: 'users', column: 'user_id');
            $table->enum('star_number',[0, 1, 2, 3, 4, 5])->default(0);
            $table->text('comment')->nullable();
            $table->date('rating_date');

            $table->primary(['provider_id', 'customer_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
