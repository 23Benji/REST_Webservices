import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Wichtige Imports für HTTP und unseren Interceptor
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(), // (Wurde von Angular Material hinzugefügt)

    // HTTP Client aktivieren und für Klassen-basierte Interceptoren freischalten
    provideHttpClient(withInterceptorsFromDi()),

    // Unseren eigenen AuthInterceptor registrieren
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
