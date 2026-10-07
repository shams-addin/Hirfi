rtisan<?php

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
        // accounte_state
        Schema::create('account_states', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->boolean('account_state')->default(true);
            $table->unsignedBigInteger('supervisor_id');

            $table->foreign('supervisor_id')
                ->references('supervisor_id')
                ->on('supervisors');

            $table->foreign('user_id')
                ->references('user_id')
                ->on('users');

            $table->primary(['supervisor_id', 'user_id']);

        });
        
        // reports
        Schema::create('reports', function (Blueprint $table) {
            $table->unsignedBigInteger('reporter_id');
            $table->unsignedBigInteger('reported_id');
            $table->string('description', length:255)->nullable();
            $table->dateTime('report_date');

            $table->foreign('reporter_id')
                ->references('user_id')
                ->on('users');

            $table->foreign('reported_id')
                ->references('user_id')
                ->on('users');

            $table->primary(['reporter_id', 'reported_id']);

        });
        
        // ratings
        Schema::create('ratings', function (Blueprint $table) {
            $table->unsignedBigInteger('provider_id');
            $table->unsignedBigInteger('customr_id');
            $table->integer('star_number')->nullable();
            $table->string('comment', length:255)->nullable();
            $table->dateTime('rating_date');

            $table->foreign('provider_id')
                ->references('provider_id')
                ->on('providers');

            $table->foreign('customr_id')
                ->references('customr_id')
                ->on('customrs');

            $table->primary(['provider_id', 'customr_id']);
        });
        
        // requests
        Schema::create('requests', function (Blueprint $table) {
            $table->unsignedBigInteger('provider_id');
            $table->unsignedBigInteger('customr_id');
            $table->string('description', length:255)->nullable();
            $table->enum('request_state', ['accepted', 'rejected', 'pending', 'completed'])->default('pending');
            $table->dateTime('request_date');

            $table->foreign('provider_id')
                ->references('provider_id')
                ->on('providers');

            $table->foreign('customr_id')
                ->references('customr_id')
                ->on('customrs');

            $table->primary(['provider_id', 'customr_id']);
        });
        
        // request_addresses
        Schema::create('request_addresses', function (Blueprint $table) {
            $table->unsignedBigInteger('provider_id');
            $table->unsignedBigInteger('customr_id');
            $table->string('address', length:255);

            $table->foreign('provider_id')
                ->references('provider_id')
                ->on('providers');

            $table->foreign('customr_id')
                ->references('customr_id')
                ->on('customrs');

            $table->primary(['provider_id', 'customr_id', 'address']);
        });
        
        // provider_photos
        Schema::create('provider_photos', function (Blueprint $table) {
            $table->unsignedBigInteger('provider_id');
            $table->integer('photo_number');
            $table->string('photo');
            $table->string('address', length:255);

            $table->foreign('provider_id')
                ->references('provider_id')
                ->on('providers');

            $table->primary(['provider_id', 'photo_number']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_states');
        Schema::dropIfExists('reports');
        Schema::dropIfExists('ratings');
        Schema::dropIfExists('requests');
        Schema::dropIfExists('request_addresses');
        Schema::dropIfExists('provider_photos');
    }
};
