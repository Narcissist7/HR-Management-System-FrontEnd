import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-one',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './registration-one.component.html',
  styleUrls: ['./registration-one.component.css']
})
export class RegistrationOneComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {
  }

  goToNextStep() {
    const payload = {email: this.email, password: this.password};

    this.http.post('http://localhost:8080/api/register/user', payload, {responseType: 'text'})
      .subscribe({
        next: (response) => {
          // Show success toast
          this.snackBar.open('You are registered successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          // Navigate to the next step with email as a query parameter
          this.router.navigate(['/registration-two'], {queryParams: {email: this.email}});
        },
        error: (error) => {
          console.error('Error registering user:', error);
          // Check for specific error response
          if (error.status === 409) { // Conflict status code for duplicate entry
            this.snackBar.open('This email is already registered. Please use a different email.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          } else {
            // Show generic error toast
            this.snackBar.open('Registration failed. Please try again.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          }
        }
      });
  }
}
