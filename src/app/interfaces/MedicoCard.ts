import { IUser } from "../auth/interfaces/iuser";
import { Roles } from "../auth/models/roles.enum";
import { Clinica } from "./clinica";
import { IEspecialidad } from "./iespecialidad";
import { Itratamiento } from "./itratamiento";

export interface IMedicoCard {
  colegiado: string;
  tarifa: number;
  imagen: string;
  especialidad?: IEspecialidad; // opcional si ya hay `especialidades`
  especialidades?: IEspecialidad[]; // puede faltar
  tratamientos: Itratamiento[];
  usuario: IUser;
  clinicas?: Clinica[]; // <== ¡esto es muy importante!
  valoracionPromedio?: number;
}