import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {NgFor, NgForOf, NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visitor',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.css'
})



export class VisitorComponent {
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
      firstname: ['', Validators.required],
      secondname: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      birthPlace: ['', Validators.required],
      address: ['', Validators.required],
      visitee: ['', Validators.required],
    });


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

    const formData = this.registrationForm.value;

    // Mapping form data to match the required JSON format
    const requestData = {
      name: `${formData.firstname} ${formData.secondname}`,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      pob: formData.birthPlace,
      ssn: formData.egyptianId,
      address: formData.address,
      visitee: formData.visitee
    };

    // Ensure responseType is set to 'text' to handle plain text response
    this.http.post('http://localhost:8080/api/entry_managment_sys/visitor', requestData, { observe: 'response', responseType: 'text' })
      .subscribe(
        (response) => {
          if (response.status === 208) {
            // Redirect to "alreadyexists" page if status is ALREADY_REPORTED
            this.router.navigate(['alreadyexists']);
          } else if (response.status === 200) {
            // Show success toast message and redirect to "success" page
            this.snackBar.open('Visitor registered successfully!', 'Close', {
              duration: 5000, // 5 seconds
              panelClass: ['success-toast'] // Custom CSS class for green background
            });
            this.router.navigate(['sucess']); // Redirect to "success" page
          } else if (response.body === "Not registered") {
            // Display red toast message if user is not registered
            this.snackBar.open('User is not registered', 'Close', {
              duration: 5000, // 5 seconds
              panelClass: ['error-toast']
            });
          } else if (response.body?.includes('logged in')) {
            // Show success toast and navigate to home page
            this.snackBar.open(response.body, 'Close', {
              duration: 5000, // 5 seconds
            });
            this.router.navigate(['home']);
          }
        },
        (error) => {
          console.error('Error submitting form:', error);
          // Add error handling for unexpected response parsing issues
          if (error instanceof SyntaxError) {
            console.error('Syntax Error:', error.message);
            this.snackBar.open('There was an issue with the response format.', 'Close', {
              duration: 5000,
              panelClass: ['error-toast']
            });
          }
        }
      );
  }






}
