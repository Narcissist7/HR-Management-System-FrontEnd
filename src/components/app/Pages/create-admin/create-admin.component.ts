import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Observable} from 'rxjs';
import {tokenserviceService} from '../../../../Services/token/tokenservice.service';
import {NavbarComponent} from '../../../Reusable/navbar/navbar.component';
import {LoaderComponent} from '../../../Reusable/loader/loader.component';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    NavbarComponent,
    LoaderComponent
  ],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.css',
  providers: [MessageService] // Provide MessageService here
})
export class CreateAdminComponent {
  registrationForm: FormGroup;
  deleteForm: FormGroup ;
  loading: boolean = true;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService  ,
    private tokenService:tokenserviceService// Inject MessageService
  ) {
    this.registrationForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      user_name: ['', Validators.required],
      isSuperAdmin: [false]  // Add the isSuperAdmin form control, default to false
    });

    this.deleteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    if (this.tokenService.validateToken()) {
      const isSuperAdmin = this.tokenService.getUserRole();  // Get boolean value

      if (isSuperAdmin) {  // If isSuperAdmin is false
        console.log("Access granted: super admin");
        // Page remains accessible
      } else {
        alert("Access denied: Super admins only can access this page.");
        this.router.navigate(['/adminDashboard']);  // Redirect super admins
      }
    } else {
      alert("Session expired!");
      this.router.navigate(['/login']);  // Redirect to login
    }
  }



  onSubmit() {
    this.loading = true;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      // Show an error toast for incomplete form
      this.messageService.add({ severity: 'error', summary: 'Form Incomplete', detail: 'Please fill in all required fields.', life: 5000 });
      this.loading = false;
      return;
    }

    const formData = this.registrationForm.value;
    const requestData = {
      email: formData.email,
      password: formData.password,
      user_name: formData.user_name,
      isSuperAdmin: formData.isSuperAdmin  // Add isSuperAdmin value here
    };

    this.showWarn();

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
    this.loading = false;
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Your Request is being processed',
      detail: 'please wait for the confirmation!',
      life: 7000
    });
  }




// Method to handle admin deletion
  onDelete() {
    if (this.deleteForm.invalid) {
      this.deleteForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Email',
        detail: 'Please enter a valid email address.',
        life: 5000
      });
      return;
    }

    this.loading = true;
    const email = this.deleteForm.get('email')?.value;

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    this.http.delete(`/api/entry_managment_sys/admin/${email}`, { headers })
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deletion Successful',
            detail: 'Admin deleted successfully!',
            life: 5000
          });
          this.deleteForm.reset();
        },
        (error) => {
          this.loading = false;
          if (error.status === 404) {
            this.messageService.add({
              severity: 'error',
              summary: 'Admin Not Found',
              detail: 'No admin found with this email.',
              life: 5000
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Deletion Successful',
              detail: 'Admin deleted successfully!',
              life: 5000
            });
          }
        }
      );
    this.loading = false;
  }



}
