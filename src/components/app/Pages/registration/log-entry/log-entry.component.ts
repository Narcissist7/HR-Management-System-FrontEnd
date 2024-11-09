import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-log-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule,NgFor , NgIf
  ],
  templateUrl: './log-entry.component.html',
  styleUrl: './log-entry.component.css'
})
export class LogEntryComponent {

  registrationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = this.fb.group({
      nid: ['', Validators.required],
      visitee: ['', Validators.required],
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
              const logResponse: any = response.body; // Assuming the response body is of type LogResponse

              if (logResponse.status === 'success') {
                let message = logResponse.message;
                if (message === 'logged in as Visitor') {
                  this.router.navigate(['sucess']);
                } else if (message === 'logged in as a Candidate') {
                  this.router.navigate(['sucess']);
                }

                // Show success toast message
                this.snackBar.open(message, 'Close', {
                  duration: 5000,
                  panelClass: ['success-toast']
                });
              } else if (logResponse.status === 'failed' && logResponse.message === 'Not registered') {
                // Navigate to home if not registered
                this.router.navigate(['home']);

                // Show error toast message if not registered
                this.snackBar.open('Not registered', 'Close', {
                  duration: 5000,
                  panelClass: ['error-toast']
                });
              }
            }
          },
          (error) => {
            if (error.status === 400) {
              this.snackBar.open('Not registered', 'Close', {
                duration: 5000,
                panelClass: ['error-toast']
              });
            } else if (error.status === 500) {
              this.snackBar.open('Internal server error. Please try again.', 'Close', {
                duration: 5000,
                panelClass: ['error-toast']
              });
            } else {
              this.snackBar.open('Unexpected error occurred. Please try again.', 'Close', {
                duration: 5000,
                panelClass: ['error-toast']
              });
            }
            console.error('Error submitting form:', error);
          }
        );
    } else {
      this.registrationForm.markAllAsTouched(); // Mark all fields as touched to display validation messages
      console.log('Form is invalid. Please fill all required fields.');
    }
  }


}
