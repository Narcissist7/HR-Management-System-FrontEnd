import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import {AnalyticsServiceService} from '../../../../Services/Analytics/analytics-service.service';
import {tokenserviceService} from '../../../../Services/token/tokenservice.service';

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

  constructor(private router: Router , private analyticsService: AnalyticsServiceService , private tokenService:tokenserviceService) {}

  allTime_candidates: number[] = [];
  allTime_visitors: number[] = [];
  today_candidates: number[] = [];
  today_visitors: number[] = [];
  month_candidates: number[] = [];
  month_visitors: number[] = [];

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('token');

    if (this.tokenService.validateToken()) {
      this.analyticsService.getAnalyticsData().subscribe(
        (data) => {
          [this.allTime_candidates, this.allTime_visitors, this.today_candidates, this.today_visitors, this.month_candidates, this.month_visitors] = data;
        },
        (error) => {
          console.error('Error fetching analytics data', error);
        }
      );
    } else {
      alert("session expired!!!")

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
