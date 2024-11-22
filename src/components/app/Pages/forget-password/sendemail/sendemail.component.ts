import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sendemail',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css'],
  providers: [MessageService]
})
export class SendemailComponent {
  sendmail: FormGroup;
  isLoading: boolean = false; // Spinner visibility control

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.sendmail = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.sendmail.valid) {
      this.isLoading = true; // Show spinner
      const requestData = { email: this.sendmail.value.email };

      this.http.post('api/entry_managment_sys/admin/sendToken', requestData, { observe: 'response' })
        .subscribe(
          (response) => {
            this.isLoading = false; // Hide spinner
            if (response.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'The email is sent successfully',
                detail: 'Please check your email address...',
                life: 4000
              });

              setTimeout(() => {
                this.router.navigate(['validatetoken'], {
                  queryParams: { allowedAccess: true, email: this.sendmail.value.email }
                });
              }, 1000);
            }
          },
          (error) => {
            this.isLoading = false; // Hide spinner
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
    else {
      this.sendmail.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Form Incomplete',
        detail: 'Please fill in all required fields.',
        life: 5000
      });
    }
  }
}
