import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { JwtAuthService } from './services/jwt-auth.service';
import { MovieService } from './services//movie.service';
import { LoginDialogComponent } from './login-dialog/login-dialog';
import { MovieListComponent } from './movie-list/movie-list';
import { MovieDialogComponent } from './movie-dialog/movie-dialog';
import { ClearDialogComponent } from './clear-dialog/clear-dialog';
import { ImportDialogComponent } from './import-dialog/import-dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MovieListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'Movie REST Client';

  @ViewChild(MovieListComponent) movieList!: MovieListComponent;

  constructor(
    public authService: JwtAuthService,
    private movieService: MovieService,
    private dialog: MatDialog
  ) {}

  openLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.movieList.loadMovies();
    });
  }

  logout() {
    this.authService.logout();
    this.movieList.loadMovies();
  }

  // Neuer Film Dialog
  openAddDialog() {
    const dialogRef = this.dialog.open(MovieDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'save') {
        this.movieService.addMovie(result.movie).subscribe(() => this.movieList.loadMovies());
      }
    });
  }

  // Alle Filme löschen Dialog
  openClearDialog() {
    const dialogRef = this.dialog.open(ClearDialogComponent, { width: '350px' });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.movieService.clearMovies().subscribe(() => this.movieList.loadMovies());
      }
    });
  }

  // Import Dialog
  openImportDialog() {
    const dialogRef = this.dialog.open(ImportDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.movieList.loadMovies(); // Liste bei Erfolg neu laden
      }
    });
  }
}
