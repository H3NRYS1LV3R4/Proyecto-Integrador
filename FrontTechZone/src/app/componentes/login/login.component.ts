import { Component } from '@angular/core';
import { AutenticacionService } from '../../service/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  clave = '';
  errorMessage = '';
  returnUrl: string = '';

  constructor(
    private authService: AutenticacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Capturamos el returnUrl de los query params (si existe)
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/listadoMarcas';
  }

  onLogin(): void {
    this.authService.login(this.username, this.clave).subscribe(success => {
      if (success) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
