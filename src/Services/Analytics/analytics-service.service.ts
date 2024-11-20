// src/app/services/analytics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsServiceService {
  private apiUrl = 'api/entry_managment_sys/log/count';
  private visitorUrl = 'api/entry_managment_sys/log/people_last_seven_days/visitor'
  private candidateUrl = 'api/entry_managment_sys/log/people_last_seven_days/candidate'


  constructor(private http: HttpClient , private router:Router) {}

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      console.log('JWT Token:', jwtToken);
    } else {
      this.router.navigate(['notAuthorized']);
    }
  }

  getAnalyticsData(): Observable<number[][]> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<number[][]>(this.apiUrl , {headers});
  }

  visitorAnalytics(): Observable<{ dates: string[], counts: number[] }> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<{ [key: string]: number }>(this.visitorUrl, { headers }).pipe(
      map((response: { [key: string]: number }) => {
        const dates = Object.keys(response); // Extract dates as keys
        const counts = Object.values(response); // Extract counts as values
        return { dates, counts }; // Return an object with dates and counts
      })
    );
  }

  candidateAnalytics(): Observable<{ dates: string[], counts: number[] }> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<{ [key: string]: number }>(this.candidateUrl, { headers }).pipe(
      map((response: { [key: string]: number }) => {
        const dates = Object.keys(response); // Extract dates as keys
        const counts = Object.values(response); // Extract counts as values
        return { dates, counts }; // Return an object with dates and counts
      })
    );
  }

}
