import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormsModule,CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
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

  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(private usuarioService: UsuarioService, private router: Router){
}

  agregarUsuario():void{
    this.usuarioService.registrar(this.usuario).subscribe({
      next: () =>{
        this.router.navigate(['/listarProductos']);
        this.mostrarMensaje('Usuario registrado con éxito. ', 'success');
      },
      error: (error)=>{
        console.error('error al registrar el usuario: ', error);
        this.mostrarMensaje('Ocurrió un error al agregra el usuario.', 'error');
      }
    });
  }
  private mostrarMensaje(text: string, tipo:'success' | 'error') :void{
    this.mensaje = text;
    this.tipoMensaje = tipo;
    setTimeout(()=>{
      this.mensaje ='';
      this.tipoMensaje = '';
    }, 2000);
  }

}

