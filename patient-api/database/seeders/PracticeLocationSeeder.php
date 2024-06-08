<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PracticeLocationSeeder extends Seeder {
    public function run()
    {
        DB::table('practice_locations') -> insert([
            ['name' => 'Downtown Medical Center', 'city' => 'Lahore', 'state' => 'Punjab', 'zip' => '12345'],
            ['name' => 'WestSide Health Clinic', 'city' => 'Faisalabad', 'state' => 'Punjab', 'zip' => '54960'],
            ['name' => 'Sector H12 Clinic', 'city' => 'Islamabad', 'state' => 'Punjab', 'zip'=> '35782']
        ]);
    }
}