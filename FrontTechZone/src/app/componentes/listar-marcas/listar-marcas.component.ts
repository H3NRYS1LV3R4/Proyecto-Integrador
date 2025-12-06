import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../service/marca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-marcas',
  imports: [CommonModule],
  templateUrl: './listar-marcas.component.html',
  styleUrl: './listar-marcas.component.css'
})
export class ListarMarcasComponent {
  titulo : string = 'Cargando...';
  marcas : Marca[] = [];   //any[] = [];
  cargoTerminada : boolean = false;

  constructor(private marcaService: MarcaService, private router : Router) { }

  eliminarMarca(codmarca: number): void {
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar esta marca?');
  
    if (confirmado) {
      this.marcaService.eliminar(codmarca).subscribe({
        next: () => {
          this.marcas = this.marcas.filter(m => m.codmarca !== codmarca);
          alert('Marca eliminada')
        },
        error: err => {
          if(err.status==401 || err.status==403){
            alert('Debe tener permisos de administrador para esta acción')
            this.router.navigate(['/login']);
            return;
          }
          alert('Ocurrió un error al eliminar la marca seleccionada')
        }
      });
    }
  }


  verDetalleMarca(codmarca: number): void {
    this.router.navigate(['detalle', codmarca]);
  }


  editarMarca(codmarca: number): void {
    // this.router.navigate(['editar', id_prod]);
    const confirmado = window.confirm('¿Estás seguro de que deseas editar esta marca?');
    if (confirmado) {
      this.router.navigate(['editar', codmarca]).catch(error => {
        console.error('Error al navegar a la página de edición:', error);
        alert('Ocurrió un error al intentar abrir la edición del producto.');
      });
    }
  }

    ngOnInit() : void{
      this.marcaService.listarMarcas().subscribe(data => {
        this.marcas = data;
        this.titulo = 'Listado de marcas';
        this.cargoTerminada = true;
    });
    }
}
