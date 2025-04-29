import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMedico } from '../../../interfaces/imedico';
import { MedicoCardComponent } from '../../common/medico-card/medico-card.component';


@Component({
  selector: 'app-especialista-listado-medicos',
  standalone: true,
  imports: [ MedicoCardComponent],
  templateUrl: './especialista-listado-medicos.component.html',
  styleUrl: './especialista-listado-medicos.component.css'
})
export class EspecialistaListadoMedicosComponent {
  @Input() medicos: IMedico[] = [];

  @Output() verDetalle = new EventEmitter<IMedico>();
  @Output() solicitarCita = new EventEmitter<IMedico>();

}
