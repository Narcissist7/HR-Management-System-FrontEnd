import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-user-view.component.html',
  styleUrl: './job-user-view.component.css'
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    this.http.get<any[]>('YOUR_API_URL/jobs').subscribe((data) => {
      this.jobs = data;
    });
  }
}
