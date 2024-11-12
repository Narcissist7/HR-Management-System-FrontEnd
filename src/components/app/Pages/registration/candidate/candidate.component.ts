import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-two',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, NgFor, HttpClientModule, NgIf, MatSnackBarModule
  ],
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  selectedFile: File | null = null;
  ocrData: any = {};
  isLoading: boolean = false;
  jobTitles: string[] = []; // Array to store job titles

  // Registration form with nested arrays for work experiences and education fields
  registrationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = this.fb.group({
      egyptianId: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      secondname: ['', Validators.required],
      phone: ['', Validators.required],
      job_title: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      birthPlace: ['', Validators.required],
      address: ['', Validators.required],
      militaryStatus: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      workExperiences: this.fb.array([]),
      university: ['', Validators.required],
      degree: ['', Validators.required],
      grade: ['', Validators.required],
      major: ['', Validators.required],
      uniDate: ['', Validators.required]
    });

    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.registrationForm.patchValue({ email });
    }
  }

  ngOnInit(): void {
    this.fetchJobTitles(); // Fetch job titles when the component initializes
  }

  fetchJobTitles(): void {
    this.http.get<string[]>('http://localhost:8080/api/entry_managment_sys/jobtitles')
      .subscribe(
        (data) => {
          this.jobTitles = data;
        },
        (error) => {
          console.error('Error fetching job titles:', error);
        }
      );
  }

    get workExperiences(): FormArray {
    return this.registrationForm.get('workExperiences') as FormArray;
  }

  addWorkExperience() {
    const workExperienceForm = this.fb.group({
      company: ['', Validators.required],
      postion: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
    this.workExperiences.push(workExperienceForm);
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.isLoading = true;

    this.http.post<any>('http://127.0.0.1:5000/cashout', formData).subscribe(
      (response) => {
        const ocrDataArray = response.ocr_data;

        this.registrationForm.patchValue({
          firstname: ocrDataArray[0] || '',
          secondname: ocrDataArray[1] || '',
          egyptianId: ocrDataArray[2] || '',
          dob: ocrDataArray[3] || '',
          address: ocrDataArray[4] || '',
          gender: ocrDataArray[5] || '',
          birthPlace: ocrDataArray[6] || ''
        });
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['error-toast']
      });
      return;
    }

    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const requestData = {
        name: `${formData.firstname} ${formData.secondname}`,
        email: formData.email,
        phone: formData.phone,
        job_title: formData.job_title,
        dob: formData.dob,
        gender: formData.gender,
        pob: formData.birthPlace,
        military_status: formData.militaryStatus,
        ssn: formData.egyptianId,
        address: formData.address,
        martial_status: formData.maritalStatus,
        educations: [
          {
            university: formData.university,
            degree: formData.degree,
            grade: formData.grade,
            major: formData.major,
            date: formData.uniDate,
          }
        ],
        experiences: formData.workExperiences.map((experience: any) => ({
          postion: experience.postion,
          reason: experience.reason,
          company_name: experience.company,
          start_date: experience.startDate,
          end_date: experience.endDate
        }))
      };

      this.http.post('http://localhost:8080/api/entry_managment_sys/candidate', requestData)
        .subscribe(
          (response) => {
            this.snackBar.open('You are registered successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['sucess']);
          },
          (error) => {
            console.error('Error submitting form:', error);
          }
        );
    }
  }
}
