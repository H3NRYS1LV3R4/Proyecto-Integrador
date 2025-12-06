import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ItemCarrito } from '../models/item-carrito';
import { Productos } from '../models/productos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: ItemCarrito[] = [];
  private urlCompra = 'http://localhost:8080/api/compras/registrar'; 

  constructor(private http: HttpClient, private authService: AutenticacionService,@Inject(PLATFORM_ID) private platformId: Object) {
    // Recuperar carrito del localStorage si existe al iniciar
    if (isPlatformBrowser(this.platformId)) {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.items = JSON.parse(carritoGuardado);
    }
  }
}

  agregarProducto(producto: Productos): void {
    const itemExistente = this.items.find(item => item.producto.codprod === producto.codprod);

    if (itemExistente) {
      itemExistente.cantidad++;
      itemExistente.total = itemExistente.cantidad * itemExistente.producto.precio_compra;
    } else {
      this.items.push({
        producto: producto,
        cantidad: 1,
        total: producto.precio_compra
      });
    }
    this.guardarStorage();
  }

  eliminarProducto(codprod: number): void {
    this.items = this.items.filter(item => item.producto.codprod !== codprod);
    this.guardarStorage();
  }

  actualizarCantidad(codprod: number, cantidad: number): void {
    const item = this.items.find(i => i.producto.codprod === codprod);
    if (item) {
      item.cantidad = cantidad;
      item.total = item.cantidad * item.producto.precio_compra;
      if (item.cantidad <= 0) {
        this.eliminarProducto(codprod);
      } else {
        this.guardarStorage();
      }
    }
  }

  getItems(): ItemCarrito[] {
    return this.items;
  }

  calcularTotal(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  limpiarCarrito(): void {
    this.items = [];
    localStorage.removeItem('carrito');
  }

  private guardarStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  registrarCompra(): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    const usuarioId = this.authService.getUsuarioId();
    const compraPayload = {
      codUsu: usuarioId, 
      montoCompra: this.calcularTotal(),
      mpago: "TARJETA", 
      detalles: this.items.map(item => ({
        codProd: item.producto.codprod,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio_compra
      }))
    };

    return this.http.post(this.urlCompra, compraPayload, { headers });
  }
}