<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PatientController extends Controller
{
    //
    public function store(Request $request)
    {
        $validatedData = $request -> validate([
            'firstName' => 'required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'gender' => 'required|string|max:10',
            'dob' => 'required|date',
            'homePhone' => 'nullable|string|max:15',
            'workPhone' => 'nullable|string|max:15',
            'cellPhone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'city' => 'nullable|string|max:20',
            'state' => 'nullable|string|max:20',
            'zip' => 'nullable|string|max:10',
            'ssn' => 'nullable|string|max:10'
        ]);

        $patient = Patient::create($validatedData);

        return response() -> json([
            'message' => 'Patient Saved Successfully',
            'patient' => $patient
        ], 201);
    }
}
