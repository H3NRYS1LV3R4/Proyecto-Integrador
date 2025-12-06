import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private urlBase = 'http://localhost:8080/api/marcas';
  constructor(private http: HttpClient, private authService: AutenticacionService) {}
  listarMarcas(): Observable<Marca[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Marca[]>(this.urlBase, {headers});
  }

  public registrar(marca: Marca): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(this.urlBase, marca, {headers});
  }
  public buscar(id: number): Observable<Marca> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Marca>(this.urlBase + `/${id}`, {headers});
  }
  public actualizar(id: number, marca: Marca): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put(this.urlBase + `/${id}`, marca, {headers});
  }
  public eliminar(id: number): Observable<Marca> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<any>(this.urlBase + `/${id}`, {headers});
  }
}
