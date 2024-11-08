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
      egyptianId: ['', Validators.required],
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
    if (this.registrationForm.valid) {
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

      this.http.post('http://localhost:8080/api/entry_managment_sys/visitor', requestData)
        .subscribe(
          (response) => {
            if (response === null) {
              // Display red toast message if user is already registered
              this.snackBar.open('You are already registered before', 'Close', {
                duration: 5000, // 5 seconds
                panelClass: ['error-toast'] // Custom CSS class for red background
              });
              this.router.navigate(['home']);
            } else {
              console.log('Form successfully submitted:', response);

              // Show success toast and navigate to home page
              this.snackBar.open('You are registered successfully', 'Close', {
                duration: 5000, // 5 seconds
              });
              this.router.navigate(['home']);
            }
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
