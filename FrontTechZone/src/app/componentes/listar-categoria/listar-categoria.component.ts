import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-categoria',
  imports: [CommonModule],
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent {
  titulo: string = 'Cargando...';
  categorias: Categoria[] = [];
  cargoTerminada: boolean = false;

  constructor(private categoriaService: CategoriaService, private router: Router) {}


  eliminarCategoria(codcat: number): void {
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar esta categoría?');
    if (confirmado) {
      this.categoriaService.eliminar(codcat).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(c => c.codcat !== codcat);
          alert('Categoría eliminada con éxito'); 
        },
        error: err => {
          if(err.status==401 || err.status==403){
            alert('Debe tener credenciales de administrador para eliminar. ')
            this.router.navigate(['/login']);
            return;
          }
            alert('Ocurrió un error inesperado al intentar eliminar la categoría.');
        }
      });
    }
  }
  
  
  
  
  /*eliminarCategoria(codcat: number): void {
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar esta categoría?');
    if (confirmado) {
      this.categoriaService.eliminar(codcat).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(c => c.codcat !== codcat);
          console.log('Categoría eliminada con éxito');
        },
        error: err => {
          console.error('Error al eliminar la categoría:', err);
          alert('Ocurrió un error al intentar eliminar la categoría.');
        }
      });
    }
  }*/

  verDetalleCategoria(codcat: number): void {
    this.router.navigate(['detallec', codcat]);
  }


  

  
  editarCategoria(codcat: number): void {
    const confirmado = window.confirm('¿Estás seguro de que deseas editar esta categoría?');
    if (confirmado) {
      this.router.navigate(['editarcategoria', codcat]).catch(error => {
        console.error('Error al navegar a la página de edición:', error);
        alert('Ocurrió un error al intentar abrir la edición de la categoría.');
      });
    }
  }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
      this.titulo = 'Listado de categorías';
      this.cargoTerminada = true;
    });
  }
}
