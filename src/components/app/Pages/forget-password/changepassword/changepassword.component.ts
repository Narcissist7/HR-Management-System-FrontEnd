import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  providers: [MessageService]
})
export class ChangepasswordComponent {

  changePassword: FormGroup;
  isLoading: boolean = false; // Spinner visibility control
  email: string = ''; // Store the email passed from the previous page

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.changePassword = this.fb.group(
      {
        password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatchValidator }
    );

    // Get the email from query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  // Custom validator to check if passwords match
  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('ConfirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.changePassword.valid) {
      this.isLoading = true; // Show spinner

      const requestData = {
        email: this.email,
        password: this.changePassword.value.password
      };

      this.http.post('api/entry_managment_sys/admin/changePassword', requestData, { observe: 'response' })
        .subscribe(
          (response) => {
            this.isLoading = false; // Hide spinner
            if (response.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Password has been changed Successfully',
                detail: 'You can proceed further...',
                life: 4000,
              });

              setTimeout(() => {
                this.router.navigate(['login']);
              }, 1000);
            }
          },
          (error) => {
            this.isLoading = false; // Hide spinner
            if (error.status === 40) {
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
      this.changePassword.markAllAsTouched();
      if (this.changePassword.hasError('passwordsMismatch')) {
        this.messageService.add({
          severity: 'error',
          summary: 'Password Mismatch',
          detail: 'Password and Confirm Password do not match.',
          life: 5000,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Form Incomplete',
          detail: 'Please fill in all required fields.',
          life: 5000,
        });
      }
    }
  }
}
