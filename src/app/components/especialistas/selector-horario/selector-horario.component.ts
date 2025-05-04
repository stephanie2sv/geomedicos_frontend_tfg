import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMedicoCard } from '../../../interfaces/MedicoCard';
import { IHorarioDisponible } from '../../../interfaces/ihorario-disponible';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-selector-horario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './selector-horario.component.html',
  styleUrl: './selector-horario.component.css'
})
export class SelectorHorarioComponent implements OnInit {
  @Input() medico!: IMedicoCard;
  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmarCita = new EventEmitter<{ fecha: Date; idHorario: number }>();

  horariosDisponibles: IHorarioDisponible[] = [];
  horarioSeleccionadoId: number | null = null;
  fechaSeleccionada: string = '';

  ngOnInit(): void {
    // Simulamos carga desde `medico.horarios` (ajústalo si viene de otra fuente)
    console.log('Medico recibido:', this.medico);
    this.horariosDisponibles = (this.medico as any).horarios || [];
  }

  onConfirmar(): void {
    if (!this.horarioSeleccionadoId || !this.fechaSeleccionada) return;

    const fecha = new Date(this.fechaSeleccionada);
    this.confirmarCita.emit({ fecha, idHorario: this.horarioSeleccionadoId });
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}