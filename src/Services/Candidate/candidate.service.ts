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
    return this.http.get<Candidate[]>(environment.API_URL + Constant.API_Method.Candidate);
  }

  getCandidateBySSN(ssn: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${environment.API_URL + Constant.API_Method.Candidate}/${ssn}`);
  }
  getPaginatedCandidates(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${environment.API_URL +  Constant.API_Method.Candidate + '/paged'}?page=${page}&size=${size}`);
  }
}

export { Candidate };
