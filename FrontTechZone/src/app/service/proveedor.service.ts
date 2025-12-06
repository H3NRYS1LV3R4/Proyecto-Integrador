import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private urlBase = 'http://localhost:8080/api/proveedores';
  constructor(private http: HttpClient, private authService:AutenticacionService) {}
  listarProveedores(): Observable<Proveedor[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Proveedor[]>(this.urlBase, {headers});
  }

  public registrar(proveedor: Proveedor): Observable<any> {
      const headers = this.authService.getAuthHeaders();
      return this.http.post<any>(this.urlBase, proveedor, {headers});
    }
    public buscar(id: number): Observable<Proveedor> {
      const headers = this.authService.getAuthHeaders();
      return this.http.get<Proveedor>(this.urlBase + `/${id}`, {headers});
    }
    public actualizar(id: number, proveedor: Proveedor): Observable<any> {
      const headers = this.authService.getAuthHeaders();
      return this.http.put(this.urlBase + `/${id}`, proveedor, {headers});
    }
    public eliminar(id: number): Observable<Proveedor> {
      const headers = this.authService.getAuthHeaders();
      return this.http.delete<any>(this.urlBase + `/${id}`, {headers});
    }
}
