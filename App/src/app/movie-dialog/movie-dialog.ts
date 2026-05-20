import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon'; // Hinzugefügt
import { Movie } from '../movie.service';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatIconModule],
  templateUrl: './movie-dialog.html',
  styleUrl: './movie-dialog.scss'
})
export class MovieDialogComponent {
  movieData: Partial<Movie>;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movie?: Movie }
  ) {
    this.isEditMode = !!data?.movie;
    if (this.isEditMode && data.movie) {
      this.movieData = { ...data.movie };
    } else {
      this.movieData = { title: '', year: new Date().getFullYear(), published: false };
    }
  }

  save() {
    this.dialogRef.close({ action: 'save', movie: this.movieData });
  }

  deleteMovie() {
    this.dialogRef.close({ action: 'delete', movie: this.movieData });
  }

  cancel() {
    this.dialogRef.close();
  }
}
