// src/app/services/analytics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsServiceService {
  private apiUrl = 'api/entry_managment_sys/log/count';

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
}
