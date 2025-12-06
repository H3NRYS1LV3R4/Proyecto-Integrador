import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';
import { response } from 'express';
@Component({
  selector: 'app-actualizar-usuario',
  imports:[FormsModule, CommonModule],
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})
export class ActualizarUsuarioComponent {
  usuario: Usuario ={
    codusu: 0,
    nomUsu: '',
    ape_usu:'',
    dni_usu:'',
    email: '',
    telefono:'',
    direccion: '',
    usuario:'',
    clave:'',
    rol:''
  };

  constructor(private usuarioService: UsuarioService, 
    private route: ActivatedRoute, private router: Router, private authService: AutenticacionService){}


    ngOnInit(): void{
      if(!this.authService.getAuthHeaders()){
        this.router.navigate(['login'])
        return;
      }
      this.cargarUsuario();
    }
    cargarUsuario(): void{
      const codusu = this.route.snapshot.params['codUsu'];
      this.usuarioService.buscar(codusu).subscribe({
        next: (response: Usuario)=>{
          this.usuario = response;
          console.log('Usuario seleccionado: '+ this.usuario.nomUsu);
        },
        error: (err)=>{
          console.error('Error al obtener el usuario: ', err);
        }
      });
    }

    mensaje : string = '';
    tipoMensaje : 'success' | 'error'| ''='';

    actualizarUsuario(): void{
      this.usuarioService.actualizar(this.usuario.codusu, this.usuario).subscribe({
        next: (response)=>{
          console.log('Usuario actualizado con éxito: ', response);
          this.router.navigate(['/listarUsuarios']);
          this.mostrarMensaje('Usuario Actualizado con éxito. ', 'success');
        },
        error: (error)=>{
          console.error('Error al actualizar: ', error);
          this.mostrarMensaje('Ocurrio un error al actualizar. ',  'success');
        }
      });
    }
    private mostrarMensaje(texto: string, tipo: 'success' | 'error'): void{
      this.mensaje = texto;
      this.tipoMensaje = tipo;
      setTimeout(()=> {
        this.mensaje = '';
        this.tipoMensaje ='';
    }, 2000);
  }
}
