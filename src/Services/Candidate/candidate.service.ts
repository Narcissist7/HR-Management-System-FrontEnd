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

  constructor(private http: HttpClient) {}

  getAllCandidate(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(environment.API_URL + Constant.API_Method.Candidate);
  }

}

export { Candidate };
