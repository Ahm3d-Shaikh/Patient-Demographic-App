import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-case-list',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.css'
})
export class CaseListComponent implements OnInit{
  cases: any[] = []
  role: string | null = '';
  filters: any = {};
  categories: string[] = ['A', 'B', 'C'];
  purposesOfVisit: string[] = ['Routine Checkup', 'Emergency', 'Blood Donation'];
  caseTypes: string[] = ['Serious', 'Normal', 'Out of Danger'];
  practiceLocations: string[] = [];
  insuranceNames: string[] = [];
  firmNames: string[] = [];
  specialities: string[] = [];
  doctors: string[] = [];
  showFilterModal: boolean = false;
  isFiltered: boolean = false;

  constructor(private http: HttpClient, private router: Router){

  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.fetchDropDownData();
    this.fetchCases();
  }

  fetchDropDownData() : void{
    this.http.get<string[]>('/api/v1/practice-locations').subscribe({
      next : (response) => {
        this.practiceLocations = response
      },
      error: (err) => {
        console.log("Error fetching practice locations ", err);
      }
    });


    this.http.get<string[]>('/api/v1/firms').subscribe({
      next : (response) => {
        this.firmNames = response;
      },

      error: (err) => {
        console.log("Error fetching firm names ", err);
      }
    });


    this.http.get<string[]>('/api/v1/insurances').subscribe({
      next : (response) => {
        this.insuranceNames = response;
      },

      error: (err) => {
        console.log("Error fetching insurances names ", err);
      }
    });

    this.http.get<string[]>('/api/v1/doctor-name').subscribe({
      next: (response) => {
        this.doctors = response;
      },
      error: (err) => console.log("Error fetching doctors ", err)
    });

    this.http.get<string[]>('/api/v1/specialities').subscribe({
      next: (response) => {
        this.specialities = response;
      },
      error: (err) => console.log("Error fetching specialities ", err)
    });

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
      },
      params: this.filters
    }).subscribe({


      next: (response) => {
        this.cases = response
      },

      error: (err) => console.log("Error while fetching cases ", err)
    });
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

  openFilterModal(): void {
    this.showFilterModal = true;
  }

  closeFilterModal(): void {
    this.showFilterModal = false;
  }

  applyFilters() : void{
    this.showFilterModal = false;
    this.isFiltered = true;
    this.fetchCases();
  }
}
