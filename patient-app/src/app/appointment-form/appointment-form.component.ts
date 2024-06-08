import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm : FormGroup;
  practiceLocations : string[] = [];
  appointmentTypes : string[] = ['Type 1', 'Type 2', 'Type 3'];
  doctors: string[] = [];
  speciality: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.appointmentForm = this.fb.group({
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      practiceLocation: ['', Validators.required],
      appointmentType: ['', Validators.required],
      speciality: ['', Validators.required],
      doctor: ['', Validators.required],
      duration: ['', Validators.required],
      comments: ['']

    });
  }

  ngOnInit(): void {
    this.fetchPracticeLocations();
    this.fetchSpecialities();
    this.fetchDoctors();
  }

  fetchDoctors() : void {
    this.http.get<string[]>('/api/v1/doctor').subscribe({
      next: (response) => {
        this.doctors = response;
      },

      error: (err) => {
        console.log("Error while fetching doctors ", err);
      }
    });
  }

  fetchSpecialities() : void {
    this.http.get<string[]>('/api/v1/speciality').subscribe({
      next : (response) => {
        this.speciality = response;
      },

      error: (err) => {
        console.log("Error while fetching specialities ",err);
      }
    });
  };

  fetchPracticeLocations() : void {
    this.http.get<string[]>('/api/v1/practice-locations').subscribe({
      next: (response) => {
        this.practiceLocations = response;
      },
      error: (err) => {
        console.log("Error fetching data from database", err);
      }
    });
  };

  onSubmit(event: Event) : void {
    const patientId = localStorage.getItem('patientId');
    const formData = {... this.appointmentForm.value, patientId};
    if(this.appointmentForm.valid) {

      this.http.post('/api/v1/appointments', (formData)).subscribe({
        next: (response) => {
          console.log("Appointment added Successfully");
          this.router.navigate(['/case-list']);

        },

        error: (err) => {
          console.log("Error while submitting the form", err);
        }
      });
    }

    else{
      console.log("Form is invalid");
    };
  };

  onCancel() : void {
    this.router.navigate(['/case-form']);
  }
}
