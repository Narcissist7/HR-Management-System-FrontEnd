import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Job } from '../../../../../Model/Job/job';
import { JobService } from '../../../../../Services/Job/job';

@Component({
  selector: 'app-user-job-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-job-view.component.html',
  styleUrl: './user-job-view.component.css'
})
export class UserJobViewComponent implements OnInit {
  jobs: Job[] = [];
  currentJob: Job = new Job();
  isEditing = false;

  constructor(private jobService: JobService) {}
  
  ngOnInit(): void {
    this.fetchJobs();
  }


  fetchJobs() {
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
      console.log(this.jobs);
    });
  }
}
