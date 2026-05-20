import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Hinzugefügt

@Component({
  selector: 'app-clear-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './clear-dialog.html',
  styleUrl: './clear-dialog.scss'
})
export class ClearDialogComponent {
  constructor(public dialogRef: MatDialogRef<ClearDialogComponent>) { }
  confirm() { this.dialogRef.close(true); }
  cancel() { this.dialogRef.close(false); }
}
