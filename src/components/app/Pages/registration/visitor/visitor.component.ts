import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-visitor',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    ToastModule,
    NgIf
  ],
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css'],
  providers: [MessageService]
})
export class VisitorComponent {
  selectedFile: File | null = null;
  ocrData: any = {};
  imagedata : string | null = null ;
  isLoading: boolean = false;
  SSN : string | null = null

  registrationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private messageService: MessageService
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

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  onUpload() {
    if (!this.selectedFile) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No File Selected',
        detail: 'Please select a file to upload.',
        life: 5000
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.isLoading = true;

    this.http.post<any>('https://872a-41-65-83-130.ngrok-free.app/visitor', formData)
      .subscribe(
        (response) => {
          const ocrDataArray = response.ocr_data;

          // Log the received OCR data for debugging
          console.log('OCR Data:', ocrDataArray);

          // Validate if there is at least one valid data field
          const hasValidData = ocrDataArray.some((data: string) => data && data !== 'No text found');


          if (!ocrDataArray || ocrDataArray.length === 0 || !hasValidData) {
            this.showUploadError();
            this.isLoading = false;
            return;
          }

          // Helper function to clean OCR data
          const cleanData = (value: string) => (value && value !== 'No text found') ? value : '';

          // Populate the registration form with cleaned OCR data
          this.registrationForm.patchValue({
            firstname: cleanData(ocrDataArray[0]),
            secondname: cleanData(ocrDataArray[1]),
            egyptianId: cleanData(ocrDataArray[2]),
            dob: cleanData(ocrDataArray[3]),
            address: cleanData(ocrDataArray[4]),
            gender: this.mapGender(ocrDataArray[5] || ''),
            birthPlace: cleanData(ocrDataArray[6])
          });

          this.SSN = cleanData(ocrDataArray[2]);
          this.imagedata = 'data:image/jpeg;base64,' + response.image;

          this.isLoading = false;
          this.showSuccess();
          this.showWarn();
        },
        (error) => {
          console.error('Upload Error:', error);
          this.isLoading = false;
          this.showUploadError();
        }
      );
  }

// Display an error message for invalid or unclear uploads
  showUploadError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Upload Failed',
      detail: 'Please upload a clear and valid ID card image.',
      life: 5000
    });
  }

// Display a success message upon successful data extraction
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'OCR Data Fetched',
      detail: 'Your data is extracted successfully.',
      life: 5000
    });
  }

// Display a warning message to recheck OCR data
  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Recheck OCR Data',
      detail: 'Please make sure the fetched data is correct before submitting.',
      life: 15000
    });
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




  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Form Incomplete', detail: 'Please fill in all required fields.', life: 5000 });
      return;
    }

    const formData = new FormData();
    const requestData = {
      name: `${this.registrationForm.value.firstname} ${this.registrationForm.value.secondname}`,
      phone: this.registrationForm.value.phone,
      dob: this.registrationForm.value.dob,
      gender: this.registrationForm.value.gender,
      pob: this.registrationForm.value.birthPlace,
      ssn: this.registrationForm.value.egyptianId,
      address: this.registrationForm.value.address,
      visitee: this.registrationForm.value.visitee
    };


    formData.append('visitorData', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);  // Correct way to send the file
    }

//

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



    this.http.post('http://localhost:8080/api/entry_managment_sys/visitor', formData, { observe: 'response', responseType: 'text' })
      .subscribe(
        (response) => {
          if (response.status === 208) {
            const ssn =this.SSN; // Assuming SSN is returned in the response

            this.messageService.add({
              severity: 'warn',
              summary: 'User already exists',
              detail: `User with SSN ${ssn} already exists in the database! Redirecting...`,
              life: 5000
            });

            setTimeout(() => {
              this.router.navigate(['/logEntry'], { queryParams: { ssn: ssn } });
            }, 3000);

          } else if (response.status === 200) {
            this.snackBar.open('Visitor registered successfully!', 'Close', {
              duration: 5000,
              panelClass: ['success-toast']
            });
            this.router.navigate(['/sucess']);
          } else if (response.body === 'Not registered') {
            this.snackBar.open('User is not registered', 'Close', {
              duration: 5000,
              panelClass: ['error-toast']
            });
          } else if (response.body?.includes('logged in')) {
            this.snackBar.open(response.body, 'Close', { duration: 5000 });
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Error submitting form:', error);
          this.snackBar.open('An error occurred during registration.', 'Close', {
            duration: 5000,
            panelClass: ['error-toast']
          });
        }
      );
  }


}
