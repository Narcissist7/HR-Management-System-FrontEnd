import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Visitor} from '../../Model/Visitor/visitor';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Constant} from '../../Constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  constructor(private http: HttpClient) {
  }

  submitVisitor(visitor: Visitor): Observable<any> {
    return this.http.post(environment.API_URL + Constant.API_Method.Visitor, visitor);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(Constant.API_Method.OCR, formData);
  }
}
