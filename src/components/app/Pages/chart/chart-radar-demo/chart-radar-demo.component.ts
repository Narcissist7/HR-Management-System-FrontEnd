import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AnalyticsServiceService } from '../../../../../Services/Analytics/analytics-service.service';
import { forkJoin } from 'rxjs'; // Import forkJoin

@Component({
  selector: 'app-chart-radar-demo',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart-radar-demo.component.html',
  styleUrls: ['./chart-radar-demo.component.css'] // Ensure correct plural form
})
export class ChartRadarDemo implements OnInit {
  data: any;
  options: any;

  constructor(private analyticsService: AnalyticsServiceService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color').trim();
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary').trim();

    // Handle both API calls concurrently
    forkJoin({
      maleData: this.analyticsService.radarMaleAnalytics(),
      femaleData: this.analyticsService.radarFemaleAnalytics()
    }).subscribe(({ maleData, femaleData }) => {
      this.data = {
        labels: maleData.jobtitle || [], // Use male data labels (assuming both have the same structure)
        datasets: [
          {
            label: 'Males',
            borderColor: documentStyle.getPropertyValue('--bluegray-400').trim(),
            pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400').trim(),
            pointBorderColor: documentStyle.getPropertyValue('--bluegray-400').trim(),
            pointHoverBackgroundColor: textColor,
            pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400').trim(),
            data: maleData.counts || [] // Male-specific data
          },
          {
            label: 'Females',
            borderColor: documentStyle.getPropertyValue('--pink-400').trim(),
            pointBackgroundColor: documentStyle.getPropertyValue('--pink-400').trim(),
            pointBorderColor: documentStyle.getPropertyValue('--pink-400').trim(),
            pointHoverBackgroundColor: textColor,
            pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400').trim(),
            data: femaleData.counts || [] // Female-specific data
          }
        ]
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: textColorSecondary
            },
            pointLabels: {
              color: textColorSecondary
            }
          }
        }
      };
    });
  }
}
