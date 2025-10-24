// src/app/auth.guard.ts


import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

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