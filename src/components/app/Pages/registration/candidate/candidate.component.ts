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
      maritalStatus: ['', Validators.required],
      workExperiences: this.fb.array([]),
      university: ['', Validators.required],
      degree: ['', Validators.required],
      grade: ['', Validators.required],
      major: ['', Validators.required],
      date: ['', Validators.required]
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

    this.http.post<any>('http://127.0.0.1:5000/candidate', formData).subscribe(
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
          phone: cvDataArray[0]|| '',
          university :cvDataArray[2],
          major:cvDataArray[3],
          degree:cvDataArray[4],
          date : cvDataArray[5]
          // Add more fields if needed based on your cvData structure
        });
        this.imagedata = 'data:image/jpeg;base64,' + response.image;
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

    const formData = new FormData();

    // Append form fields
    const formValues = this.registrationForm.value;
    const candidateData = {
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
      martial_status: formValues.maritalStatus,
      educations: [
        {
          university: formValues.university,
          degree: formValues.degree,
          grade: formValues.grade,
          major: formValues.major,
          date: formValues.uniDate,
        }
      ],
      experiences: formValues.workExperiences.map((experience: any) => ({
        postion: experience.postion,
        reason: experience.reason,
        company_name: experience.company,
        start_date: experience.startDate,
        end_date: experience.endDate
      }))
    };

    // Convert the JSON candidate data to a Blob and append it to formData
    formData.append('candidateData', new Blob([JSON.stringify(candidateData)], { type: 'application/json' }));

    // Append image and cv files
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
    if (this.selectedPdfFile) {
      formData.append('cv', this.selectedPdfFile);
    }

    if (this.imagedata) { // Ensure imagedata is not null
      // Convert base64 image data to Blob
      const base64Data = this.imagedata.split(',')[1]; // Remove the "data:image/jpeg;base64," prefix
      const binaryData = atob(base64Data); // Decode base64 string to binary
      const byteArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      const imageBlob = new Blob([byteArray], { type: 'image/jpeg' }); // Create a Blob from binary data

      formData.append('pic', imageBlob, 'image.jpg'); // Append the Blob to FormData
    }

    // Send request
    this.http.post('http://localhost:8080/api/entry_managment_sys/candidate', formData)
      .subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Registration Successful', detail: 'You are registered successfully!', life: 3000 });
          this.router.navigate(['sucess']);
        },
        (error) => {
          console.error('Error submitting form:', error);
          this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: 'An error occurred while registering.', life: 5000 });
        }
      );
  }


}
