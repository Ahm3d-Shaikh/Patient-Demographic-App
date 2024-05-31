import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CaseFormComponent } from './case-form/case-form.component';

export const routes: Routes = [
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cases', component: CaseListComponent},
    {path: 'cases/new', component: CaseFormComponent},
    {path: 'cases/edit/:id', component: CaseFormComponent}
];
