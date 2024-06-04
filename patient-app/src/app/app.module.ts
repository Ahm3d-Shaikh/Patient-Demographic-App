import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { provideHttpClient, withFetch } from '@angular/common/http';

import { PatientService } from "./patient.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from './app.routes';
import { AuthInterceptor } from "./auth-interceptor";



@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],

    providers: [PatientService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        provideHttpClient(withFetch())
    ],

})

export class AppModule {}