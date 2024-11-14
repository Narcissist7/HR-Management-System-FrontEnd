import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EntryLog} from '../../Model/EntryLog/entry-log';
import {environment} from '../../environments/environment';
import {Constant} from '../../Constant/Constant';
import {EntryLogFilterRequestDTO} from '../../Model/EntryLog/EntryLogFilterRequestDto/entry-log-filter-dto';

@Injectable({
  providedIn: 'root'
})
export class EntryLogService {
  constructor(private http: HttpClient) {
  }

  submitLog(log: EntryLog): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };
    return this.http.post('api/entry_managment_sys/log', log , {headers});
  }

  getAllLogs(): Observable<EntryLog[]> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<EntryLog[]>('api/entry_managment_sys/log' , {headers});
  }

  getPaginatedLogs(page: number, size: number): Observable<EntryLog[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<EntryLog[]>(`api/entry_managment_sys/log/paginated`, { params , headers });
  }
// `${environment.API_URL +  Constant.API_Method.EntryLog + '/paged'}?page=${page}&size=${size}`
  filterLogsByDate(startDate: string, endDate: string, page: number, size: number): Observable<any> {
    return this.http.post(`${environment.API_URL +  Constant.API_Method.EntryLog + '/filterDates'}`, {
      startDate,
      endDate
    });
  }

  filterLogsByRole(role: string, page: number, size: number): Observable<any> {
    // Create the request body
    const body = {
      role: role,
      page: page,
      size: size
    };

    // Send the POST request to the backend
    return this.http.post<any>(`${environment.API_URL + Constant.API_Method.EntryLog + '/filterRole'}`, body);
  }



  filterLogs(filterRequest: EntryLogFilterRequestDTO, page: number, size: number): Observable<any> {
    const body = {
      page: page,
      size: size,
      role: filterRequest.role,
      visitee: filterRequest.visitee,
      startDate: filterRequest.startDate,
      endDate: filterRequest.endDate,
      startTime: filterRequest.startTime,
      endTime: filterRequest.endTime
    }
    console.log(body);
   const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    };


    return this.http.post<any>('api/entry_managment_sys/log/filter', body, { headers });
  }
}
