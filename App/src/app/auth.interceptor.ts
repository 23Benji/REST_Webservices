import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Beim Login wird kein JWT mitgeschickt
    if (request.url !== 'http://localhost:8080/movie/login') {
      const authToken = localStorage.getItem('jwt');
      if (authToken) {
        // Klonen des Requests und Hinzufügen des Headers
        request = request.clone({
            setHeaders: { Authorization: 'Bearer ' + authToken }
        });
      }
    }
    return next.handle(request);
  }
}
