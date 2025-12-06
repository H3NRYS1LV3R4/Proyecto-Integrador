import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { CarritoService } from '../../service/carrito.service';
import { ItemCarrito } from '../../models/item-carrito';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  items: ItemCarrito[] = [];
  total: number = 0;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.items = this.carritoService.getItems();
    this.total = this.carritoService.calcularTotal();
  }

  eliminarItem(codprod: number): void {
    this.carritoService.eliminarProducto(codprod);
    this.cargarCarrito(); 
  }

  actualizarCantidad(codprod: number, event: any): void {
    const cantidad = event.target.value;
    this.carritoService.actualizarCantidad(codprod, Number(cantidad));
    this.cargarCarrito();
  }

  vaciarCarrito(): void {
    this.carritoService.limpiarCarrito();
    this.cargarCarrito();
  }

  procesarCompra(): void {
    if (this.items.length === 0) {
      this.mostrarMensaje('El carrito está vacío.', 'error');
      return;
    }

    if(!confirm('¿Estás seguro de finalizar la compra?')) return;

    this.carritoService.registrarCompra().subscribe({
      next: (compra) => {
        console.log('Compra exitosa:', compra);
        this.carritoService.limpiarCarrito(); 
        this.cargarCarrito(); 
        this.mostrarMensaje(`¡Compra realizada con éxito! Código: ${compra.codCompra}`, 'success');
        
        setTimeout(() => {
           this.router.navigate(['/listarProductos']);
        }, 3000);
      },
      error: (err) => {
        console.error('Error en compra:', err);
        if(err.status === 401 || err.status === 403) {
            this.mostrarMensaje('Tu sesión ha expirado o no tienes permisos. Por favor inicia sesión nuevamente.', 'error');
            setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
            this.mostrarMensaje('Ocurrió un error al procesar la compra. Intenta nuevamente.', 'error');
        }
      }
    });
  }

  private mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 4000);
  }
}