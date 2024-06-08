<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('doctors')->insert([
            [
                'name' => 'Dr. John Doe',
                'speciality' => 'Cardiology',
                'years_of_experience' => 15,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Dr. Jane Smith',
                'speciality' => 'Neurology',
                'years_of_experience' => 10,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Dr. Alice Johnson',
                'speciality' => 'Orthopedics',
                'years_of_experience' => 12,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
