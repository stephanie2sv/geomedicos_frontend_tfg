// src/app/services/clinicas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Clinica } from '../interfaces/clinica';
import { ClinicaDto } from '../interfaces/ClinicaDto';

@Injectable({
  providedIn: 'root'
})
export class ClinicasService {
  private baseUrl = 'http://localhost:9005/clinicas';

  constructor(private http: HttpClient) {}

  getTodas(): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(`${this.baseUrl}/todas`);
  }

  buscarPorNombre(nombre: string): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(`${this.baseUrl}/nombre/${nombre}`);
  }

  getClinicaPorId(id: number): Observable<Clinica> {
    return this.http.get<Clinica>(`${this.baseUrl}/una/${id}`);
  }

  getClinicasPorCiudad(ciudad: string): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(`${this.baseUrl}/ciudad/${ciudad}`);
  }

   crearClinica(clinica: ClinicaDto): Observable<ClinicaDto> {
    return this.http.post<ClinicaDto>(`${this.baseUrl}/alta`, clinica);
  }

  eliminarClinica(idClinica: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idClinica}`, { responseType: 'text' });
  }
}
