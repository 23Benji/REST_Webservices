import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { JwtAuthService } from './jwt-auth.service';
import { LoginDialogComponent } from './login-dialog/login-dialog';
import { MovieListComponent } from './movie-list/movie-list'; // WICHTIG: Import

@Component({
  selector: 'app-root',
  standalone: true,
  // MovieListComponent zu den Imports hinzufügen!
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MovieListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'Movie REST Client';

  // Zugriff auf unsere Filmliste, um sie neu zu laden
  @ViewChild(MovieListComponent) movieList!: MovieListComponent;

  constructor(
    public authService: JwtAuthService,
    private dialog: MatDialog
  ) {}

  openLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, { width: '300px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Liste nach Login neu laden (jetzt mit eigenen Filmen)
        this.movieList.loadMovies();
      }
    });
  }

  logout() {
    this.authService.logout();
    // Liste nach Logout neu laden (jetzt wieder nur öffentliche Filme)
    this.movieList.loadMovies();
  }
}
