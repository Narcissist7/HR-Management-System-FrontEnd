import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../Model/Job/job';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private API_URL = (environment.API_URL + 'job');

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.API_URL);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.API_URL}/${id}`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.API_URL, job);
  }

  updateJob(job: Job): Observable<void> {
    return this.http.put<void>(this.API_URL, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
export { Job };

