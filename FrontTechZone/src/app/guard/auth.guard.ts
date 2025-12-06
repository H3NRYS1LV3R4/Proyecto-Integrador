import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../service/autenticacion.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);

  if (authService.estaAutenticado()) {
    return true; 
  } else {
    // Creamos un árbol de URL con el parámetro returnUrl
    return router.createUrlTree(
      ['/login'], 
      { queryParams: { returnUrl: state.url } }
    );
  }
};
