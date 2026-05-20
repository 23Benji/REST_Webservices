import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtAuthService } from './jwt-auth.service';

const URL = 'http://localhost:8080/movie';

export interface Movie {
  id: number;
  title: string;
  year: number;
  published: boolean;
  owner: string;
  fullname: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private authService: JwtAuthService) { }

  getMovies(sort: string = 'asc'): Observable<Movie[]> {
    if (this.authService.isLoggedIn()) {
      return this.http.get<Movie[]>(`${URL}?sort=${sort}`);
    } else {
      return this.http.get<Movie[]>(`${URL}/published?sort=${sort}`);
    }
  }


  // Film hinzufügen (POST)
  addMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(URL, movie);
  }

  // Bestehenden Film ändern (PUT)
  updateMovie(oldId: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${URL}/${oldId}`, movie);
  }

  // Einzelnen Film löschen (DELETE)
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }

  // Alle eigenen Filme löschen (DELETE)
  clearMovies(): Observable<void> {
    return this.http.delete<void>(`${URL}/clear`);
  }

  // Filme importieren (POST)
  importMovies(movies: any[]): Observable<void> {
    return this.http.post<void>(`${URL}/import`, movies);
  }
}
