import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import {AnalyticsServiceService} from '../../../../Services/Analytics/analytics-service.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChartComponent implements OnInit{
  dataFirst: any;
  dataSecond: any;
  options: any;

  constructor(private analyticsService : AnalyticsServiceService) {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');



    this.analyticsService.visitorAnalytics().subscribe((data) => {
      this.dataFirst = {
        labels: data.dates, // Use the fetched dates for labels
        datasets: [
          {
            label: 'Visitor Dataset',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: data.counts, // Use the fetched counts for data
          },
        ],
      };
    });

    // Data for the second chart
    this.analyticsService.candidateAnalytics().subscribe((data) => {
      this.dataSecond = {
        labels: data.dates,
        datasets: [
          {
            label: 'Candidate Datasets',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: data.counts,
          },
        ],
      };
    });

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

  }
}
