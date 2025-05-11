import { Component, Input, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule,MatCardSubtitle,MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { IUser } from '../../../auth/interfaces/iuser';
import { DatosPersonalesService } from '../../../services/datos-personales.service';
import { IMedicoCard } from '../../../interfaces/MedicoCard';
import { IMedicoDto } from '../../../interfaces/imedico-dto';
import { ModalAltaHorarioComponent } from "../../../pages/modal-alta-horario/modal-alta-horario.component";
import { ModalAgruparHorarioComponent } from "../../../pages/modal-agrupar-horario/modal-agrupar-horario.component";


@Component({
  selector: 'app-datos-desplegable',
  standalone: true,
  imports: [MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatIcon, ModalAltaHorarioComponent, ModalAgruparHorarioComponent],
  templateUrl: './datos-desplegable.component.html',
  styleUrl: './datos-desplegable.component.css'
})
export class DatosDesplegableComponent implements OnInit {

@Input() correo!: string;
@Input() persona:IUser | IMedicoDto | null
mostrarAltaHorario: boolean = false;
mostrarListadoHorarios: boolean = false;


constructor(private datosPersonalesService:DatosPersonalesService){
this.persona=null;

}

ngOnInit(): void {
  if (this.persona) {
    console.log('Persona recibida en DatosDesplegableComponent:', this.persona);
  } else {
    console.error('Persona es null o undefined en DatosDesplegableComponent');
  }
}

isMedico(persona: any): persona is IMedicoDto {
  return persona?.colegiado !== undefined && persona?.tratamientos !== undefined;
}

abrirModalAltaHorario() {
  this.mostrarAltaHorario = true;
}

abrirModalVerHorarios() {
  this.mostrarListadoHorarios = true;
}

cerrarModales() {
  this.mostrarAltaHorario = false;
  this.mostrarListadoHorarios = false;
}
}
