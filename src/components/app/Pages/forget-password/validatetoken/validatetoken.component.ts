import { Component } from '@angular/core';
import { NgIf } from "@angular/common";
import { PaginatorModule } from "primeng/paginator";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validatetoken',
  standalone: true,
  imports: [
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './validatetoken.component.html',
  styleUrls: ['./validatetoken.component.css'],
  providers: [MessageService]
})
export class ValidatetokenComponent {
  validateToken: FormGroup;
  isLoading: boolean = false; // Spinner visibility control
  email: string = ''; // Store the email passed from the previous page
  countdown: number = 0; // Countdown in seconds for resend button
  isResendDisabled: boolean = false; // Disable resend button while timer is active
  timerInterval: any; // Reference to the timer interval

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.validateToken = this.fb.group({
      verificationCode: ['', Validators.required]
    });

    // Get the email from query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  ngOnDestroy() {
    // Clear the timer on component destruction to prevent memory leaks
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  onSubmit() {
    if (this.validateToken.valid) {
      this.isLoading = true; // Show spinner

      const requestData = {
        email: this.email,
        token: this.validateToken.value.verificationCode,
      };

      this.http.post('api/entry_managment_sys/admin/validateToken', requestData, { observe: 'response' })
        .subscribe(
          (response) => {
            this.isLoading = false; // Hide spinner
            if (response.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Token Validated Successfully',
                detail: 'You can proceed further...',
                life: 4000,
              });

              // Pass email as a query parameter while navigating to the next page
              setTimeout(() => {
                this.router.navigate(['changePassword'], { queryParams: { email: this.email } });
              }, 2000);
            }
          },
          (error) => {
            this.isLoading = false; // Hide spinner
            if (error.status === 401) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Unauthorized',
                detail: 'The verification code is incorrect.',
                life: 5000,
              });
            } else if (error.status === 403) {
              this.messageService.add({
                severity: 'error',
                summary: 'Token Expired',
                detail: 'The verification code has expired. Please request a new one.',
                life: 5000,
              });
            } else if (error.status === 400) {
              this.messageService.add({
                severity: 'error',
                summary: 'Bad Request',
                detail: 'Invalid request. Please try again.',
                life: 5000,
              });
            } else {
              console.error('Unexpected error:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Unexpected Error',
                detail: 'Something went wrong. Please try again later.',
                life: 5000,
              });
            }
          }
        );
    } else {
      this.validateToken.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Form Incomplete',
        detail: 'Please fill in all required fields.',
        life: 5000,
      });
    }
  }


  onResendCode() {
    if (this.isResendDisabled) {
      return;
    }

    const requestData = { email: this.email };
    this.http.post('api/entry_managment_sys/admin/sendToken', requestData, { observe: 'response' })
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'The email is sent successfully',
              detail: 'Please check your email address...',
              life: 4000
            });
            this.startCountdown(); // Start countdown after a successful resend
          }
        },
        (error) => {
          if (error.status === 404) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Invalid Email',
              detail: 'The provided email is incorrect.',
              life: 5000
            });
          } else {
            console.error('Unexpected error:', error);
          }
        }
      );
  }

  startCountdown() {
    this.countdown = 60; // Set countdown to 60 seconds
    this.isResendDisabled = true;

    // Start timer
    this.timerInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        this.isResendDisabled = false;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
}
