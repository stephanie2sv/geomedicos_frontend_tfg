import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


// para evitar que usuarios autenticados accedan a las rutas publicas (como login o registro)
export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // si el usuario esta autenticado, lo redirigimos a su dashboard correspondiente y bloqueamos el acceso a la ruta
  if (authService.isAuthenticated()) {

    const rol = authService.getRole();

    switch (rol) {
      case 'PACIENTE':
        router.navigate(['/usuariodashboard']);
        return false;
      case 'DOCTER':
        router.navigate(['/medico/dashboard']);
        return false;
      case 'ADMON':
        router.navigate(['/admin/dashboard']);
        return false;
      default: 
        router.navigate(['/home']);
        return false;
    }
  }
  // si no esta autenticado, permitimos el acceso a la ruta
  return true;
};
