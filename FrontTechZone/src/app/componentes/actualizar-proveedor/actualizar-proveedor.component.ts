import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';
@Component({
  selector: 'app-actualizar-proveedor',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-proveedor.component.html',
  styleUrl: './actualizar-proveedor.component.css'
})
export class ActualizarProveedorComponent {
  proveedor: Proveedor = {
     codprov: 0, nom_prov: ''
    };

    constructor(private proveedorService: ProveedorService,
      private route: ActivatedRoute, private router: Router, private authservice: AutenticacionService) { }

    ngOnInit(): void {
      if(!this.authservice.getAuthHeaders()){
        this.router.navigate(['/login'])
        return;
      }
          this.cargarProveedor();
        }
    
        cargarProveedor(): void {
          const id = this.route.snapshot.params['codprov'];
          this.proveedorService.buscar(id).subscribe({
            next: (response: Proveedor) => {
              this.proveedor = response;
              console.log('Proveedor seleccionado:' + this.proveedor.nom_prov);
            },
            error: (err) => {
              console.error('Error al obtener el proveedor:', err);
            }
          });
        }

        
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  actualizarProveedor(): void {
    this.proveedorService.actualizar(this.proveedor.codprov, this.proveedor).subscribe({
        next: (response) => {
          console.log('Proveedor actualizado con éxito:', response);
          this.router.navigate(['/listadoProveedores'])
          this.mostrarMensaje('Proveedor actualizado con éxito.', 'success');
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          
          this.mostrarMensaje('Ocurrió un error al actualizar el proveedor.',
            'error');
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
