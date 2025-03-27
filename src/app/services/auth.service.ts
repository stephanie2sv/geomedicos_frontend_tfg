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

  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null); //BehaviorSubject: Es un tipo especial de Observable que siempre tiene un valor actual, Si el usuario inicia sesión o cierra sesión, todos los componentes suscritos se enteran inmediatamente
  public currentUser$: Observable<IUser | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if(storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
   }


   login(credentials: {correo: String; password: string}): Observable<IUser> {
    return this.http.post<IUser>('/api/login', credentials).pipe(  //lo de '/api/login' consultar con sergio (backend) !!!!!
      tap(user => {
        //Guardar usuario en localStorage del navegador
        localStorage.setItem('CurrentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    )
   }

   logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null)
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
