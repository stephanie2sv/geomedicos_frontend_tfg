import { IUser } from "../auth/interfaces/iuser";
import { IEspecialidad } from "./iespecialidad";

export interface IMedico extends IUser {
    colegiado: string; //el extends Iuser ya trae correo y role
    idUsuario: number;
    nombre: string;
    apellidos: string;
    especialidades?: IEspecialidad[];
    idEspecialidades?: number[];
    telefono?: string;
    tarifa: number;
    valoracionPromedio?: number;
    imagenUrl?: string;
    clinicas?: string[];
    tratamientos?: string[];
}


