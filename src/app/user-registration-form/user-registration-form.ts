//src/app/user-registration-form/user-registration-form.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { UserLoginForm } from '../user-login-form/user-login-form';

import { FetchApiData } from '../fetch-api-data';


@Component({
  selector: 'app-user-registration-form',
  standalone: true,  
  imports: [ 
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,   
    MatNativeDateModule
  ],
  templateUrl: './user-registration-form.html',
  styleUrls: ['./user-registration-form.scss']
})
export class UserRegistrationForm {
   userData = { Username: '', Password: '', Email: '', Birthday: '' };
   isSubmitting = false;

   constructor(
      private fetchApiData: FetchApiData,
      private dialogRef: MatDialogRef<UserRegistrationForm>,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
   ) {}

   // Normalize birthday to yyyy-mm-dd and map to backend’s lowercase keys
   private normalizeBirthday(val: any): string | undefined {
     if (!val) return undefined;
     if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;

     if (typeof val === 'string') {
       const parts = val.split(/[\/.-]/).map(p => p.trim());
       if (parts.length === 3 && parts[0].length !== 4) {
         const [dd, mm, yyyy] = parts;
         if (yyyy?.length === 4) {
           return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
         }
       }
       const d2 = new Date(val);
       if (!isNaN(d2.getTime())) {
         const y = d2.getFullYear();
         const m = String(d2.getMonth() + 1).padStart(2, '0');
         const d = String(d2.getDate()).padStart(2, '0');
         return `${y}-${m}-${d}`;
       }
     }

     if (val instanceof Date && !isNaN(val.getTime())) {
       const y = val.getFullYear();
       const m = String(val.getMonth() + 1).padStart(2, '0');
       const d = String(val.getDate()).padStart(2, '0');
       return `${y}-${m}-${d}`;
     }
     return undefined;
   }

   registerUser(form?: NgForm): void {
     if (this.isSubmitting) return;
     this.isSubmitting = true;

     const payload = {
       username: this.userData.Username,
       password: this.userData.Password,
       email: this.userData.Email,
       birthday: this.normalizeBirthday(this.userData.Birthday)
     };

     this.fetchApiData.userRegistration(payload).subscribe({
       next: (result: any) => {
         console.log('Registration success:', result);
         this.dialogRef.close();
         this.snackBar.open('Registered successfully', 'OK', { duration: 2000 });
       },
       error: (err) => {
         // Try to extract useful messages from your backend
         let msg = 'Registration failed';
         const e = err?.error;

         if (e?.message) msg = e.message;  // <-- will show "Username already exists"
         else if (Array.isArray(e?.errors)) msg = e.errors.map((x: any) => x.msg).join(' • ');
         else if (typeof e === 'string') msg = e;
         
         console.error('Registration error details:', err);

         // Optional: if username already exists, show a snackbar action to open login dialog 
         if (e?.message === 'Username already exists') {
          const ref = this.snackBar.open('Username already exists. Log in instead?', 'Login', { duration: 5000 });
          ref.onAction().subscribe(() => {
            this.dialogRef.close();
            this.dialog.open(UserLoginForm, { width: '280px' });
          });
        } else {
          this.snackBar.open(msg, 'OK', { duration: 4000 });
        }  
      },
      complete: () => { this.isSubmitting = false; }
    });
  }
}