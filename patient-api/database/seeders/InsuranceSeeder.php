<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InsuranceSeeder extends Seeder {
    public function run()
    {
        DB::table('insurances') -> insert([
            ['name' => 'HealthInsure', 'city' => 'Lahore', 'state' => 'Punjab', 'zip' => '12345'],
            ['name' => 'Jubilee Insurance', 'city' => 'Faisalabad', 'state' => 'Punjab', 'zip' => '54960'],
            ['name' => 'SafeGuard Insure', 'city' => 'Islamabad', 'state' => 'Punjab', 'zip'=> '35782']
        ]);
    }
}