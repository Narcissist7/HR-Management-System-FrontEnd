import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-one',
  standalone: true,
  imports: [],
  templateUrl: './registration-one.component.html',
  styleUrl: './registration-one.component.css'
})
export class RegistrationOneComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  goToNextStep() {
    // Store email and password for later use or pass them to the next component
    this.router.navigate(['/register-two']);
  }
}
