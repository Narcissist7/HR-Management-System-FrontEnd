import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.css',
  providers: [MessageService] // Provide MessageService here
})
export class CreateAdminComponent {
  registrationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService // Inject MessageService
  ) {
    this.registrationForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      user_name: ['', Validators.required],
    });
  }




  onSubmit() {

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      // Show an error toast for incomplete form
      this.messageService.add({ severity: 'error', summary: 'Form Incomplete', detail: 'Please fill in all required fields.', life: 5000 });
      return;
    }

    const formData = this.registrationForm.value;
    const requestData = {
      email: formData.email,
      password: formData.password,
      user_name: formData.user_name,
    };

    this.http.post('/api/entry_managment_sys/admin/save', requestData, {
      headers: headers, // Add the headers to the request
      observe: 'response',
      responseType: 'text'
    }).subscribe(
      (response) => {
        // If registration is successful, show success toast
        this.messageService.add({ severity: 'success', summary: 'Registration Successful', detail: 'Admin created successfully!', life: 5000 });

        // Delay navigation by 5 seconds
        setTimeout(() => {
          this.router.navigate(['/adminDashboard']); // Redirect to the admin dashboard after 5 seconds
        }, 5000);
      },
      (error) => {
        if (error.status === 400) {
          // Show error toast for duplicate email
          this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: 'This email is already registered.', life: 5000 });
        } else {
          // Show generic error toast for other issues
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred during registration. Please try again.', life: 5000 });
        }
      }
    );
  }



}
