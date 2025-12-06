import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-categoria',
  imports: [CommonModule],
  templateUrl: './ver-categoria.component.html',
  styleUrl: './ver-categoria.component.css'
})
export class VerCategoriaComponent {
  categoria: Categoria = {
    codcat: 0,
    nom_cat: ''
  };

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria(): void {
    const id = this.route.snapshot.params['codcat'];
    this.categoriaService.buscar(id).subscribe({
      next: (response: Categoria) => {
        this.categoria = response;
        console.log('Categoría encontrada:', this.categoria);
      },
      error: (err) => {
        console.error('Error al obtener la categoría:', err);
      }
    });
  }
}

