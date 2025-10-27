// src/app/dialogs/genre-dialog/genre-dialog.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Data passed into the Genre dialog.
 */
export interface GenreData {
  /** Genre name (e.g., "Drama"). */
  name: string;
  /** Short description of the genre. */
  description: string;
}

/**
 * Modal dialog that shows information about a movie genre.
 */
@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './genre-dialog.html',
  styleUrls: ['./genre-dialog.scss'] // create if you want, or remove
})

export class GenreDialog {
  /**
   * @param data Dialog input data with name and description.
   * @param dialogRef Reference to this dialog instance.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GenreData,
    private dialogRef: MatDialogRef<GenreDialog>
  ) {}

  /**
   * Close the dialog.
   */
  close(): void {
    this.dialogRef.close();
  }
}