import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'; // Import HttpClient for API calls
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor , HttpClientModule , FormsModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  userData: any;
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private http: HttpClient) {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    }
  }

  changePassword() {
    if (!this.oldPassword || !this.newPassword || !this.confirmNewPassword) {
      alert('All password fields are required');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      alert('New password and confirmation do not match');
      return;
    }

    const payload = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      userid: Number(this.userData.userResponseDetailsDTO.userId) // Ensure userid is a number
    };

    const headers = {
      Authorization: `Bearer ${this.userData.token}`,
      'Content-Type': 'application/json'
    };

    this.http.post('http://localhost:8080/api/register/changePassword', payload, { headers })
      .subscribe(
        response => {
          alert('Password updated successfully');
        },
        error => {
          alert('Failed to update password: ' + (error.error?.message || error.message));
        }
      );
  }

}
