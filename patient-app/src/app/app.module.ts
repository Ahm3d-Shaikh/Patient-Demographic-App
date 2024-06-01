import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { PatientService } from "./patient.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    { path: '', redirectTo: '/registration', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
  ];

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],

    providers: [PatientService,
        provideHttpClient(withFetch())
    ],

})

export class AppModule {}