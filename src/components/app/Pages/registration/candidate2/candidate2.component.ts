import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-candidate2',
  standalone: true,
  imports: [NgIf, NgForOf, NgFor, FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './candidate2.component.html',
  styleUrls: ['./candidate2.component.css'],
  providers:[MessageService]
})
export class Candidate2Component {
  isLoading: boolean = false;
  selectedPdf: File | null = null;
  educationData: any[] = [];
  workExperienceData: any[] = [];

  selectedFile: File | null = null;
  ocrData: any = {};
  imagedata : string | null = null ;
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
      martial_status: ['', Validators.required],
    });

    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.registrationForm.patchValue({ email });
    }
  }

  ngOnInit(): void {
    this.fetchJobTitles(); // Fetch job titles when the component initializes
  }

  selectedImageFile: File | null = null;

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  // New method to delete an education entry
  deleteEducation(index: number) {
    if (this.educationData && this.educationData.length > 0) {
      this.educationData.splice(index, 1);
      this.messageService.add({
        severity: 'info',
        summary: 'Education Removed',
        detail: 'Education entry has been deleted.',
        life: 3000
      });
    }
  }

  // New method to delete a work experience entry
  deleteWorkExperience(index: number) {
    if (this.workExperienceData && this.workExperienceData.length > 0) {
      this.workExperienceData.splice(index, 1);
      this.messageService.add({
        severity: 'info',
        summary: 'Work Experience Removed',
        detail: 'Work experience entry has been deleted.',
        life: 3000
      });
    }
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

  onPdfSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedPdf = fileInput.files[0];
    }
  }

  // Function to map Arabic gender to form value
  mapGender(arabicGender: string): string {
    switch (arabicGender) {
      case 'ذكر':
        return 'male';
      case 'انثى':
        return 'female';
      default:
        return '';  // Return empty if gender is not recognized
    }
  }

  onFileUpload() {
    // Check if both files are selected
    if (!this.selectedImageFile && !this.selectedPdf) {
      this.messageService.add({
        severity: 'error',
        summary: 'Files Missing',
        detail: 'Please select at least one file to upload.',
        life: 5000
      });
      return;
    }

    const formData = new FormData();

    // Append files to formData if they exist
    if (this.selectedImageFile) {
      formData.append('file', this.selectedImageFile);
    }

    if (this.selectedPdf) {
      formData.append('pdf', this.selectedPdf);
    }

    this.isLoading = true;  // Set loading to true before request

    // Create an array of requests based on available files
    const requests: Observable<any>[] = [];

    if (this.selectedImageFile) {
      requests.push(
        this.http.post<any>('https://872a-41-65-83-130.ngrok-free.app/visitor', formData)
      );
    }

    if (this.selectedPdf) {
      requests.push(
        this.http.post<any>('https://872a-41-65-83-130.ngrok-free.app/cvdata', formData)
      );
    }

    // Use forkJoin to handle multiple requests
    forkJoin(requests).subscribe({
      next: (responses) => {
        responses.forEach(response => {
          // Handle ID Image OCR response
          if (response.ocr_data) {
            const ocrDataArray = response.ocr_data;
            const genderValue = this.mapGender(ocrDataArray[5] || '');

            // Populate form fields with OCR and CV data
            this.registrationForm.patchValue({
              egyptianId: ocrDataArray[2] || '',
              firstname: ocrDataArray[0] || '',
              secondname: ocrDataArray[1] || '',
              dob: ocrDataArray[3] || '',
              address: ocrDataArray[4] || '',
              gender: genderValue,
              birthPlace: ocrDataArray[6] || '',
            });
            this.imagedata = 'data:image/jpeg;base64,' + response.image;
          }

          // Handle PDF CV response
          if (response.education_data) {
            this.educationData = response.education_data.education;
            this.workExperienceData = response.work_data.work_experience;
            this.registrationForm.patchValue({
              email: response.education_data.email,
              phone: response.education_data.phone_number
            });
          }
        });

        this.messageService.add({
          severity: 'success',
          summary: 'Files Processed',
          detail: 'Your files have been processed successfully!',
          life: 5000
        });
      },
      error: (error) => {
        console.error('Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'File Processing Failed',
          detail: 'An error occurred while processing the files.',
          life: 5000
        });
      },
      complete: () => {
        this.isLoading = false;  // Set loading to false in complete callback
      }
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Form Incomplete',
        detail: 'Please fill in all required fields.',
        life: 5000,
      });
      return;
    }

    const formData = new FormData();
    const candidateData = this.prepareCandidateData();

    // Append candidate data as JSON
    formData.append('candidateData', new Blob([JSON.stringify(candidateData)], { type: 'application/json' }));

    // Append image and CV files if available
    this.appendFiles(formData);

    this.http.post('http://localhost:8080/api/entry_managment_sys/candidate', formData)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'You are registered successfully!',
            life: 3000,
          });
          this.router.navigate(['sucess']);
        },
        (error) => {
          console.error('Error submitting form:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: 'An error occurred while registering.',
            life: 5000,
          });
        }
      );
  }

  // Method to prepare candidate data from the form
  prepareCandidateData() {
    const formValues = this.registrationForm.value;
    return {
      name: `${formValues.firstname} ${formValues.secondname}`,
      email: formValues.email,
      phone: formValues.phone,
      job_title: formValues.job_title,
      dob: formValues.dob,
      gender: formValues.gender,
      pob: formValues.birthPlace,
      military_status: formValues.militaryStatus,
      ssn: formValues.egyptianId,
      address: formValues.address,
      martial_status: formValues.martial_status,
      educations: this.educationData
        .filter((edu: any) => edu && edu.university && edu.degree && edu.major)
        .map((edu: any) => ({
          university: edu.university,
          degree: edu.degree,
          major: edu.major,
          date: edu.date,
          grade: edu.grade,
        })),
      experiences: this.workExperienceData
        .filter((work: any) => work && work.company_name && work.position)
        .map((work: any) => ({
          company_name: work.company_name,
          postion: work.position,
          date: work.date,
          reason: work.reason
        })),
    };
  }
  // Method to append image and CV files to FormData
  appendFiles(formData: FormData) {
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
    if (this.selectedPdf) {
      formData.append('cv', this.selectedPdf);
    }

    if (this.imagedata) {
      const base64Data = this.imagedata.split(',')[1];
      const binaryData = atob(base64Data);
      const byteArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      const imageBlob = new Blob([byteArray], { type: 'image/jpeg' });
      formData.append('pic', imageBlob, 'image.jpg');
    }
  }
}
