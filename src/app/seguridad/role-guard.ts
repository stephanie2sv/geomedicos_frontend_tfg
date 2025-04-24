import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";


export const roleGuard: CanActivateFn = (route) => {

    const authService = inject(AuthService); 
    const router = inject(Router);

    const expectedRole = route.data['expectedRole'];
    const userRole = authService.getRole();

    if(userRole === expectedRole) {
        return true;
    } 
    
    router.navigate(['/page404']); //redirige a pagina no encontrada
    return false;
}


