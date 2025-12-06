import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productos } from '../models/productos';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) {}

  listarProductos(): Observable<Productos[]> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.get<Productos[]>(this.urlBase, {headers});
  }

  registrar(productos: Productos): Observable<any> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.post<any>(this.urlBase, productos, {headers});
  }

  buscar(id: number): Observable<Productos> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.get<Productos>(`${this.urlBase}/${id}`, {headers});
  }

  actualizar(id: number, productos: Productos): Observable<any> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.put<any>(`${this.urlBase}/${id}`, productos, {headers});
  }

  eliminar(id: number): Observable<any> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.delete<any>(`${this.urlBase}/${id}`, {headers});
  }
}
