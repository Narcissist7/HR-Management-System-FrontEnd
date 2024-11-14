import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  imports: [
    ToastModule
  ],
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('token');

    if (jwtToken) {
      console.log('JWT Token:', jwtToken);
    } else {
      this.router.navigate(['notAuthorized'])
    }
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
