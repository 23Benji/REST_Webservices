import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../movie.service';
import { JwtAuthService } from '../jwt-auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  // MatCardModule gibt uns schöne, mehrzeilige "Karten" für jeden Film
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  currentSort: string = 'asc'; // Standardmäßig aufsteigend

  constructor(private movieService: MovieService, public authService: JwtAuthService) {}

  // Wird automatisch beim Start der Komponente aufgerufen
  ngOnInit() {
    this.loadMovies();
  }

  // Lädt die Filme vom Server [cite: 862, 863]
  loadMovies(sort: string = this.currentSort) {
    this.currentSort = sort;
    this.movieService.getMovies(this.currentSort).subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => console.error('Fehler beim Laden der Filme', err)
    });
  }
}
