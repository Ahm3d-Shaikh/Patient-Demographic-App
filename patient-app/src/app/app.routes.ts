import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CaseFormComponent } from './case-form/case-form.component';
import { CaseListComponent } from './case-list/case-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {path: 'case-form', component: CaseFormComponent},
  {path: 'case-list', component: CaseListComponent},
  {path: 'appointment-form', component: AppointmentFormComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/register' } // Wildcard route for a 404 page or redirect to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
