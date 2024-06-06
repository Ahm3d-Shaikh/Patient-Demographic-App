import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientService } from './patient.service';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CaseFormComponent } from './case-form/case-form.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrationComponent, LoginComponent, CaseFormComponent, CaseListComponent, AppointmentFormComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'patient-app';

  patients: any[] = [{name: 'Ahmed', email: 'm.ahm3d.personal@gmail.com'}];

  // constructor(private patientService: PatientService) {}

  // ngOnInit(): void {
  //   this.getPatients();
  // }

  // getPatients():void {
  //   this.patientService.getPatients().subscribe(
  //     (data: any) => {
  //       this.patients = data;
  //       console.log(this.patients);
  //     },

  //     (err: any) => {
  //       console.log("Error fetching patient data", err);
  //     }
  //   );
  // }
}
