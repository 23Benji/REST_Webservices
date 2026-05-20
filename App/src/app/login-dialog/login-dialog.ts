import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JwtAuthService } from '../jwt-auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.scss'
})
export class LoginDialogComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: JwtAuthService
  ) {}

  async login() {
    try {
      this.errorMessage = '';
      await this.authService.login(this.username, this.password);
      this.dialogRef.close(true);
    } catch (error) {
      this.errorMessage = 'Login fehlgeschlagen. Bitte Zugangsdaten prüfen.';
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
