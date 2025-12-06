import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-proveedores',
  imports: [CommonModule],
  templateUrl: './listar-proveedores.component.html',
  styleUrl: './listar-proveedores.component.css'
})
export class ListarProveedoresComponent {
  titulo: string = 'Cargando...';
  proveedores: Proveedor[] = [];   //any[] = [];
  cargoTerminada: boolean = false;

  constructor(private proveedorService: ProveedorService, private router : Router) { }

  eliminarProveedor(codprov: number): void {
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar este proveedor?');
  
    if (confirmado) {
      this.proveedorService.eliminar(codprov).subscribe({
        next: () => {
          this.proveedores = this.proveedores.filter(m => m.codprov !== codprov);
          console.log('Proveedor eliminado con éxito');
        },
        error: err => {
          if(err.status == 401 || err.status ==403){
            alert('Debe tener permisos de administrador para esta acción')
            this.router.navigate(['/login']);
            return;
          }
          alert('Ocurrió un error al eliminar la marca seleccionada. ')
        }
      });
    }
  }


  verDetalleProveedor(codprov: number): void {
    this.router.navigate(['detallep', codprov]);
  }

  editarProveedor(codprov: number): void {
    // this.router.navigate(['editar', id_prod]);
    const confirmado = window.confirm('¿Estás seguro de que deseas editar este proveedor?');
    if (confirmado) {
      this.router.navigate(['editarp', codprov]).catch(error => {
        console.error('Error al navegar a la página de edición:', error);
        alert('Ocurrió un error al intentar abrir la edición del proveedor.');
      });
    }
  }
  ngOnInit(): void {
    this.proveedorService.listarProveedores().subscribe(data => {
      this.proveedores = data;
      this.titulo = 'Listado de proveedores';
      this.cargoTerminada = true;
    });
  }
}
