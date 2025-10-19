//src/app/dialogs/director-dialog/director-dialog.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DirectorData {
  name: string;
  bio?: string;
  birthYear?: number;
  deathYear?: number;
}

@Component({
  selector: 'app-director-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './director-dialog.html',
  styleUrls: ['./director-dialog.scss']
})
export class DirectorDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DirectorData,
    private dialogRef: MatDialogRef<DirectorDialog>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}