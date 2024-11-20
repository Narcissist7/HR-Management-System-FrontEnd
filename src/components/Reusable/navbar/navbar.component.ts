import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
