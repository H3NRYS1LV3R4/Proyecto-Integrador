import { Component } from '@angular/core';
import { RouterLink, RouterOutlet,Router, } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AutenticacionService } from './service/autenticacion.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tech-zone';

constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }

  esAdmin(): boolean {
    return this.authService.getRol() === 'ADMIN';
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/listarProductos']); 
  }
}
