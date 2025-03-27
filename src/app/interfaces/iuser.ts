export interface IUser {
    id_usuario: number;
    nombre: string;
    apellidos: string;
    correo: string;
    fecha_alta: Date;
    role: 'PACIENTE' | 'DOCTOR' | 'ADMON';
    enabled: number;
}
