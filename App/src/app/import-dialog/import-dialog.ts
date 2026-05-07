import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-import-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './import-dialog.html',
  styleUrl: './import-dialog.scss'
})
export class ImportDialogComponent {
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<ImportDialogComponent>,
    private movieService: MovieService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  importFile() {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Textdatei in JSON-Array umwandeln
        const moviesArray = JSON.parse(e.target?.result as string);

        // An den Server schicken
        this.movieService.importMovies(moviesArray).subscribe({
          next: () => {
            this.snackBar.open('Filme erfolgreich importiert!', 'OK', { duration: 3000 });
            this.dialogRef.close(true); // Schließen und 'true' für Erfolg zurückgeben
          },
          error: (err) => {
            // Zeigt den Fehler vom Server an (z.B. "Movie exists Hulk")
            const errorMsg = err.error || 'Fehler beim Import';
            this.snackBar.open(errorMsg, 'Schließen', { duration: 5000 });
          }
        });
      } catch (error) {
        this.snackBar.open('Fehler: Die Datei ist kein gültiges JSON', 'Schließen', { duration: 5000 });
      }
    };
    reader.readAsText(this.selectedFile); // Liest die Datei als Text aus
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
