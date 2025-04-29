import { Roles } from "../models/roles.enum";

export interface IUser {
    idUsuario: number;
    nombre: string;
    apellidos: string;
    correo: string;
    fechaAlta: Date;
    role: Roles;
    enabled: number;

    colegiado?: string;
    tarifa?: number;
    especialidad?: {
      idEspecialidad: number;
      nombre: string;
    };
    tratamientos?: string[];
}
