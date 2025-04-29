import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMedico } from '../../interfaces/imedico';
import { AuthService } from '../../auth/services/auth.service';
import { Cita } from '../../interfaces/cita';
import { IEspecialidad } from '../../interfaces/iespecialidad';
import { HttpErrorResponse } from '@angular/common/http';
import { MedicosService } from '../../services/medicos.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import { HorariosMedicosService } from '../../services/horarios-medicos.service';


@Component({
  selector: 'app-pide-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pide-cita.component.html',
  styleUrls: ['./pide-cita.component.scss']

})
export class PideCitaComponent implements OnInit {
  citaForm!: FormGroup;
  especialidades: IEspecialidad[] = [];
  medicos: IMedico[] = [];
  medicosFiltrados: IMedico[] = [];
  minFecha: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private horarioMedicoService: HorariosMedicosService,
    private medicoService: MedicosService,
    private especialidadesService: EspecialidadesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.citaForm = this.fb.group({
      especialidad: ['', Validators.required],
      fecha: ['', Validators.required],
      idMedico: ['', Validators.required]
    });
  
    this.especialidadesService.getEspecialidades().subscribe({
      next: (especialidades) => this.especialidades = especialidades,
      error: (error) => console.error('Error cargando especialidades:', error)
    });
  
    this.citaForm.get('especialidad')?.valueChanges.subscribe(() => this.buscarMedicosDisponibles());
    this.citaForm.get('fecha')?.valueChanges.subscribe(() => this.buscarMedicosDisponibles());
  }
  
  buscarMedicosDisponibles(): void {
    const especialidadId = this.citaForm.value.especialidad;
    const fecha = this.citaForm.value.fecha;
  
    if (especialidadId && fecha) {
      this.horarioMedicoService.getMedicosDisponibles(especialidadId, fecha).subscribe({
        next: (medicos) => this.medicosFiltrados = medicos,
        error: (error) => console.error('Error buscando médicos disponibles:', error)
      });
    }
  }

  cargarEspecialidades(): void {
    this.especialidadesService.getEspecialidades().subscribe({
      next: (especialidades: IEspecialidad[]) => {
        this.especialidades = especialidades;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error cargando especialidades:', error.message);
      }
    });
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe({
      next: (medicos: IMedico[]) => {
        this.medicos = medicos;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error cargando médicos:', error.message);
      }
    });
  }

  filtrarMedicosPorEspecialidad(idEspecialidad: number): void {
    this.medicosFiltrados = this.medicos.filter(medico =>
      medico.especialidades?.some(esp => esp.idEspecialidad === idEspecialidad)
    );
  }

  formatDateToDatetimeLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  onSubmit(): void {
    if (this.citaForm.invalid) return;

    const currentUser = this.authService.getCurrentUserValue();
    const medico = this.medicos.find(m => m.idUsuario === this.citaForm.value.idMedico);

    if (!currentUser || !medico) {
      console.error('Datos incorrectos para crear la cita.');
      return;
    }

    const nuevaCita: Cita = {
      idCita: 0,
      idPaciente: currentUser.idUsuario,
      nombrePaciente: `${currentUser.nombre} ${currentUser.apellidos}`,
      idMedico: medico.idUsuario,
      nombreMedico: `${medico.nombre} ${medico.apellidos}`,
      fecha: this.citaForm.value.fecha,
      estado: 'pendiente'
    };

    console.log('Cita creada:', nuevaCita);
    this.router.navigate(['/usuariodashboard']);
  }

  onFechaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fechaSeleccionada = input.value;
  
    const especialidadSeleccionada = this.citaForm.get('especialidad')?.value;
  
    if (especialidadSeleccionada && fechaSeleccionada) {
      this.buscarMedicosDisponibles();
    }
  }
}