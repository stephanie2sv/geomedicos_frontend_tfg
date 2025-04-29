import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IMedico } from '../../../interfaces/imedico';


@Component({
  selector: 'app-medico-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './medico-card.component.html',
  styleUrl: './medico-card.component.css'
})
export class MedicoCardComponent {
  @Input() medico!: IMedico;

  @Output() verDetalle = new EventEmitter<IMedico>();
  @Output() solicitarCita = new EventEmitter<IMedico>();

  estrellas: number[] = [1, 2, 3, 4, 5];

  ngOnInit() {
    console.log('🧪 Card médico cargado:', this.medico);
    console.log('🧪 Especialidades:', this.medico.especialidades);
  }

  onDetalle() {
    this.verDetalle.emit(this.medico);
  }

  onSolicitar() {
    this.solicitarCita.emit(this.medico);
  }

  obtenerNombreEspecialidad(especialidad: any): string {
    if (typeof especialidad === 'string') {
      return especialidad;
    }
    if (especialidad && typeof especialidad === 'object' && 'nombre' in especialidad) {
      return especialidad.nombre;
    }
    return 'Desconocida';
  }
}
