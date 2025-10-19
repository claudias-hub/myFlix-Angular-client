// src/app/dialogs/synopsis-dialog/synopsis-dialog.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface SynopsisData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-synopsis-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './synopsis-dialog.html',
  styleUrls: ['./synopsis-dialog.scss']
})
export class SynopsisDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SynopsisData,
    private dialogRef: MatDialogRef<SynopsisDialog>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}