//src/app/user-login-form/user-login-form.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs/operators';
import { FetchApiData } from '../fetch-api-data';

/**
 * Dialog component for user login.
 * Persists JWT and user data to localStorage on success and navigates to Movies.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-login-form.html',
  styleUrls: ['./user-login-form.scss']
})

export class UserLoginForm {
  /** Two-way bound model for credentials. */
  userData = { Username: '', Password: '' };

  /** Prevents duplicate submissions while request is pending. */
  isSubmitting = false;

  /** Toggles password visibility in the UI. */
  showPassword = false;
  
  /**
   * @param api API service for auth call.
   * @param dialogRef Material dialog reference to close on success.
   * @param snack Snackbar for user feedback.
   * @param router Router for navigation to the Movies page.
   */
  constructor(
    private api: FetchApiData,
    private dialogRef: MatDialogRef<UserLoginForm>,
    private snack: MatSnackBar,
    private router: Router
  ) {}
  
  /**
   * Submit login credentials to the API.
   * Stores `{ token, user }` in localStorage on success and navigates to the movies page.
   * @param form Optional Angular form reference (for future validation hooks).
   */
  loginUser(form?: NgForm): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Map to backend keys.
    const payload = {
      username: this.userData.Username?.trim(),
      password: this.userData.Password
    };

    this.api.userLogin(payload)
    .pipe(
      finalize(() => { this.isSubmitting = false; }) // ← Always runs!
    )
    .subscribe({
      next: (res: any) => {
        if (res?.token) localStorage.setItem('token', res.token);
        if (res?.user) localStorage.setItem('user', JSON.stringify(res.user));
        this.snack.open('Login successful', 'OK', { duration: 2000 });
        this.dialogRef.close();
        this.router.navigate(['/myFlix-Angular-client/movies']);  // Full path for GitHub Pages
      },
      error: (err) => {
        let msg = 'Login failed';
        const e = err?.error;
        if (e?.info?.message) msg = e.info.message;
        else if (e?.message) msg = e.message;
        else if (typeof e === 'string') msg = e;
        this.snack.open(msg, 'OK', { duration: 3000 });
        console.error('Login error:', err);
      }
    });
  }
}