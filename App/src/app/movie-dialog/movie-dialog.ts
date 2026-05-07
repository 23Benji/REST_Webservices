import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Movie } from '../movie.service';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './movie-dialog.html',
  styleUrl: './movie-dialog.scss' // (Falls du SCSS nutzt, ändere .css hier zu .scss)
})
export class MovieDialogComponent {
  movieData: Partial<Movie>;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    // Empfängt die Filmdaten, falls wir auf "Ändern" geklickt haben
    @Inject(MAT_DIALOG_DATA) public data: { movie?: Movie }
  ) {
    this.isEditMode = !!data?.movie;

    if (this.isEditMode && data.movie) {
      // Kopie erstellen, damit wir nicht live die Liste ändern, bevor wir speichern
      this.movieData = { ...data.movie };
    } else {
      // Standardwerte für einen neuen Film
      this.movieData = { title: '', year: new Date().getFullYear(), published: false };
    }
  }

  save() {
    // Schließt den Dialog und schickt die Daten sowie die Aktion 'save' zurück
    this.dialogRef.close({ action: 'save', movie: this.movieData });
  }

  deleteMovie() {
    // Schließt den Dialog und schickt die Aktion 'delete' zurück
    this.dialogRef.close({ action: 'delete', movie: this.movieData });
  }

  cancel() {
    this.dialogRef.close();
  }
}
