import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {RegistrationOneComponent} from '../registration/registration-one/registration-one.component';
import {CommonModule, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegistrationOneComponent,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,CommonModule , NgIf , NgFor
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.http.post('http://localhost:8080/api/register/login', loginData)
        .subscribe({
          next: (response: any) => { // Use `any` or define a specific interface for response
            // Store the entire response in local storage
            localStorage.setItem('userData', JSON.stringify(response)); // Store the response object

            // Navigate to the dashboard
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['error-toast']
            });
            console.error('Login failed', error);
          }
        });
    }
  }

}
