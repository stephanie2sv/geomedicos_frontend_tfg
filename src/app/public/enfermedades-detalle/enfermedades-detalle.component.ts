import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEnfermedad } from '../../interfaces/ienfermedad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enfermedades-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enfermedades-detalle.component.html',
  styleUrl: './enfermedades-detalle.component.css'
})
export class EnfermedadesDetalleComponent {
  @Input() enfermedad!: IEnfermedad;
  @Output() cerrar = new EventEmitter<void>();
  @Output() buscarDoctores = new EventEmitter<IEnfermedad>();

  onCerrar() {
    this.cerrar.emit();
  }

  onBuscarDoctores() {
    this.buscarDoctores.emit(this.enfermedad);
  }

}
