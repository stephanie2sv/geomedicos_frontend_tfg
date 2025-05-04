import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { IHorarioDisponible } from '../../interfaces/ihorario-disponible';

@Component({
  selector: 'app-medico-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './medico-card.component.html',
  styleUrl: './medico-card.component.css'
})
export class MedicoCardComponent {
@Input() turno!: IHorarioDisponible;
@Input() control!: FormControl;  

@Output() select = new EventEmitter<{ idMedico: number; turnoId: number }>();

onClick() {
  this.select.emit({
    idMedico: this.turno.medico.usuario.idUsuario,
    turnoId: this.turno.idHorario
  });
}
}
