import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';import { IUser } from '../interfaces/iuser';
import { IMedico } from '../interfaces/imedico';
import { Cita } from '../interfaces/cita';
import { Itratamiento } from '../interfaces/itratamiento';
import { Ihorario } from '../interfaces/ihorario';
import { Iespecialidad } from '../interfaces/iespecialidad';
import { Clinica } from '../interfaces/clinica';


@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private usuarios: IUser[] = [
    { id_usuario: 1, nombre: 'Juan', apellidos: 'Pérez', correo: 'juan@example.com', fecha_alta: new Date(), role: 'PACIENTE', enabled: 1 },
    { id_usuario: 2, nombre: 'Dra. Laura', apellidos: 'Gómez', correo: 'laura@example.com', fecha_alta: new Date(), role: 'DOCTOR', enabled: 1 }
  ];

  private medicos: IMedico[] = [
    { id_usuario: 2, nombre: 'Dra. Laura', apellidos: 'Gómez', correo: 'laura@example.com', fecha_alta: new Date(), role: 'DOCTOR', enabled: 1, colegiado: '12345', especialidad: 'Cardiología', tratamientos: 'Hipertensión' }
  ];

  private citas: Cita[] = [
    { idCita: 1, idPaciente: 1, nombrePaciente: 'Juan Pérez', fecha: new Date(), estado: 'Pendiente' },
    { idCita: 2, idPaciente: 2, nombrePaciente: 'Juana Suarez', fecha: new Date(), estado: 'Completado' }
  ];

  private tratamientos: Itratamiento[] = [
    { idTratamiento: 1, idEspecialidad: 1, nombre: 'Rehabilitación', descripcion: 'Ejercicios de recuperación' }
  ];

  private horarios: Ihorario[] = [
    { idHorario: '1', colegiado: '12345', dia_semana: 'Lunes', horario_inicio: new Date('2024-04-01T08:00:00') }
  ];

  private especialidades: Iespecialidad[] = [
    { idEspecialidad: 1, nombre: 'Cardiología' },
    { idEspecialidad: 2, nombre: 'Rehabilitacion' }
  ];

  private clinicas: Clinica[] = [
    { idClinica: 1, nombre: 'Clínica Central', direccion: 'Calle 123', codigoPostal: '28001', ciudad: 'Madrid' }
  ];

  private especialidadClinica = [
    { idClinica: 1, idEspecialidad: 1 }, // Cardiología en Clínica Central
    { idClinica: 2, idEspecialidad: 2 }  // Neurología en Clínica Norte
  ];

  private doctorEspecialidad = [
    { idUser: 2, idEspecialidad: 1 }, // Dra. Laura -> Cardiología
    { idUser: 3, idEspecialidad: 2 }  // Dr. Carlos -> Neurología
  ];

  private doctorTratamiento = [
    { idUser: 2, idTratamiento: 1 }, // Dra. Laura -> Revisión Cardiovascular
    { idUser: 2, idTratamiento: 2 }, // Dra. Laura -> Electrocardiograma
    { idUser: 3, idTratamiento: 3 }  // Dr. Carlos -> Consulta Neurológica
  ];

  constructor() {}

  // Métodos para obtener datos simulados
  getUsuarios(): Observable<IUser[]> {
    return of(this.usuarios).pipe(delay(1000));
  }

  getUserByEmail(correo:string):IUser{
    const user= this.usuarios.find(user=>user.correo===correo);
    return user || {  
      id_usuario: 0,
      nombre: 'Desconocido',
      apellidos: '',
      correo: '',
      fecha_alta: new Date(),
      role: 'PACIENTE',
      enabled: 0,
    } as IUser;
  } 
  

  getMedicos(): Observable<IMedico[]> {
    return of(this.medicos).pipe(delay(1000));
  }
  
  getDoctorByEmail(correo:string):IMedico{
    const doctor= this.medicos.find(doctor=>doctor.correo===correo);
    return doctor || {  
      id_usuario: 0,
      nombre: 'Desconocido',
      colegiado: '0',  
      apellidos: '',
      correo: '',
      fecha_alta: new Date(),
      role: 'DOCTOR',  
      enabled: 0,
      especialidad: 'Sin especialidad',  
      tratamientos: 'Sin tratamientos',  
    } as IMedico;
  }

  getCitas(): Observable<Cita[]> {
    return of(this.citas).pipe(delay(1000));
  }

  getTratamientos(): Observable<Itratamiento[]> {
    return of(this.tratamientos).pipe(delay(1000));
  }

  getHorarios(): Observable<Ihorario[]> {
    return of(this.horarios).pipe(delay(1000));
  }

  getEspecialidades(): Observable<Iespecialidad[]> {
    return of(this.especialidades).pipe(delay(1000));
  }

  getClinicas(): Observable<Clinica[]> {
    return of(this.clinicas).pipe(delay(1000));
  }

  getTratamientosByDoctor(idDoctor: number): Observable<Itratamiento[]> {
    const tratamientosIds = this.doctorTratamiento
      .filter(dt => dt.idUser === idDoctor)
      .map(dt => dt.idTratamiento);

    const tratamientosDoctor = this.tratamientos.filter(t => tratamientosIds.includes(t.idTratamiento));

    return of(tratamientosDoctor).pipe(delay(1000));
  }

  getDoctoresByClinica(idClinica: number): Observable<IMedico[]> {
    const especialidadesClinica = this.especialidadClinica
      .filter(ec => ec.idClinica === idClinica)
      .map(ec => ec.idEspecialidad);

    const doctoresIds = this.doctorEspecialidad
      .filter(de => especialidadesClinica.includes(de.idEspecialidad))
      .map(de => de.idUser);

    const doctores = this.medicos
      .filter(medico => doctoresIds.includes(medico.id_usuario))
      .map(medico => ({
        ...medico,
        tratamientos: this.tratamientos
          .filter(t => this.doctorTratamiento.some(dt => dt.idUser === medico.id_usuario && dt.idTratamiento === t.idTratamiento))
          .map(t => t.nombre)
          .join(', ') // 🔥 Convertimos los tratamientos en una lista separada por comas
      }));

    return of(doctores).pipe(delay(1000));
  }
  
}
