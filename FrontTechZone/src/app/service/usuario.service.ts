import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticacionService } from './autenticacion.service';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = 'http://localhost:8080/api/usuarios'
  constructor(private http: HttpClient, private authService: AutenticacionService) { }

  listarUsuario(): Observable<Usuario[]>{
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Usuario[]>(this.urlBase, {headers});
  }

  registrar(usuario: Usuario): Observable<any>{
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(this.urlBase + `/registrar`, usuario)
  }

  buscar(codusu: number) : Observable<Usuario>{
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Usuario>(this.urlBase + `/${codusu}`, {headers});
  }

  actualizar(codusu: number, usuario:Usuario): Observable<any>{
    const headers = this.authService.getAuthHeaders();
    return this.http.put(this.urlBase +`/${codusu}`, usuario, {headers});
  }

  eliminar(id:number): Observable<Usuario>{
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<any>(this.urlBase + `/${id}`, {headers});
  }
}
