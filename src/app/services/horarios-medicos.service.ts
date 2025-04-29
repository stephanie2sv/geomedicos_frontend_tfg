import { Injectable } from '@angular/core';
import { IMedico } from '../interfaces/imedico';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosMedicosService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http : HttpClient) { }

  
getMedicosDisponibles(especialidadId: number, fecha: string): Observable<IMedico[]> {
    return this.http.get<IMedico[]>(`${this.apiUrl}/horarios-medico/disponibles?especialidadId=${especialidadId}&fecha=${fecha}`);
  }
}
