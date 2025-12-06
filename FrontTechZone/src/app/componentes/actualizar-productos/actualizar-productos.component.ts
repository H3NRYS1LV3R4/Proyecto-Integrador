import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Productos } from '../../models/productos';
import { ProductoService } from '../../service/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-productos.component.html',
  styleUrl: './actualizar-productos.component.css'
})
export class ActualizarProductoComponent {
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

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AutenticacionService
  ) {}

  ngOnInit(): void {
    if((!this.authService.getAuthHeaders())){
      this.router.navigate(['/login'])
      return;
    }
    this.cargarProducto();
  }

  cargarProducto(): void {
    const id = this.route.snapshot.params['codprod'];
    this.productoService.buscar(id).subscribe({
      next: (response: Productos) => {
        this.producto = response;
        console.log('Producto cargado:', this.producto.nom_prod);
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
      }
    });
  }

  actualizarProducto(): void {
    this.productoService.actualizar(this.producto.codprod, this.producto).subscribe({
      next: (response) => {
        console.log('Producto actualizado con éxito:', response);
        this.router.navigate(['/listarProductos'])
        this.mostrarMensaje('Producto actualizado con éxito.', 'success');
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error);
        this.mostrarMensaje('Error al actualizar el producto.', 'error');
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
