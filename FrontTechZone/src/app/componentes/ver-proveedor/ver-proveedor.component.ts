import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ver-proveedor',
  imports: [CommonModule],
  templateUrl: './ver-proveedor.component.html',
  styleUrl: './ver-proveedor.component.css'
})
export class VerProveedorComponent {
  proveedor: Proveedor = {
       codprov: 0, nom_prov: ''
      };

      constructor(private proveedorService: ProveedorService, private route: ActivatedRoute) {}

        ngOnInit(): void {
          this.cargarProveedor();
        }
    
        cargarProveedor(): void {
          const id = this.route.snapshot.params['codprov'];
          this.proveedorService.buscar(id).subscribe({
            next: (response: Proveedor) => {
              this.proveedor = response;
              console.log('Proveedor seleccionado:' + this.proveedor);
            },
            error: (err) => {
              console.error('Error al obtener el proveedor:', err);
            }
          });
        }
}
