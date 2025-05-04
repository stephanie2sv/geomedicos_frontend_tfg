import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { environment } from '../../services/environment.prod';
import { Roles } from '../models/roles.enum';
import { IMedicoDto } from '../../interfaces/imedico-dto';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = `${environment.apiUrl}`;

  private currentUserSubject = new BehaviorSubject<IUser | IMedicoDto | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }


  login(credentials: { correo: string; password: string }): Observable<IUser | IMedicoDto> {
    return this.http.post<IUser | IMedicoDto>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }


  getRole(): string | undefined {
    return (this.currentUserSubject.value as IUser)?.role;
  }

  isPaciente(): boolean {
    return this.getRole() === Roles.Paciente;
  }

  isDoctor(): boolean {
    return this.getRole() === Roles.Doctor;
  }

  isAdmin(): boolean {
    return this.getRole() === Roles.Admin;
  }

  canActivate(allowedRoles: string[]): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? allowedRoles.includes(currentUser.role) : false;
  }

  
  getCurrentUserValue(): IUser | IMedicoDto | null {
    return this.currentUserSubject.value;
  }

  

}
