import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IMedicoCard } from '../../../interfaces/MedicoCard';
import { IHorarioDisponible } from '../../../interfaces/ihorario-disponible';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { MedicosService } from '../../../services/medicos.service';

@Component({
  selector: 'app-selector-horario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './selector-horario.component.html',
  styleUrl: './selector-horario.component.css'
})
export class SelectorHorarioComponent {
  @Input() medico!: IMedicoCard;
  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmarCita = new EventEmitter<{ fecha: Date; idHorario: number }>();

  horariosDisponibles: IHorarioDisponible[] = [];
  horarioSeleccionadoId: number | null = null;
  fechaSeleccionada: string = '';
  private medicoService:MedicosService = inject(MedicosService);

  constructor() {}

  cargarHorarios(): void {
    if (!this.fechaSeleccionada) return;

    this.medicoService.getHorariosDisponibles(this.medico.colegiado, this.fechaSeleccionada).subscribe({
      next: (data) => {
        this.horariosDisponibles = data;
        console.log('✅ Horarios disponibles:', data);
      },
      error: (err) => {
        console.error('❌ Error al cargar horarios:', err);
      }
    });
  }

  onConfirmar(): void {
    if (!this.horarioSeleccionadoId || !this.fechaSeleccionada) return;
    this.confirmarCita.emit({
      fecha: new Date(this.fechaSeleccionada),
      idHorario: this.horarioSeleccionadoId
    });
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}