import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-case-list',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.css'
})
export class CaseListComponent implements OnInit{
  cases: any[] = []

  constructor(private http: HttpClient, private router: Router){

  }

  ngOnInit(): void {
    this.fetchCases();
  }

  fetchCases() : void {
    const patientId = localStorage.getItem('patientId');
    this.http.get(`/api/v1/cases?patientId=${patientId}`).subscribe({
      next: (response: any) => {
        this.cases = response;
      },

      error: (err) => {
        console.log("Error while fetching cases ", err);
      }
    })
  };

  viewCase(caseId: number) : void {
    this.router.navigate(['/case-detail', caseId]);
  }
}
