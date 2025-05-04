import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUser } from '../auth/interfaces/iuser';
import { environment } from './environment.prod';
import { IMedicoCard } from '../interfaces/MedicoCard';


@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {
 
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  getDatosPersonalesByEmail(correo: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/detalle?correo=${correo}`);
  }

  getDatosMedicoByEmail(correo: string): Observable<IMedicoCard> {
    return this.http.get<IMedicoCard>(`${this.apiUrl}/medico?correo=${correo}`);
  }

  actualizarDatosPersonales(usuario: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/actualizar`, usuario);
  }
  
  // Si necesitas añadir un nuevo usuario
  registrarUsuario(usuario: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/registrar`, usuario);
  }



}