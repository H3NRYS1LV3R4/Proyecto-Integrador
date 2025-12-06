import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../service/marca.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';
@Component({
  selector: 'app-crear-marca',
  imports: [FormsModule,CommonModule],
  templateUrl: './crear-marca.component.html',
  styleUrl: './crear-marca.component.css'
})
export class CrearMarcaComponent {
  marca: Marca = {
    codmarca: 0, 
    nom_marca: '',
    pai_marca: ''
  };

  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(private marcaService: MarcaService, private router: Router, private authService:AutenticacionService) {
    if (!this.authService.getAuthHeaders()) { //<---- requiere del header del login para permitir el registro de una marca
      this.router.navigate(['/login']); // <-- redirige al login si no está autenticado
    }
  }

  crearMarca(): void {
    this.marcaService.registrar(this.marca).subscribe({
      next: () => {
        this.mostrarMensaje('Marca creada con éxito.', 'success');
        this.router.navigate(['/listadoMarcas']); 
      },
      error: (error) => {
        console.error('Error al crear:', error);
        this.mostrarMensaje('Ocurrió un error al crear la marca.', 'error');
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
