export interface Cita {
    idCita: number;
    idUsuario: number;
    nombrePaciente: string;
    idMedico: number;
    nombreMedico: string;
    fecha: Date;
    estado: string;
    idHorario:number;
    especialidad?: string;
    horaInicio?: string;
    nombreClinica?: string;
  }
