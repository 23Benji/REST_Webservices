import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Zum Dekodieren des JWTs
import moment from 'moment';
const URL = 'http://localhost:8080';

export interface MyPayload {
  username: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class JwtAuthService {

  constructor(private httpClient: HttpClient) { }

  // 1. Login-Anfrage an den Server schicken
  async login(username: string, password: string): Promise<void> {
    try {
      const result = await lastValueFrom(
        this.httpClient.post<{ jwt: string }>(`${URL}/movie/login`, { username: username, password: password })
      );

      // 2. Token im Browser-Speicher ablegen
      if(result && result.jwt) {
          localStorage.setItem('jwt', result.jwt);
      }
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  // 3. Token löschen (Logout)
  logout(): void {
    localStorage.removeItem('jwt');
  }

  // 4. Prüfen, ob der User eingeloggt ist (und das Token noch nicht abgelaufen ist)
  isLoggedIn(): boolean {
    const jwt = localStorage.getItem('jwt');
    if (jwt === null) {
      return false;
    } else {
      try {
        const jwtDecoded = jwtDecode<MyPayload>(jwt);
        // Prüft, ob Jetzt-Zeitpunkt VOR dem Ablaufdatum liegt
        return moment().isBefore(moment((jwtDecoded.exp ? jwtDecoded.exp : 0) * 1000));
      } catch (e) {
        return false;
      }
    }
  }

  // Hilfsfunktion: Gibt den Namen des aktuell eingeloggten Users zurück
  getCurrentUser(): string | null {
    const jwt = localStorage.getItem('jwt');
    if (jwt && this.isLoggedIn()) {
      const jwtDecoded = jwtDecode<MyPayload>(jwt);
      return jwtDecoded.username;
    }
    return null;
  }
}
