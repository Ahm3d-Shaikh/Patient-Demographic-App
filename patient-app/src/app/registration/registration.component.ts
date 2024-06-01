import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Correct import

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      homePhone: [''],
      workPhone: [''],
      cellPhone: ['', Validators.required],
      address: ['', Validators.required],
      city: [''],
      state: [''],
      zip: [''],
      ssn: [''],
    })
  }

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log("OnSubmit m agaya hai");
    console.log("Valid h ya nh: ", this.registrationForm.valid);
    if (this.registrationForm.valid) {
      console.log("if condition k andar");
      this.http.post('/api/v1/patients/', this.registrationForm.value).subscribe({
        next: (response) => {
          console.log("Patient Saved Successfully ", response);
          this.router.navigate(['/login']);
        },

        error: (err) => {
          console.log("Error saving patient ", err);
        }
      });
    }
    else{
      console.log("Form is invalid");
    }
  }
}
