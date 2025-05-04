import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cita } from '../../../interfaces/cita';
import { CommonModule } from '@angular/common';
import { HorariosMedicosService } from '../../../services/horarios-medicos.service';
import { IHorarioDisponible } from '../../../interfaces/ihorario-disponible';
import { AuthService } from '../../../auth/services/auth.service';
import { CitasService } from '../../../services/citas-service.service';
import { CitaDetallada } from '../../../interfaces/citaDetallada';


@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {
  @Input() cita!: Cita;
  @Input() esMedico: boolean = false;
  @Output() eliminar = new EventEmitter<number>();

  citaDetallada?: CitaDetallada;
  horarios: IHorarioDisponible[] = [];

  constructor(
    private horarioMedicoService: HorariosMedicosService,
    private authService: AuthService,
    private citasService: CitasService
  ) {}

  ngOnInit() {
    this.horarioMedicoService.getTodosLosHorarios().subscribe({
      next: horarios => {
        this.horarios = horarios;
        this.reconstruirCitaDetallada();
      },
      error: err => console.error('Error cargando horarios:', err)
    });
  }

  reconstruirCitaDetallada() {
    const horario = this.horarios.find(h => h.idHorario === this.cita.idHorario);
    const user = this.authService.getCurrentUserValue();

    this.citaDetallada = {
      idCita: this.cita.idCita,
      fecha: typeof this.cita.fecha === 'string' ? this.cita.fecha : this.cita.fecha.toISOString().split('T')[0],
      horaInicio: horario?.horaInicio ?? '10:00',
      nombreMedico: horario?.medico?.usuario?.nombre + ' ' + horario?.medico?.usuario?.apellidos,
      nombrePaciente: user?.nombre + ' ' + user?.apellidos,
      especialidad: horario?.medico?.especialidad?.nombre,
      nombreClinica: horario?.clinica?.nombre
    };
  }

  onEliminar() {
    this.eliminar.emit(this.cita.idCita);
  }

}
