import { Component } from '@angular/core';
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
export class CandidateComponent {
  selectedFile: File | null = null;
  ocrData: any = {};
  isLoading: boolean = false;

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
      email: ['', Validators.required], // email field in the form
      firstname: ['', Validators.required],
      secondname: ['', Validators.required],
      phone: ['', Validators.required],
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

    // Retrieve email from query parameters and set it in the form
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.registrationForm.patchValue({ email });
    }
  }

  get workExperiences(): FormArray {
    return this.registrationForm.get('workExperiences') as FormArray;
  }

  addWorkExperience() {
    const workExperienceForm = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
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
        console.log(response); // Check the response structure here
        const ocrDataArray = response.ocr_data;

        // Ensure fields are populated from the specific array indices
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
      // Mark all fields as touched to trigger validation messages
      this.registrationForm.markAllAsTouched();

      // Optionally, log to the console or show a toast for invalid form submission
      console.log('Form is invalid. Please fill all required fields.');

      // Show a toast to indicate that the form is incomplete
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['error-toast']
      });

      return;
    }

    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      // Mapping form data to match the required JSON format
      const requestData = {
        name: `${formData.firstname} ${formData.secondname}`,
        email: formData.email,
        phone: formData.phone,
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
          postion: experience.position,
          reason: experience.reason,
          company_name: experience.company,
          start_date: experience.startDate,
          end_date: experience.endDate
        }))
      };

      this.http.post('http://localhost:8080/api/entry_managment_sys/candidate', requestData)
        .subscribe(
          (response) => {
            console.log('Form successfully submitted:', response);

            // Show success toast and navigate to login page
            this.snackBar.open('You are registered successfully', 'Close', {
              duration: 3000, // 3 seconds
            });
            this.router.navigate(['sucess']);
          },
          (error) => {
            console.error('Error submitting form:', error);
          }
        );
    } else {
      console.log('Form is invalid. Please fill all required fields.');
    }
  }
}
