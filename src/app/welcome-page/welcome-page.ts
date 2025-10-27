// src/app/welcome-page/welcome-page.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserRegistrationForm } from '../user-registration-form/user-registration-form';
import { UserLoginForm } from '../user-login-form/user-login-form';

/**
 * Landing screen with actions to register or log in.
 * Shows quick links to Profile and All Movies when the user is already authenticated.
 */
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, UserRegistrationForm, UserLoginForm, RouterLink],
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.scss']
})

export class WelcomePage {
  /**
   * Create the welcome page.
   * @param dialog Angular Material dialog service for opening auth forms.
   */
  constructor(private dialog: MatDialog) {}

  /**
   * Open the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, { width: '320px' });
  }

  /**
   * Open the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, { width: '320px' });
  }

  /**
   * Determine if a JWT token exists in localStorage.
   * @returns True if logged in; otherwise false.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
