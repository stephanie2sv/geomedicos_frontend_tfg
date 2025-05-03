import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from './environment.prod';
import { IEnfermedad } from '../interfaces/ienfermedad';
import { Cita } from '../interfaces/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = `${environment.apiUrl}/api/paciente`

  constructor(private  http : HttpClient){}

  getCitasPorId(idCitas: number):Observable<Cita[]>{
    console.log('llamando a getCitasPorId()...');
    return this.http.get<Cita[]>(`${this.apiUrl}/miscitas/${idCitas}`)
  }

  getAllCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas`)
  }

  getCitasPorUsuario(idUsuario: number) {
    return this.http.get<Cita[]>(`${this.apiUrl}/miscitas/${idUsuario}`);
  }

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/miscitas/alta`, cita);
  }
}