import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { error } from 'console';
import { AutenticacionService } from '../../service/autenticacion.service';



@Component({
  selector: 'app-listar-usuarios',
  imports: [CommonModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent {
  titulo : string = 'cargando....';
  usuarios : Usuario[] =[];
  cargaTerminada :boolean =false;

  constructor(private usuarioService:UsuarioService, private router : Router, private authService: AutenticacionService){}

  eliminarUsuario(codusu: number) : void{
    const confirmado = window.confirm('Estas por eliminar un usuario, ¿Desea continuar');
    if(confirmado){
      this.usuarioService.eliminar(codusu).subscribe({
        next: ()=>{
          this.usuarios= this.usuarios.filter(u => u.codusu !==codusu);
          console.log('¡Usuario eliminado!');
        },
        error: err => {
          if(err.status == 401 || err.status ==403){
            alert('Debe tener credenciales de administrador para elimar a un administrador')
            this.router.navigate(['login']);
            return;
          }
          alert('Ocurrio un error al tratar de eliminar')
    }
  });
  }
}

verDetalleUsuario(codusu: number) {
  console.log('Redirigiendo al detalle con codUsu:', codusu);
  this.router.navigate(['/detalleUsuario', codusu]);
}

  editarUsuario(codusu: number): void{
    const confirmado = window.confirm('¿Actualizar Usuario?');

    if(confirmado){
      this.router.navigate(['editar-usuario', codusu]).catch(error=>{
        console.error('Error al redireccionar a la página de edicion: ', error);
        alert('Ocurrió un errror al intentar ir a la edicion de usuario.' );
      });
    }
  }
  ngOnInit(): void{

    if(!this.authService.getAuthHeaders()){
      this.router.navigate(['/login'])
      return;
      
    }
    this.usuarioService.listarUsuario().subscribe(data =>{
      this.usuarios = data;
      this.titulo="Listado de Usuarios"
      this.cargaTerminada= true;
    });
    
  }
}
