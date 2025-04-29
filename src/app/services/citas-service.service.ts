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

  private apiUrl = `${environment.apiUrl}/añadirruta!!`

  constructor(private  http : HttpClient){}

  getCitasPorId(idCitas: number):Observable<Cita[]>{
    console.log('llamando a getCitasPorId()...');
    return this.http.get<Cita[]>(`${this.apiUrl}/citas/${idCitas}`)
  }

  getAllCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas`)
  }

}