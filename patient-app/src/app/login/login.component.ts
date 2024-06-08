import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  };

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;

      this.http.post('/api/v1/login', {email, password}).subscribe({
        next: (response: any) => {
          localStorage.setItem('token',response.token);
          localStorage.setItem('patientId', response.patientId);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/home']);
        },

        error: (err) => {
          if(err.status === 404){
            this.errorMessage = 'Patient Not Found';
          }
          else if(err.status === 401){
            this.errorMessage = 'Incorrect Email or Password';
          }
          else {
            this.errorMessage = 'Login Failed. Please Try Again Later';
          }
          console.log("Login Failed ", err);
        }
      });
    };
  };

  onForgotPassword(): void {
    console.log("Forgot Password button clicked");
  }
}
