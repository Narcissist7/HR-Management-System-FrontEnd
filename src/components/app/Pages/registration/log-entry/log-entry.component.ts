import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-log-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    ToastModule
  ],
  templateUrl: './log-entry.component.html',
  styleUrls: ['./log-entry.component.css'], // Use styleUrls instead of styleUrl
  providers: [MessageService]
})
export class LogEntryComponent {
  registrationForm: FormGroup;
  private ssn: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService ,
    private route: ActivatedRoute, // Fixed constructor parameter (missing comma)
  ) {
    this.registrationForm = this.fb.group({
      nid: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      visitee: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      this.ssn = params['ssn'] || '';  // Default to empty string if ssn not present

      // If SSN is available, pre-fill the NID field
      if (this.ssn) {
        this.registrationForm.patchValue({ nid: this.ssn });
      }
    });
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
