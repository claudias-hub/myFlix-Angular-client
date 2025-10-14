import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { UserRegistrationForm } from './user-registration-form/user-registration-form';
import { UserLoginForm } from './user-login-form/user-login-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MatDialogModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  constructor(private dialog: MatDialog) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, { width: '320px' });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, { width: '320px' });
  }
}
