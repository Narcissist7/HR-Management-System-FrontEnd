// src/app/services/cv-parser.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvParserService {
  private apiUrl = 'https://api.superparser.com/parse'; // SuperParser API endpoint
  private apiKey = 'Vh5DRzKnAT4g5akhAHiFb86Jzo40PrWy72zZf1NM'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file_name', file);

    const headers = new HttpHeaders({
      'X-API-Key': this.apiKey,
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
