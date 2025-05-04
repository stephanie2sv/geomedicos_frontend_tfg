import { Injectable } from '@angular/core';
import { environment } from './environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMedicoCard } from '../interfaces/MedicoCard';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private apiUrl = `${environment.apiUrl}/medico`;

  constructor(private http : HttpClient) { }

  getMedicosPorEspecialidad(idEspecialidad: number): Observable<IMedicoCard[]> {
    return this.http.get<IMedicoCard[]>(`${this.apiUrl}/especialidad/${idEspecialidad}`);
  }
 

  getMedicoPorId(colegiado: string): Observable<IMedicoCard> {
    return this.http.get<IMedicoCard>(`${this.apiUrl}/detalle/${colegiado}`);
  }

  buscarMedicos(termino: string): Observable<IMedicoCard[]> {
    return this.http.get<IMedicoCard[]>(`${this.apiUrl}/buscar?termino=${termino}`);
  }
  
  getMedicosPorTratamiento(idTratamiento: number): Observable<IMedicoCard[]> {
    return this.http.get<IMedicoCard[]>(`${this.apiUrl}/tratamiento/${idTratamiento}`);
  }

  getMedicos(){
    return this.http.get<IMedicoCard[]>(`${this.apiUrl}/todos`);
  }



}
