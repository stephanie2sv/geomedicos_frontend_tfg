import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMedico } from '../../interfaces/imedico';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialista-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './especialista-detalle.component.html',
  styleUrl: './especialista-detalle.component.css'
})
export class EspecialistaDetalleComponent {
  @Input() medico!: IMedico;
  @Output() cerrar = new EventEmitter<void>();
  @Output() solicitarCita = new EventEmitter<IMedico>();

  onCerrar() {
    this.cerrar.emit();
  }

  onSolicitarCita() {
    this.solicitarCita.emit(this.medico);
  }
}

