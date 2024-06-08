<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(DoctorsTableSeeder::class);
        $this->call(FirmsSeeder::class);
        $this->call(InsuranceSeeder::class);
        $this->call(PracticeLocationSeeder::class);

    }
}
