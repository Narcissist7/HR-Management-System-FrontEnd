import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../Model/User/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = (environment.API_URL + 'userDetails');

  constructor(private http: HttpClient) {}

  // getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.API_URL);
  // }

  // getUserById(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.API_URL}/${id}`);
  // }

  createUser(User: User): Observable<User> {
    return this.http.post<User>(this.API_URL, User);
  }

  // updateUser(User: User): Observable<void> {
  //   return this.http.put<void>(this.API_URL, User);
  // }

  // deleteUser(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.API_URL}/${id}`);
  // }

}
