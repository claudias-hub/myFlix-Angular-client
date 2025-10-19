// src/app/dialogs/genre-dialog/genre-dialog.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface GenreData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './genre-dialog.html',
  styleUrls: ['./genre-dialog.scss'] // create if you want, or remove
})
export class GenreDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GenreData,
    private dialogRef: MatDialogRef<GenreDialog>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}