import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './doctor-page.component.html',
  styleUrl: './doctor-page.component.css'
})
export class DoctorPageComponent implements OnInit{
  
  firstName: string = ''
  lastName: string = ''

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    const patientId = localStorage.getItem('patientId');
    if (patientId) {
      this.fetchDoctorDetails(patientId);
    }
  }

  fetchDoctorDetails(patientId: string) : void {
    this.http.get(`/api/v1/doctor/${patientId}`).subscribe({
      next: (response: any) => {
        this.firstName = response.firstName;
        this.lastName = response.lastName;
      },

      error: (err: any) => {
        console.log("Error while fetching doctor details ", err);
      }
    });
  };
}
