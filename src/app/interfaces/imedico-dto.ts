import { IEspecialidad } from "./iespecialidad";
import { Itratamiento } from "./itratamiento";

export interface IMedicoDto {
    idUsuario: number;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    genero: string;
    fechaNacimiento: string;
    fechaAlta: string;
    enabled: number;
    role: string;
    colegiado: string;
    tarifa: number;
    imagen: string;
    especialidades: IEspecialidad[];
    tratamientos: Itratamiento[];
  }