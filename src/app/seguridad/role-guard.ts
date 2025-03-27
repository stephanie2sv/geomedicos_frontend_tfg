import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../services/auth.service';



@Injectable({
    providedIn: 'root'
  })
export class RoleGuard  implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const requiredRoles = route.data['roles'] as string[];

        if (this.authService.canActivate(requiredRoles)){
            return true;
        }

        //Redirigir a pagina de login o acceso denegado
        this.router.navigate(['/login'])
        return false;

    }
}
