import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-actualizar-categoria',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-categoria.component.html',
  styleUrl: './actualizar-categoria.component.css'
})
export class ActualizarCategoriaComponent {
  categoria: Categoria = {
    codcat: 0,
    nom_cat: ''
  };

  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AutenticacionService
  ) {}
  ngOnInit(): void {
    if (!this.authService.getAuthHeaders()) {
      this.router.navigate(['/login']);
      return; // para evitar seguir cargando si no está autenticado
    }
    this.cargarCategoria();
  }
  

  cargarCategoria(): void {
    const id = this.route.snapshot.params['codcat'];
    this.categoriaService.buscar(id).subscribe({
      next: (response: Categoria) => {
        this.categoria = response;
        console.log('Categoría seleccionada:', this.categoria.nom_cat);
      },
      error: (err) => {
        console.error('Error al obtener la categoría:', err);
      }
    });
  }

  actualizarCategoria(): void {
    this.categoriaService.actualizar(this.categoria.codcat, this.categoria).subscribe({
      next: (response) => {
        console.log('Categoría actualizada con éxito:', response);
        this.router.navigate(['/listarCategorias'])
        this.mostrarMensaje('Categoría actualizada con éxito.', 'success');
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        this.mostrarMensaje('Ocurrió un error al actualizar la categoría.', 'error');
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
