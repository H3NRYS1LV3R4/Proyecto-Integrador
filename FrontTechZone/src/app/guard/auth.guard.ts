import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../service/autenticacion.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);

  if (!authService.estaAutenticado()) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  if (authService.getRol() === 'ADMIN') {
    return true; 
  } else {
    alert('Acceso denegado. Se requiere rol de administrador.');
    return router.createUrlTree(['/listarProductos']); 
  }
};
