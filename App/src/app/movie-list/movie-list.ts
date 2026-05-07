import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../movie.service';
import { JwtAuthService } from '../jwt-auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  currentSort: string = 'asc';

  constructor(
    private movieService: MovieService,
    public authService: JwtAuthService,
    private dialog: MatDialog // Dialog-Service injiziert
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(sort: string = this.currentSort) {
    this.currentSort = sort;
    this.movieService.getMovies(this.currentSort).subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Fehler beim Laden der Filme', err)
    });
  }

  openEditDialog(movie: Movie) {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '400px',
      data: { movie: movie } // Übergebe den Film an den Dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'save') {
        this.movieService.updateMovie(movie.id, result.movie).subscribe(() => this.loadMovies());
      } else if (result?.action === 'delete') {
        this.movieService.deleteMovie(movie.id).subscribe(() => this.loadMovies());
      }
    });
  }
}
