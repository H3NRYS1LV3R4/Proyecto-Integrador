import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-crear-proveedor',
  imports: [FormsModule,CommonModule],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent {
    proveedor: Proveedor = { 
        codprov: 0,
        nom_prov: ''
      };
      
      mensaje: string = '';
      tipoMensaje: 'success' | 'error' | '' = '';

      constructor(private proveedorService: ProveedorService, private router: Router, private authService: AutenticacionService) {
        // Verifica al cargar el componente si está logueado
      if (!this.authService.estaAutenticado()) { //<---- requiere del header para permitir el registro del proveedor
        this.router.navigate(['/login']); // <-- redirige al login si no está autenticado 
      }
      }
      agregarProveedor(): void {
        this.proveedorService.registrar(this.proveedor).subscribe({
          next: () => {
            this.mostrarMensaje('Proveedor agregado con éxito.', 'success');
            this.router.navigate(['/listadoProveedores']);
          },
          error: (error) => {
            console.error('Error al agregar proveedor:', error);
            this.mostrarMensaje('Ocurrió un error al agregar el proveedor.', 'error');
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
