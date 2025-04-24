import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Icita } from '../interfaces/icita';
import { environment } from './environment.prod';
import { IEnfermedad } from '../interfaces/ienfermedad';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = `${environment.apiUrl}/añadirruta!!`

  constructor(private  http : HttpClient){}

  getCitasPorId(idCitas: number):Observable<Icita[]>{
    console.log('llamando a getCitasPorId()...');
    return this.http.get<Icita[]>(`${this.apiUrl}/citas/${idCitas}`)
  }

  getAllCitas(): Observable<Icita[]> {
    return this.http.get<Icita[]>(`${this.apiUrl}/citas`)
  }

}