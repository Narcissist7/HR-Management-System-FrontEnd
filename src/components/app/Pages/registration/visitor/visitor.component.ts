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
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.isLoading = true;

    this.http.post<any>('http://127.0.0.1:5000/visitor', formData).subscribe(
      (response) => {
        // Extract OCR data
        const ocrDataArray = response.ocr_data;

        // Set form fields using OCR data
        this.registrationForm.patchValue({
          firstname: ocrDataArray[0] || '',
          secondname: ocrDataArray[1] || '',
          egyptianId: ocrDataArray[2] || '',
          dob: ocrDataArray[3] || '',
          address: ocrDataArray[4] || '',
          // gender: ocrDataArray[5] || '',
          gender: this.mapGender(ocrDataArray[5] || ''),
          birthPlace: ocrDataArray[6] || ''
        });

        // Set base64 image data for display
        this.imagedata = 'data:image/jpeg;base64,' + response.image;

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

    formData.append('pic', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));
    formData.append('pic', this.imagedata as string);



    this.http.post('http://localhost:8080/api/entry_managment_sys/visitor', formData, { observe: 'response', responseType: 'text' })
      .subscribe(
        (response) => {
          if (response.status === 208) {
            this.messageService.add({ severity: 'warn', summary: 'User already exists', detail: 'User already exists in the database! Redirecting...', life: 5000 });
            setTimeout(() => {
              this.router.navigate(['/logEntry']);
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

  private mapGender(ocrGender: string) {
    const normalizedGender = ocrGender.trim().toLowerCase(); // Normalize for comparison
    if (normalizedGender === 'male' || normalizedGender === 'm') {
      return 'ذكر';
    } else if (normalizedGender === 'female' || normalizedGender === 'f') {
      return 'أنثى';
    }
    return '';

  }
}
