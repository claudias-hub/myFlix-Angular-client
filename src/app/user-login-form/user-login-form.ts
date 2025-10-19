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

import { FetchApiData } from '../fetch-api-data';

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
  userData = { Username: '', Password: '' };
  isSubmitting = false;
  showPassword = false;
  
  constructor(
    private api: FetchApiData,
    private dialogRef: MatDialogRef<UserLoginForm>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  
  loginUser(form?: NgForm): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Map to backend keys. Your auth.js typically expects { username, password }.
    const payload = {
      username: this.userData.Username?.trim(),
      password: this.userData.Password
    };

    // Adjust this.api.userLogin(...) to whatever your service method is named.
    this.api.userLogin(payload).subscribe({
      next: (res: any) => {
        // Save token/user as returned by your backend
        // Common patterns:
        // res.token and res.user
        if (res?.token) localStorage.setItem('token', res.token);
        if (res?.user) localStorage.setItem('user', JSON.stringify(res.user));
        this.snackBar.open('Login successful', 'OK', { duration: 2000 });
        this.dialogRef.close();
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        let msg = 'Login failed';
        const e = err?.error;
        if (e?.info?.message) msg = e.info.message;
        else if (e?.message) msg = e.message;
        else if (typeof e === 'string') msg = e;
        this.snackBar.open(msg, 'OK', { duration: 3000 });
        console.error('Login error:', err);
      },
      complete: () => { this.isSubmitting = false; }
    });
  }
  
}
