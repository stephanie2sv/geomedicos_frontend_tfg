import { IUser } from "./iuser";

export interface IMedico extends IUser{
    telefono?: string;
    colegiado:string;
    especialidad: string;
    tratamientos:string;
}
