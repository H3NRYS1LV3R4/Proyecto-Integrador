import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private urlBase = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID)private platformId: Object) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.httpClient.get<Usuario>(`${this.urlBase}/usuarios/login`, { headers }).pipe(
      tap(usuario => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authHeader', headers.get('Authorization')!);
          
          localStorage.setItem('usuarioId', usuario.codusu.toString());
          localStorage.setItem('rol', usuario.rol);
        }
      })
    );
  }

  getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const authHeader = localStorage.getItem('authHeader');
      return new HttpHeaders({
        Authorization: authHeader ? authHeader : ''
      });
    } else {
      return new HttpHeaders();
    }
  }

  getUsuarioId(): number {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('usuarioId');
      return id ? parseInt(id) : 0;
    }
    return 0;
  }
  
  getRol(): string {
     if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('rol') || '';
    }
    return '';
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Verifica si 'localStorage' está disponible
      localStorage.removeItem('authHeader');
      localStorage.removeItem('usuarioId'); 
      localStorage.removeItem('rol');
    }
  }

  estaAutenticado(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Verifica si 'localStorage' está disponible
      const authHeader = localStorage.getItem('authHeader');
      return authHeader !== null && authHeader !== '';
    }
    return false;
  }
}
