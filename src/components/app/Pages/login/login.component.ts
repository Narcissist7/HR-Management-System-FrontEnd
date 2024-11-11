import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {CommonModule, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

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

      this.http.post<any>('http://localhost:8080/api/entry_managment_sys/admin/login', loginData, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe({
        next: (response) => {
          localStorage.setItem('userData', JSON.stringify(response));
          this.router.navigate(['/adminDashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-toast']
          });
        }
      });
    }
  }


}
