import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import {AnalyticsServiceService} from '../../../../Services/Analytics/analytics-service.service';
import {tokenserviceService} from '../../../../Services/token/tokenservice.service';
import {ChartModule} from 'primeng/chart';
import { ChartComponent } from '../chart/chart.component';
import {NgOptimizedImage} from '@angular/common';
import {LoaderComponent} from '../../../Reusable/loader/loader.component';
import {ChartRadarDemo} from '../chart/chart-radar-demo/chart-radar-demo.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  imports: [
    ToastModule,
    ChartModule,
    ChartComponent,
    NgOptimizedImage,
    LoaderComponent,
    ChartRadarDemo
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
  loading: boolean = true;


  ngOnInit(): void {
    const jwtToken = localStorage.getItem('token');

    if (this.tokenService.validateToken()) {
      this.analyticsService.getAnalyticsData().subscribe(
        (data) => {
          [this.allTime_candidates, this.allTime_visitors, this.today_candidates, this.today_visitors, this.month_candidates, this.month_visitors] = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching analytics data', error);
          this.loading = false;
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
