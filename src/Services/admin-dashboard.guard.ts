import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminDashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Access Angular's Router instance

  const token = localStorage.getItem('token');
  if (token) {
    return true; // Allow access if the token exists
  } else {
    router.navigate(['/login']); // Redirect to login if no token
    return false; // Block access
  }
};
