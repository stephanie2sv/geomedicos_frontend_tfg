import { Injectable } from '@angular/core';
import { environment } from './environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMedicoCard } from '../interfaces/MedicoCard';
import { IHorarioDisponible } from '../interfaces/ihorario-disponible';
import { IMedicoDto } from '../interfaces/imedico-dto';
import { IHorarioAltaDto } from '../interfaces/ihorario-alta-dto';

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

  getHorariosDisponibles(colegiado: string, fecha: string): Observable<IHorarioDisponible[]> {
   return this.http.get<IHorarioDisponible[]>(`${this.apiUrl}/citasProgramadas`, {
    params: {
      colegiado,
      fechaInicio: fecha
    }
  });
}
  getHorariosDisponiblesAlta(colegiado: string, fecha: string): Observable<IHorarioAltaDto[]> {
   return this.http.get<IHorarioAltaDto[]>(`${this.apiUrl}/citasProgramadas`, {
    params: {
      colegiado,
      fechaInicio: fecha
    }
  });
}

getMedicosDisponiblesPorEspecialidadYFecha(idEspecialidad: number, fecha: string): Observable<IMedicoDto[]> {
  return this.http.get<IMedicoDto[]>(`${this.apiUrl}/disponibles-especialidad-fecha/`, {
    params: {
      idEspecialidad,
      fecha
    }
  });
}
 altaHorarioMedico(horario: IHorarioAltaDto): Observable<IHorarioAltaDto> {
    return this.http.post<IHorarioAltaDto>(`${this.apiUrl}/horario/alta`, horario);
  }

}
