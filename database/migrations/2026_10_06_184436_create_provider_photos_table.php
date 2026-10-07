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
        Schema::create('provider_photos', function (Blueprint $table) {
            $table->foreignId('provider_id')->constrained(table: 'providers', column: 'provider_id');
            $table->integer('pic_number', autoIncrement: true);
            $table->string('pic');
            $table->primary(['provider_id', 'pic_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_photos');
    }
};
