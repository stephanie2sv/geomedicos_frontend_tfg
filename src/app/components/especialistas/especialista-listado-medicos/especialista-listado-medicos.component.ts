import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicoCardComponent } from '../../common/medico-card/medico-card.component';
import { IMedicoCard } from '../../../interfaces/MedicoCard';


@Component({
  selector: 'app-especialista-listado-medicos',
  standalone: true,
  imports: [ MedicoCardComponent],
  templateUrl: './especialista-listado-medicos.component.html',
  styleUrl: './especialista-listado-medicos.component.css'
})
export class EspecialistaListadoMedicosComponent {
  @Input() medicos: IMedicoCard[] = [];

  @Output() verDetalle = new EventEmitter<IMedicoCard>();
  @Output() solicitarCita = new EventEmitter<IMedicoCard>();

}
