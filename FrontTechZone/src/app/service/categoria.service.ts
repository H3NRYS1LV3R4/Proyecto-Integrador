import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlBase = 'http://localhost:8080/api/categorias';

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {}

  listarCategorias(): Observable<Categoria[]> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.get<Categoria[]>(this.urlBase, { headers });
  }

  registrar(categoria: Categoria): Observable<any> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.post<any>(this.urlBase, categoria, { headers });
  }

  buscar(id: number): Observable<Categoria> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.get<Categoria>(this.urlBase + `/${id}`, { headers });
  }

  actualizar(id: number, categoria: Categoria): Observable<any> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.put(this.urlBase + `/${id}`, categoria, { headers });
  }

  eliminar(id: number): Observable<any> {
    const headers = this.autenticacionService.getAuthHeaders();
    return this.http.delete<any>(this.urlBase + `/${id}`, { headers });
  }
}
