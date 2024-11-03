import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Job } from '../../../../Model/Job/job';
import { JobService } from '../../../../Services/Job/job';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-job-view.component.html',
  styleUrls: ['./admin-job-view.component.css']
})
export class JobListComponent implements OnInit {
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

  createJob() {
    if (this.currentJob) {
      this.jobService.createJob(this.currentJob).subscribe(() => {
        this.fetchJobs();
        this.resetCurrentJob();
      });
    }
  }

  editJob(job: Job) {
    this.currentJob = { ...job }; // Clone to avoid direct mutations
    this.isEditing = true;
  }

  updateJob() {
    if (this.currentJob) {
      this.jobService.updateJob(this.currentJob).subscribe(() => {
        this.fetchJobs();
        this.resetCurrentJob();
      });
    }
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id).subscribe(() => {
      this.fetchJobs();
    });
  }

  resetCurrentJob() {
    this.currentJob = new Job();
    this.isEditing = false;
  }
  resetJob() {
    this.resetCurrentJob(); // Call the reset method
  }
}
