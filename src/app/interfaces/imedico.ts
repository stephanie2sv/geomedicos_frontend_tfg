import { IUser } from "./iuser";

export interface IMedico extends IUser{
    telefono?: string;
    especialidad: String;
}
