// src/app/dialogs/synopsis-dialog/synopsis-dialog.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Data passed into the Synopsis dialog.
 */
export interface SynopsisData {
  /** Movie title shown in the dialog header. */
  title: string;

  /** Brief movie synopsis/description text. */
  description: string;
}

/**
 * Modal dialog that displays a movie's synopsis.
 * Receives `title` and `description` via `MAT_DIALOG_DATA`.
 */
@Component({
  selector: 'app-synopsis-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './synopsis-dialog.html',
  styleUrls: ['./synopsis-dialog.scss']
})

export class SynopsisDialog {
  /**
   * @param data Dialog input data containing title and description.
   * @param dialogRef Reference to this dialog instance.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SynopsisData,
    private dialogRef: MatDialogRef<SynopsisDialog>
  ) {}

  /**
   * Close the dialog.
   */
  close(): void {
    this.dialogRef.close();
  }
}