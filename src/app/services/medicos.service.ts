import { Injectable } from '@angular/core';
import { environment } from './environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMedico } from '../interfaces/imedico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private apiUrl = `${environment.apiUrl}/medico`;

  constructor(private http : HttpClient) { }

  getMedicosPorEspecialidad(idEspecialidad: number): Observable<IMedico[]> {
    return this.http.get<IMedico[]>(`${this.apiUrl}/especialidad/${idEspecialidad}`);
  }
 

  getMedicoPorId(colegiado: string): Observable<IMedico> {
    return this.http.get<IMedico>(`${this.apiUrl}/detalle/${colegiado}`);
  }

  buscarMedicos(termino: string): Observable<IMedico[]> {
    return this.http.get<IMedico[]>(`${this.apiUrl}/buscar?termino=${termino}`);
  }
  
  getMedicosPorTratamiento(idTratamiento: number): Observable<IMedico[]> {
    return this.http.get<IMedico[]>(`${this.apiUrl}/tratamiento/${idTratamiento}`);
  }

  getMedicos(){
    return this.http.get<IMedico[]>(`${this.apiUrl}/todos`);
  }



}
