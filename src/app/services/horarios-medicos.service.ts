import { Injectable } from '@angular/core';
import { IMedico } from '../interfaces/imedico';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment.prod';
import { Observable } from 'rxjs';
import { IHorarioDisponible } from '../interfaces/ihorario-disponible';

@Injectable({
  providedIn: 'root'
})
export class HorariosMedicosService {

  private apiUrl = `${environment.apiUrl}/api/horarios-medico`;
  horarios!: IHorarioDisponible[];
  constructor(private http : HttpClient) { }

  getTodosLosHorarios() {
    return this.http.get<IHorarioDisponible[]>(`${this.apiUrl}/all`);
  }


  getMedicosDisponibles (
    especialidadId: number,
    fecha: string
  ): Observable<IHorarioDisponible[]> {
    return this.http.get<IHorarioDisponible[]>(
      `${this.apiUrl}/disponibles`,
      { params: { especialidadId, fecha } }
    );
  }
}
