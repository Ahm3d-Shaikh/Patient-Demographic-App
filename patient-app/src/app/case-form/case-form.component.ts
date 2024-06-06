import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './case-form.component.html',
  styleUrl: './case-form.component.css'
})
export class CaseFormComponent implements OnInit {

  caseForm: FormGroup
  constructor(private fb:FormBuilder, private http:HttpClient, private router: Router) {
    this.caseForm = this.fb.group({
      practiceLocation : ['', Validators.required],
      category : ['', Validators.required],
      purposeOfVisit : ['', Validators.required],
      caseType : ['', Validators.required],
      doa : ['', Validators.required],
      firmName : ['', Validators.required],
      streetAddress : [''],
      firmCity: ['', Validators.required],
      firmState: ['', Validators.required],
      firmZip: ['', Validators.required],
      attorneyName: [''],
      attorneyEmail: [''],
      attorneyPhone: [''],
      attorneyExtension: [''],
      insuranceName: ['', Validators.required],
      insuranceCode: [''],
      insuranceCity: ['', Validators.required],
      insuranceState: ['', Validators.required],
      insuranceZip: ['', Validators.required],
      adjusterName: [''],
      adjusterEmail: [''],
      adjusterPhone: [''],
      adjusterExtension: [''],
      accountManager: ['']
    });
  }

  ngOnInit(): void {
    
  };

  onSubmit(event: Event) :void{
    event.preventDefault();

    const patientId = localStorage.getItem('patientId');
    const formData = {...this.caseForm.value, patientId};
    console.log(this.caseForm.valid);

    if(this.caseForm.valid){
      this.http.post('/api/v1/cases/',formData).subscribe({
        next: (response) => {
          console.log("Case added successfully: ", response);
          this.router.navigate(['/appointment-form']);
        },

        error: (err) => {
          console.log("Error while adding case: ", err);
        }
      });
    };
  };
}
