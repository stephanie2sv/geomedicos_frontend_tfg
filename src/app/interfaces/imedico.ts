import { IUser } from "./iuser";

export interface IMedico extends IUser {
    colegiado: string; //el extends Iuser ya trae correo y role
    idUsuario: number;
    nombre: string;
    apellidos: string;
    especialidades?: string[];
    idEspecialidades?: number[];
    telefono?: string;
    tarifa: number;
    valoracionPromedio?: number;
    imagenUrl?: string;
    clinicas?: string[];
    tratamientos?: string[];
}



// import { IUser } from "./iuser";

// export interface IMedico extends IUser{
//     telefono?: string;
//     especialidad: String;
// }
