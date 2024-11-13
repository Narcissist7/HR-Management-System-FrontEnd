import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  getPaginatedLogs(page: number, size: number): Observable<EntryLog[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<EntryLog[]>(`${environment.API_URL +  Constant.API_Method.EntryLog + '/paginated'}`, { params });
  }
// `${environment.API_URL +  Constant.API_Method.EntryLog + '/paged'}?page=${page}&size=${size}`
  filterLogsByDate(startDate: string, endDate: string, page: number, size: number): Observable<any> {
    return this.http.post(`${environment.API_URL +  Constant.API_Method.EntryLog + '/filterDates'}`, {
      startDate,
      endDate
    });
  }
}
