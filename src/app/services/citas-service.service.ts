import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from './environment.prod';
import { IEnfermedad } from '../interfaces/ienfermedad';
import { Cita } from '../interfaces/cita';
import { CitaDto } from '../interfaces/citaDto';
import { CitaDetallada } from '../interfaces/citaDetallada';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = `${environment.apiUrl}/paciente`
  private apiUrlMedico =`${environment.apiUrl}/medico`

  constructor(private  http : HttpClient){}

  getCitasPorId(idCitas: number):Observable<Cita[]>{
    console.log('llamando a getCitasPorId()...');
    return this.http.get<Cita[]>(`${this.apiUrl}/miscitas/${idCitas}`)
  }

  getAllCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas`)
  }

  getCitasPorUsuario(idUsuario: number) {
    return this.http.get<CitaDetallada[]>(`${this.apiUrl}/miscitas/${idUsuario}`);
  }

  eliminarCita(idCita: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/miscitas/eliminar/${idCita}`, {
      responseType: 'text' as 'json'
    });
  }

  crearCita(cita: CitaDto): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/miscitas/alta`, cita);
  }


getCitasPorMedico(colegiado: string, fecha: string): Observable<CitaDetallada[]> {
  return this.http.get<CitaDetallada[]>(`${this.apiUrlMedico}/miscitas-en-fecha`, {
    params: { colegiado, fecha }
  });
}

private get hoy(): string {
  return new Date().toISOString().split('T')[0];
}

getCitasMedico(colegiado: string): Observable<CitaDetallada[]> {
  return this.http.get<CitaDetallada[]>(`${this.apiUrlMedico}/miscitas/${colegiado}`);
}
}