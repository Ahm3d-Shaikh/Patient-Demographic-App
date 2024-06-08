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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('middleName')->nullable();
            $table->string('lastName');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('gender');
            $table->date('dob');
            $table->string('role');
            $table->string('homePhone')->nullable();
            $table->string('workPhone')->nullable();
            $table->string('cellPhone');
            $table->string('address');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('ssn')->nullable();
            $table->timestamps();
        });

        
        Schema::create('practice_locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->timestamps();
            
        });

        Schema::create('insurances', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->timestamps();
            
        });

        Schema::create('firms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->timestamps();
            
        });

        Schema::create('cases', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('practice_location_id');
            $table->string('practice_location');
            $table->string('category');
            $table->string('purpose_of_visit');
            $table->string('case_type')->nullable();
            $table->date('doa')->nullable();
            $table->unsignedBigInteger('insurance_id');
            $table->unsignedBigInteger('firm_id');
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->foreign('practice_location_id')->references('id')->on('practice_locations')->onDelete('cascade');
            $table->foreign('insurance_id')->references('id')->on('insurances')->onDelete('cascade');
            $table->foreign('firm_id')->references('id')->on('firms')->onDelete('cascade');
        });


        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('case_id');
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->string('appointment_type');
            $table->string('speciality');
            $table->string('doctor');
            $table->string('practice_location');
            $table->time('duration');
            $table->unsignedBigInteger('practice_location_id');
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('case_id')->references('id')->on('cases')->onDelete('cascade');
            $table->foreign('practice_location_id')->references('id')->on('practice_locations')->onDelete('cascade');
        });
 

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
        Schema::dropIfExists('practice_locations');
        Schema::dropIfExists('insurances');
        Schema::dropIfExists('firms');
        Schema::dropIfExists('cases');
        Schema::dropIfExists('appointments');
    }
};
