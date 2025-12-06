import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Productos } from '../../models/productos';
import { ProductoService } from '../../service/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-productos.component.html',
  styleUrl: './crear-productos.component.css'
})
export class CrearProductoComponent {
  producto: Productos = {
    codprod: 0,
    nom_prod: '',
    des_prod: '',
    cod_cat: 0,
    stock_prod: 0,
    precio_compra: 0,
    cod_prov: 0,
    cod_marca: 0
  };

  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(private productoService: ProductoService, private router: Router) {}

  crearProducto(): void {
    this.productoService.registrar(this.producto).subscribe({
      next: () => {
        this.mostrarMensaje('Producto creado con éxito.', 'success');
        this.router.navigate(['/listarProductos']);
      },
      error: (error) => {
        if(error.status == 403 || error.status == 401){
          alert('Necesita credenciales para proceder. ')
        }
        console.error('Error al crear producto:', error);
        this.mostrarMensaje('Ocurrió un error al crear el producto.', 'error');
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
