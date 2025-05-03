import { Clinica } from "./clinica";


export interface IHorarioDisponible {
    idHorario:  number;
    medico: {
      usuario: {
        idUsuario: number;
        nombre:    string;
        apellidos: string;
      };
      tarifa:     number;
      especialidad: { idEspecialidad: number; nombre: string; };
    };
    fechaCita:  string;
    horaInicio: string;
    estado:     string;
    clinica:    Clinica;
  }
