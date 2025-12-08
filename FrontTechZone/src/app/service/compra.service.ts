import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private urlBase = 'http://localhost:8080/api/compras';

  constructor(private http: HttpClient, private authService: AutenticacionService) { }

  listarReporteCompras(): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any[]>(`${this.urlBase}/reporte`, { headers });
  }
}