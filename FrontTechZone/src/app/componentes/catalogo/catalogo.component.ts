import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../models/productos';
import { ProductoService } from '../../service/productos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-catalogo',
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  titulo: string = 'Cargando...';
    productos: Productos[] = [];
    cargoTerminada: boolean = false;
  
    constructor(private productoService: ProductoService, private router: Router) {}

    ngOnInit(): void {
    this.productoService.listarProductos().subscribe(data => {
      this.productos = data;
      this.titulo = 'Listado de productos';
      this.cargoTerminada = true;
    });
  }

  verDetalleProducto(codprod: number): void {
    this.router.navigate(['detalle-producto', codprod]);
  }
}
