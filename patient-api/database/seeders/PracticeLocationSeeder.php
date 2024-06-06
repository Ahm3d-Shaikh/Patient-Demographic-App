<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PracticeLocationSeeder extends Seeder {
    public function run()
    {
        DB::table('practice_locations') -> insert([
            ['name' => 'Clinic A', 'city' => 'Lahore', 'state' => 'Punjab', 'zip' => '12345'],
            ['name' => 'Clinic B', 'city' => 'Faisalabad', 'state' => 'Punjab', 'zip' => '54960'],
            ['name' => 'Clinic C', 'city' => 'Islamabad', 'state' => 'Punjab', 'zip'=> '35782']
        ]);
    }
}