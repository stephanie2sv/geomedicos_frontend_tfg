import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEspecialidad } from '../interfaces/iespecialidad';
import { environment } from './environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  private apiUrl = `${environment.apiUrl}/especialidades`;
  
  constructor(private http : HttpClient) { }

  getEspecialidades(): Observable<IEspecialidad[]> {
    return this.http.get<IEspecialidad[]>(`${this.apiUrl}/todas`);
  }

  getEspecialidadPorId(id: number): Observable<IEspecialidad> {
    return this.http.get<IEspecialidad>(`${this.apiUrl}/${id}`);
  }
 

}
