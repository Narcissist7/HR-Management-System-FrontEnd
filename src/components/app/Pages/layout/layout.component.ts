import { Component } from '@angular/core';
import {CommonModule, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule , NgIf , NgFor ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  userData: any; // You may want to define an interface for better type safety

  constructor() {
    // Retrieve the user data from local storage
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData); // Parse the JSON string into an object
    }
  }
}
