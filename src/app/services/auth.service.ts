import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
//La funcion principal de esta clase es controlar quien entra, quien sale y que puede hacer cada usuario una vez dentro. 
//Es como un guardia de seguridad con multiples responsabilidades 1. Indentificacion del usuario  2.Control de acceso 3.Gestion de Sesiones 4.Proteccion de rutas (roleguard que se culmina en otra carpeta)
export class AuthService {

  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null); //BehaviorSubject: Es un tipo especial de Observable que siempre tiene un valor actual, si el usuario inicia sesión o cierra sesión, todos los componentes suscritos se enteran inmediatamente
  public currentUser$: Observable<IUser | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if(storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

    isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
    }

    getRole(): String | null {
    return this.currentUserSubject.value?.role || null;
    }

   login(credentials: {correo: String; password: string}): Observable<IUser> { //cuando un user inicia sesion este metodo envia credencias al back si es correcto guarda al user en LocalStorage (para persistencia) y en BehaviorSubject(para state managment), emite al user a todos los componentes suscritos
    return this.http.post<IUser>('/api/login', credentials).pipe(  //lo de '/api/login' consultar con sergio (backend) !!!!!
      tap(user => {
        //Guardar usuario en localStorage del navegador
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    )
    }

   logout() { //limpia completamente la sesion 
    localStorage.removeItem('currentUser'); //borra los datos del localStorage
    this.currentUserSubject.next(null) //resetea el estado del user a null
    }

   //METODOS PARA VERIFICAR LOS ROLES

   isPaciente(): boolean { //true or false
    return this.currentUserSubject.value?.role === 'PACIENTE'
    }

    isDoctor(): boolean {
    return this.currentUserSubject.value?.role === 'DOCTOR'
    }

    isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'ADMON'
    }


   //Guard para proteger rutas

  canActivate(allowedRules: String[]): boolean {
    const currentUer = this.currentUserSubject.value;
    return currentUer ? allowedRules.includes(currentUer.role) : false;
    }


}
