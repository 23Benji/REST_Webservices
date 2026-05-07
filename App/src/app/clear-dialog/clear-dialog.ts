import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clear-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './clear-dialog.html',
  styleUrl: './clear-dialog.scss'
})
export class ClearDialogComponent {

  constructor(public dialogRef: MatDialogRef<ClearDialogComponent>) {}

  confirm() {
    this.dialogRef.close(true); // Gibt 'true' zurück, wenn der User bestätigt
  }

  cancel() {
    this.dialogRef.close(false); // Gibt 'false' zurück bei Abbruch
  }
}
