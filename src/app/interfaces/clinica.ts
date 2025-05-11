import { IEspecialidad } from "./iespecialidad"

export interface Clinica {
    idClinica:number,
    nombre:string,
    direccion:string,
    codigoPostal:string,
    ciudad:string
    especialidades:IEspecialidad[];
}
