import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EntryLog} from '../../Model/EntryLog/entry-log';
import {environment} from '../../environments/environment';
import {Constant} from '../../Constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class EntryLogService {
  constructor(private http: HttpClient) {
  }

  submitLog(log: EntryLog): Observable<any> {
    return this.http.post(environment.API_URL + Constant.API_Method.EntryLog, log);
  }

  getAllLogs(): Observable<EntryLog[]> {
    return this.http.get<EntryLog[]>(environment.API_URL + Constant.API_Method.EntryLog);
  }

  getPaginatedLogs(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${environment.API_URL +  Constant.API_Method.EntryLog + '/paged'}?page=${page}&size=${size}`);
  }

}
