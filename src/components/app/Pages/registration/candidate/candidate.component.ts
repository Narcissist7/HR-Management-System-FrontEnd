import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // Import the MessageService for toast notifications
import { ToastModule } from 'primeng/toast'; // Import the ToastModule
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-registration-two',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, NgFor, HttpClientModule, NgIf,
    ToastModule, DropdownModule, ButtonModule, InputTextModule, ProgressSpinnerModule
  ],
  providers: [MessageService],
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  selectedFile: File | null = null;
  ocrData: any = {};
  isLoading: boolean = false;
  jobTitles: string[] = []; // Array to store job titles

  registrationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService // Inject MessageService for toasts
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
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch job titles', life: 5000 });
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

  selectedImageFile: File | null = null;
  selectedPdfFile: File | null = null;


  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  onPdfSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPdfFile = file;
    }
  }

  onUpload() {
    if (!this.selectedImageFile || !this.selectedPdfFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'File Missing',
        detail: 'Please select both an image and a PDF file to upload.',
        life: 5000
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedImageFile);
    formData.append('pdf', this.selectedPdfFile);

    this.isLoading = true;

    this.http.post<any>('http://127.0.0.1:5000/cashout', formData).subscribe(
      (response) => {
        const ocrDataArray = response.ocr_data;
        const cvDataArray = response.cv_data;

        // Populate form fields with OCR and CV data
        this.registrationForm.patchValue({
          egyptianId: ocrDataArray[2] || '',
          firstname: ocrDataArray[0] || '',
          secondname: ocrDataArray[1] || '',
          dob: ocrDataArray[3] || '',
          address: ocrDataArray[4] || '',
          gender: ocrDataArray[5] || '',
          birthPlace: ocrDataArray[6] || '',
          email: cvDataArray[1] || '',
          phone: cvDataArray[0]|| ''
          // Add more fields if needed based on your cvData structure
        });

        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'File Uploaded',
          detail: 'OCR and resume data fetched successfully!',
          life: 5000
        });
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error uploading the files.',
          life: 5000
        });
      }
    );
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Form Incomplete', detail: 'Please fill in all required fields.', life: 5000 });
      return;
    }

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
          this.messageService.add({ severity: 'success', summary: 'Registration Successful', detail: 'You are registered successfully!', life: 3000 });
          this.router.navigate(['success']);
        },
        (error) => {
          console.error('Error submitting form:', error);
          this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: 'An error occurred while registering.', life: 5000 });
        }
      );
  }
}
