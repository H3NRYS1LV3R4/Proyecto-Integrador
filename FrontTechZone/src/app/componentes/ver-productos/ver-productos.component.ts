import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../models/productos';  
import { ProductoService } from '../../service/productos.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductoComponent {
  producto: Productos = {
    codprod: 0,
    nom_prod: '',
    des_prod: '',
    cod_cat: 0, 
    stock_prod: 0,
    precio_compra: 0.0,
    cod_prov: 0,
    cod_marca: 0
  };

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void {
    const id = this.route.snapshot.params['codprod'];
    this.productoService.buscar(id).subscribe({
      next: (response: Productos) => {
        this.producto = response;
        console.log('Producto encontrado:', this.producto);
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
      }
    });
  }
}
