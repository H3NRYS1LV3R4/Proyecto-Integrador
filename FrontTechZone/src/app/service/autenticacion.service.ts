import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private urlBase = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.httpClient.get(`${this.urlBase}/proveedores`, { headers })
      .pipe(
        map(() => {
          if (typeof window !== 'undefined' && window.localStorage) {
            // Verifica si 'localStorage' está disponible
            localStorage.setItem('authHeader', headers.get('Authorization')!);
          }
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  getAuthHeaders(): HttpHeaders {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Verifica si 'localStorage' está disponible
      const authHeader = localStorage.getItem('authHeader');
      return new HttpHeaders({
        Authorization: authHeader ? authHeader : ''
      });
    } else {
      return new HttpHeaders();
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Verifica si 'localStorage' está disponible
      localStorage.removeItem('authHeader');
    }
  }

  estaAutenticado(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Verifica si 'localStorage' está disponible
      const authHeader = localStorage.getItem('authHeader');
      return authHeader !== null && authHeader !== '';
    }
    return false;
  }
}
