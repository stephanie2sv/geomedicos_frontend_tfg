import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMedicoCard } from '../../interfaces/MedicoCard';

@Component({
  selector: 'app-especialista-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './especialista-detalle.component.html',
  styleUrl: './especialista-detalle.component.css'
})
export class EspecialistaDetalleComponent {
  @Input() medico!: IMedicoCard;
  @Output() cerrar = new EventEmitter<void>();
  @Output() solicitarCita = new EventEmitter<IMedicoCard>();

  onCerrar() {
    this.cerrar.emit();
  }

  onSolicitarCita() {
    this.solicitarCita.emit(this.medico);
  }


}

