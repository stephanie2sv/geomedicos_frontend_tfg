import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../auth/interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private http : HttpClient = inject(HttpClient);

  constructor() { }

  buscarPorCorreo(correo: string): Observable<IUser> {
  return this.http.get<IUser>(`${this.apiUrl}/buscar?correo=${correo}`);
}

  getTodosUsuarios(): Observable<IUser[]> {
  return this.http.get<IUser[]>(`${this.apiUrl}/`);
}

cambiarEstadoUsuario(idUsuario: number, enabled: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/${idUsuario}/estado?enabled=${enabled}`, null);
}
}
