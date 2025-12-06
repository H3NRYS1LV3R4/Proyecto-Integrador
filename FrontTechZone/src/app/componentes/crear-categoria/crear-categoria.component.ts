import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-crear-categoria',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {
  categoria: Categoria = {
    codcat: 0,
    nom_cat: ''
  };

  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(private categoriaService: CategoriaService, private router: Router, private authService: AutenticacionService) {
    /*if (!this.authService.getAuthHeaders()) { //<---- requiere del header del login para permitir el registro de una marca
      this.router.navigate(['/login']); // <-- redirige al login si no está autenticado
    }*/
  }
  ngOnInit() {
    if (!this.authService.getAuthHeaders()) {
      this.router.navigate(['/login']);
    }
  }
  crearCategoria(): void {
    this.categoriaService.registrar(this.categoria).subscribe({
      next: () => {
        this.mostrarMensaje('Categoría creada con éxito.', 'success');
        this.router.navigate(['/listarCategorias']); 
      },
      error: (error) => {
        console.error('Error al crear:', error);
        this.mostrarMensaje('Ocurrió un error al crear la categoría.', 'error');
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