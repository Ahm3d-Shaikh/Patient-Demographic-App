import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-case-list',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.css'
})
export class CaseListComponent implements OnInit{
  cases: any[] = []
  role: string | null = '';

  constructor(private http: HttpClient, private router: Router){

  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.fetchCases();
  }

  fetchCases() : void {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const patientId = localStorage.getItem('patientId');

    this.http.get<any[]>('/api/v1/cases', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'role': role || '',
        'patientId': patientId || ''
      }
    }).subscribe({


      next: (response) => {
        this.cases = response
      },

      error: (err) => console.log("Error while fetching cases ", err)
    });
    // const patientId = localStorage.getItem('patientId');
    // this.http.get(`/api/v1/cases?patientId=${patientId}`).subscribe({
    //   next: (response: any) => {
    //     this.cases = response;
    //   },

    //   error: (err) => {
    //     console.log("Error while fetching cases ", err);
    //   }
    // })
  };

  viewCase(caseId: number) : void {
    this.router.navigate(['/case-detail', caseId]);
  }

  isAdmin() : boolean {
    return this.role === 'Admin';
  }

  deleteCase(caseId: number) : void{
    this.http.delete(`/api/v1/cases/${caseId}`).subscribe({
      next: (response) => {
        console.log("Case Deleted Successfully");
        this.fetchCases();
      },

      error : (err) => {
        console.log("Error while deleting case ", err);
      }
    });
  };
}
