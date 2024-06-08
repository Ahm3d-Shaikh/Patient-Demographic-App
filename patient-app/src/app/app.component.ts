import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CaseFormComponent } from './case-form/case-form.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrationComponent, LoginComponent, CaseFormComponent, CaseListComponent, AppointmentFormComponent, CaseDetailComponent, CommonModule, RouterModule,NavbarComponent, AdminPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'patient-app';
  showNavbar : boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.showNavbar = !this.isLoginOrRegisterRoute(event.urlAfterRedirects);
      };
    });
  };

  isLoginOrRegisterRoute(url: string) : boolean{
    return url === '/login' || url === '/register';
  };
}
