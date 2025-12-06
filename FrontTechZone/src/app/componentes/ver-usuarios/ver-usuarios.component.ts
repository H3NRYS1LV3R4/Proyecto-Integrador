import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-usuarios',
  imports: [],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent {

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
  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute){}
  ngOnInit(): void{
    this.cargarUsuario();
  }

  cargarUsuario(): void{
    const id = this.route.snapshot.params['codUsu'];
    this.usuarioService.buscar(id).subscribe({
      next: (response: Usuario)=>{
        this.usuario = response;
        console.log('Usuario encontrado====>', this.usuario);
      },
      error: (err) =>{
        console.error('error al obtener la marca: ', err);
      }
    })
  }

}
