import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedAccess = route.queryParams['allowedAccess'];
    console.log('Allowed Access:', allowedAccess);  // Debugging log

    if (allowedAccess === 'true') {  // Query parameters are passed as strings
      return true;
    } else {
      this.router.navigate(['sendemail']); // Redirect to the previous page
      return false;
    }
  }
}
