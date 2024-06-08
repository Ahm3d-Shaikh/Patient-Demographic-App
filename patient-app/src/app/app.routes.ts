import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CaseFormComponent } from './case-form/case-form.component';
import { CaseListComponent } from './case-list/case-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path: 'home', component: HomepageComponent, canActivate: [authGuard]},
  { path: 'register', component: RegistrationComponent},
  {path: 'case-form', component: CaseFormComponent},
  {path: 'case-list', component: CaseListComponent, canActivate: [authGuard]},
  {path: 'appointment-form', component: AppointmentFormComponent, canActivate: [authGuard]},
  {path: 'case-detail/:id', component: CaseDetailComponent, canActivate: [authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' } // Wildcard route for a 404 page or redirect to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
