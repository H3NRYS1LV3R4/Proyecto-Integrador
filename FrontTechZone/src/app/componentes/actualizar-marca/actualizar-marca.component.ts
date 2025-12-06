import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../service/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-actualizar-marca',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-marca.component.html',
  styleUrl: './actualizar-marca.component.css'
})
export class ActualizarMarcaComponent {
  marca: Marca = {
    codmarca: 0, nom_marca: '', pai_marca:''
  };

  constructor(private marcaService: MarcaService,
    private route: ActivatedRoute, private authService: AutenticacionService, private router:Router) { }
  
    ngOnInit(): void {
      if(!this.authService.getAuthHeaders()){
        this.router.navigate(['/login'])
        return;
      }
      this.cargarMarca();
    }

    cargarMarca(): void {
      const id = this.route.snapshot.params['codmarca'];
      this.marcaService.buscar(id).subscribe({
        next: (response: Marca) => {
          this.marca = response;
          console.log('Marca seleccionada:' + this.marca.nom_marca);
        },
        error: (err) => {
          console.error('Error al obtener la marca:', err);
        }
      });
    }

    // variables para la alerta
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  actualizarMarca(): void {
    this.marcaService.actualizar(this.marca.codmarca, this.marca).subscribe({
        next: (response) => {
          console.log('Marca actualizada con éxito:', response);
          this.router.navigate(['/listadoMarcas'])
          this.mostrarMensaje('Marca actualizada con éxito.', 'success');
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          this.mostrarMensaje('Ocurrió un error al actualizar la marca.',
            'error');
        }
      });
  }
  private mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 2000);
  }

}
