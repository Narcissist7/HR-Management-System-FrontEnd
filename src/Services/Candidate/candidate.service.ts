import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Candidate} from '../../Model/Candidate/candidate';
import {environment} from '../../environments/environment';
import {Constant} from '../../Constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
    private EndPoint: string = "";

  constructor(private http: HttpClient) {}

  getAllCandidate(): Observable<Candidate[]> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Candidate[]>("/api/entry_managment_sys/candidate" , {headers});
  }

  getCandidateBySSN(ssn: string): Observable<Candidate> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Candidate>(`/api/entry_managment_sys/candidate/${ssn}` , {headers});
  }
  getPaginatedCandidates(page: number, size: number): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<any>(`/api/entry_managment_sys/candidate/paged?page=${page}&size=${size}` , {headers});
  }

  searchCandidatesByName(name: string, page: number, size: number) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<any>(
      `/api/entry_managment_sys/candidate/filterByName?page=${page}&size=${size}`,
      { name },
      { headers }
    );
  }
}

export { Candidate };
