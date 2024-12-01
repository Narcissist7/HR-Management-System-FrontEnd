import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class tokenserviceService {
  constructor(private router: Router) {
  }

  // Decode the token
  decodeToken(token: string): any {
    try {
      return jwtDecode(token)
    } catch (error) {
      return null;
    }
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(["notAuthorized"])
  }

  validateToken(): boolean {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken && !this.isTokenExpired(jwtToken)) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  getUserRole(): boolean {
    const superAdmin = localStorage.getItem('isSuperAdmin');
    console.log(superAdmin)
    if(superAdmin == 'true')
    {
      return true ;
    }
    else {
      return false;
    }
  }

}
