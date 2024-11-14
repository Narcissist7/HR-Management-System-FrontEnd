import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visitor } from '../../Model/Visitor/visitor';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Constant } from '../../Constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Token is missing");
    } else {
      console.log("Token:", token);
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
  }


  getAllVisitors(): Observable<Visitor[]> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<Visitor[]>("/api/entry_managment_sys/visitor", { headers });
  }

  getVisitorBySSN(ssn: string): Observable<Visitor> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<Visitor>(`/api/entry_managment_sys/visitor/${ssn}`, { headers });
  }


  getPaginatedVisitors(page: number, size: number): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<any>(`/api/entry_managment_sys/visitor/paged?page=${page}&size=${size}`, { headers })
  }
}
