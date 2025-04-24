import { Injectable } from '@angular/core';
import { IEnfermedad } from '../interfaces/ienfermedad';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadesService {

  private apiUrl = `${environment.apiUrl}/enfermedad`

  constructor(private http: HttpClient) { }


  getEnfermedades(): Observable<IEnfermedad[]> {
    return this.http.get<IEnfermedad[]>(`${this.apiUrl}/todas`); //cambiar a api cuando este 
  }

  getEnfermedadPorId(id: number): Observable<IEnfermedad> {
    return this.http.get<IEnfermedad>(`${this.apiUrl}/detalle/${id}`);
  }

  buscarEnfermedades(termino: string): Observable<IEnfermedad[]> {
    return this.http.get<IEnfermedad[]>(`${this.apiUrl}/buscar?termino=${termino}`);
  }

  // metodo para obtener enfermedades por especialidad
  getEnfermedadesPorEspecialidad(idEspecialidad: number): Observable<IEnfermedad[]> {
    return this.http.get<IEnfermedad[]>(`${this.apiUrl}/especialidad/${idEspecialidad}`);
  }


}
