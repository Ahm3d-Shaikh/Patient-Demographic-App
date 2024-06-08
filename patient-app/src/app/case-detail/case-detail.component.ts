import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './case-detail.component.html',
  styleUrl: './case-detail.component.css'
})
export class CaseDetailComponent implements OnInit{
  

  caseId : number;
  caseDetails: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.caseId = this.route.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    this.fetchCaseDetails();
  }

  fetchCaseDetails() : void {
    this.http.get(`/api/v1/cases/${this.caseId}`).subscribe({
      next : (response) => {
        console.log("Response at client side ", response);
        this.caseDetails = response;
      },

      error: (err) => {
        console.log("Error while fetching case Details ", err);
      }
    });
  }
}
