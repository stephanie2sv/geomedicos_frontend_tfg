export interface CitaDetallada {
    idCita: number;
    fecha: string;
    horaInicio: string;
    nombreMedico?: string;
    nombrePaciente?: string;
    especialidad?: string;
    nombreClinica?: string;
  }