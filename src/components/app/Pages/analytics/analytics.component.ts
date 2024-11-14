import { Component, OnInit } from '@angular/core';
import {AnalyticsServiceService} from '../../../../Services/Analytics/analytics-service.service';


@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  allTime_candidates: number[] = [];
  allTime_visitors: number[] = [];
  today_candidates: number[] = [];
  today_visitors: number[] = [];
  month_candidates: number[] = [];
  month_visitors: number[] = [];

  constructor(private analyticsService: AnalyticsServiceService) {}

  ngOnInit(): void {
    this.analyticsService.getAnalyticsData().subscribe(
      (data) => {
        [this.allTime_candidates, this.allTime_visitors, this.today_candidates, this.today_visitors, this.month_candidates, this.month_visitors] = data;
      },
      (error) => {
        console.error('Error fetching analytics data', error);
      }
    );
  }
}
