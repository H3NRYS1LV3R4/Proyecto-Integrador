import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../models/productos';
import { ProductoService } from '../../service/productos.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  titulo: string = 'Cargando...';
  productos: Productos[] = [];
  cargoTerminada: boolean = false;

  constructor(private productoService: ProductoService, private router: Router, private authService:AutenticacionService) {}

  ngOnInit(): void {
    this.productoService.listarProductos().subscribe(data => {
      this.productos = data;
      this.titulo = 'Listado de productos';
      this.cargoTerminada = true;
    });
  }

  eliminarProducto(codprod: number): void {
    /*iconst headers = this.authService.getAuthHeaders();
    f (!headers) {
      this.router.navigate(['/login']);
      return;
    }*/
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmado) {
      this.productoService.eliminar(codprod).subscribe({
        next: () => {
          this.productos = this.productos.filter(p => p.codprod !== codprod);
          alert('Producto eliminado con éxito');
        },
        error: err =>{
          if(err.status ==401){
            alert('Debe tener credenciales de administrador para eliminar. ')
            this.router.navigate(['/login']);
            return;
          }
          alert('error inesperado al eliminar el producto. ');
        }
      });
    }
  }

  verDetalleProducto(codprod: number): void {
    this.router.navigate(['detalle-producto', codprod]);
  }

  editarProducto(codprod: number): void {
    const confirmado = window.confirm('¿Estás seguro de que deseas editar este producto?');
    if (confirmado) {
      this.router.navigate(['editar-producto', codprod]).catch(error => {
        console.error('Error al navegar a la página de edición:', error);
        alert('Ocurrió un error al intentar abrir la edición del producto.');
      });
    }
  }
}

