<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FirmsSeeder extends Seeder {
    public function run()
    {
        DB::table('firms') -> insert([
            ['name' => 'HealthCare Legal Solutions', 'city' => 'Lahore', 'state' => 'Punjab', 'zip' => '12345'],
            ['name' => 'Global Legal Advisors', 'city' => 'Faisalabad', 'state' => 'Punjab', 'zip' => '54960'],
            ['name' => 'Health Tech', 'city' => 'Islamabad', 'state' => 'Punjab', 'zip'=> '35782']
        ]);
    }
}