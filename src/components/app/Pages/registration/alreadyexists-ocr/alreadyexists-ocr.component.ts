import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-alreadyexists-ocr',
  standalone: true,
  imports: [
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './alreadyexists-ocr.component.html',
  styleUrl: './alreadyexists-ocr.component.css',
  providers:[MessageService]
})
export class AlreadyexistsOCRComponent {
  registrationForm: FormGroup;
  selectedFile: File | null = null;
  ocrData: any = {};
  imagedata : string | null = null ;
  isLoading: boolean = false;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService // Fixed constructor parameter (missing comma)
  ) {
    this.registrationForm = this.fb.group({
      nid: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
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

    this.http.post<any>('http://127.0.0.1:5000/nid', formData).subscribe(
      (response) => {
        // Extract OCR data
        const ocrDataArray = response.ocr_data;



        // Set form fields using OCR data
        this.registrationForm.patchValue({

          nid: ocrDataArray || ''
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

      const requestData = {
        nid: formData.nid,
        visitee: formData.visitee
      };

      this.http.post('http://localhost:8080/api/entry_managment_sys/log', requestData, { observe: 'response' })
        .subscribe(
          (response) => {
            if (response.status === 200 && response.body) {
              const logResponse: any = response.body;

              if (logResponse.status === 'success') {
                let message = logResponse.message;
                if (message === 'logged in as Visitor') {
                  this.router.navigate(['sucess']);
                } else if (message === 'logged in as a Candidate') {
                  this.router.navigate(['sucess']);
                }

                // Show success toast message using PrimeNG MessageService
                this.messageService.add({ severity: 'success', summary: message, detail: 'Success', life: 5000 });
              } else if (logResponse.status === 'failed' && logResponse.message === 'Not registered') {
                // Show error toast message
                this.messageService.add({ severity: 'error', summary: 'This User is not Registered', detail: 'Not found in the database, re-register please', life: 5000 });

                // Delay navigation by 5 seconds
                setTimeout(() => {
                  this.router.navigate(['/home']);
                }, 5000);
              }
            }
          },
          (error) => {
            if (error.status === 400) {
              this.messageService.add({ severity: 'error', summary: 'This User is not Registered', detail: 'Not found in the database, re-register please', life: 5000 });

              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 5000);
            } else if (error.status === 500) {
              this.messageService.add({ severity: 'error', summary: 'Internal server error', detail: 'Please try again.', life: 5000 });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Unexpected error occurred', detail: 'Please try again.', life: 5000 });
            }
            console.error('Error submitting form:', error);
          }
        );
    } else {
      if (this.registrationForm.invalid) {
        this.registrationForm.markAllAsTouched();
        this.messageService.add({ severity: 'error', summary: 'Form Incomplete', detail: 'Please fill in all required fields.', life: 5000 });
        return;
      }
    }
  }

}
