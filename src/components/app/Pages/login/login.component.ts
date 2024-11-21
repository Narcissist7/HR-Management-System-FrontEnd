import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {NtgAppsLoaderComponent} from '../../../Reusable/ntg-apps-loader/ntg-apps-loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    ReactiveFormsModule,
    MatSnackBarModule, CommonModule, NgIf, NgFor, ToastModule, NtgAppsLoaderComponent, RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private messageService:MessageService
  ) {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;  // Hide loader after a short delay
    }, 3000);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.http.post<any>('http://localhost:8080/api/entry_managment_sys/admin/login2', loginData, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe({
        next: (response) => {
          // Save JWT token if it exists in the response
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }

          // Optionally save other user data
          localStorage.setItem('userData', JSON.stringify(response));
          console.log(localStorage.getItem('token'));

          this.router.navigate(['/adminDashboard']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'This email or password are not valid. Please try again!',
            life: 5000
          });
        }
      });
    }
  }


  onForgotPassword() {
    this.router.navigate(['sendemail'])
  }
}
