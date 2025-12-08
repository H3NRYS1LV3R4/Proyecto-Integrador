import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraService } from '../../service/compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-compras.component.html', 
  styleUrls: ['./listar-compras.component.css']
})
export class ListarComprasComponent implements OnInit {
  titulo: string = 'Cargando Reporte de Compras...';
  compras: any[] = []; 
  cargoTerminada: boolean = false;

  constructor(private compraService: CompraService, private router: Router) {}

  ngOnInit(): void {
    this.compraService.listarReporteCompras().subscribe({
      next: (data) => {
        this.compras = data;
        this.titulo = 'Reporte de Compras Realizadas';
        this.cargoTerminada = true;
      },
      error: (err) => {
        console.error('Error al cargar compras:', err);
        if (err.status === 401 || err.status === 403) {
            alert('Acceso denegado. Solo administradores pueden ver este reporte.');
            this.router.navigate(['/login']);
        } else {
            alert('Error al cargar el reporte de compras.');
        }
      }
    });
  }
}