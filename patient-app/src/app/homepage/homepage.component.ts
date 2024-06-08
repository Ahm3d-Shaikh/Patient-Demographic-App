import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  firstName: string = ''
  lastName: string = ''

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    const patientId = localStorage.getItem('patientId');
    if (patientId) {
      this.fetchPatientDetails(patientId);
    }
  }

  fetchPatientDetails(patientId: string) : void {
    this.http.get(`/api/v1/patients/${patientId}`).subscribe({
      next: (response: any) => {
        this.firstName = response.firstName;
        this.lastName = response.lastName;
      },

      error: (err) => {
        console.log("Error while fetching patient details ", err);
      }
    });
  };
}
