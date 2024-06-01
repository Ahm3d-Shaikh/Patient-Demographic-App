<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstName',
        'middleName',
        'lastName',
        'email',
        'gender',
        'dob',
        'homePhone',
        'workPhone',
        'cellPhone',
        'address',
        'city',
        'state',
        'zip',
        'ssn'
    ];

    public function appointments(){
        return $this -> hasMany(Appointment::class);
    }
}
