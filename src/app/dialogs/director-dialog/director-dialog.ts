//src/app/dialogs/director-dialog/director-dialog.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Data passed into the Director dialog.
 */
export interface DirectorData {
  /** Director's full name. */
  name: string;
  /** Optional biography text. */
  bio?: string;
  /** Optional birth year. */
  birthYear?: number;
  /** Optional death year. */
  deathYear?: number;
}

/**
 * Modal dialog that displays information about a movie director.
 */
@Component({
  selector: 'app-director-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './director-dialog.html',
  styleUrls: ['./director-dialog.scss']
})

export class DirectorDialog {
  /**
   * @param data Dialog input data including name, bio, birth/death years.
   * @param dialogRef Reference to this dialog instance.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DirectorData,
    private dialogRef: MatDialogRef<DirectorDialog>
  ) {}

  /**
   * Close the dialog.
   */
  close(): void {
    this.dialogRef.close();
  }
}