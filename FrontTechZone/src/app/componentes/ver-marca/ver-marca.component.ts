import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../service/marca.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ver-marca',
  imports: [CommonModule],
  templateUrl: './ver-marca.component.html',
  styleUrl: './ver-marca.component.css'
})
export class VerMarcaComponent {
  marca: Marca = {
    codmarca: 0, nom_marca: '', pai_marca: ''
  };

  constructor(private marcaService: MarcaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarMarca();
  }

  cargarMarca(): void {
    const id = this.route.snapshot.params['codmarca'];
    this.marcaService.buscar(id).subscribe({
      next: (response: Marca) => {
        this.marca = response;
        console.log('Marca encontrada:', this.marca);
      },
      error: (err) => {
        console.error('Error al obtener la marca:', err);
      }
    });
  }

}
