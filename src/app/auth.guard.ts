// src/app/auth.guard.ts


import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

/**
 * Route guard that blocks access to protected routes when no JWT is present.
 * - Looks for a token in localStorage.
 * - Redirects unauthenticated users to the welcome page (GitHub Pages-compatible path).
 *
 * @param route The target route being activated.
 * @param state The router state for the navigation.
 * @returns true if authenticated; otherwise redirects and returns false.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (token) {
    return true;
  } else {
    router.navigate(['/myFlix-Angular-client/welcome']);  // Full path for GitHub Pages
    return false;
  }
};