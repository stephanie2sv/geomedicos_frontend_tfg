import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Cita } from '../../interfaces/cita';
import { IEspecialidad } from '../../interfaces/iespecialidad';
import { EspecialidadesService } from '../../services/especialidades.service';
import { HorariosMedicosService } from '../../services/horarios-medicos.service';
import { CitasService } from '../../services/citas-service.service';
import { MedicoCardComponent } from '../../components/medico-card/medico-card.component';
import { IHorarioDisponible } from '../../interfaces/ihorario-disponible';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pide-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MedicoCardComponent],
  templateUrl: './pide-cita.component.html',
  styleUrls: ['./pide-cita.component.scss']

})
export class PideCitaComponent implements OnInit {
  citaForm!: FormGroup;
  especialidades: IEspecialidad[] = [];
  medicosFiltrados: IHorarioDisponible[] = [];
  minFecha: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private horarioMedicoService: HorariosMedicosService,
    private especialidadesService: EspecialidadesService,
    private citasService: CitasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1) fijar minFecha a hoy en formato YYYY-MM-DD
    this.minFecha = new Date().toISOString().split('T')[0];

    // 2) construir el formulario
    this.citaForm = this.fb.group({
      especialidad: ['', Validators.required],
      fecha: ['', Validators.required],
      idMedico: ['', Validators.required],
      idHorario:    [null, Validators.required] 
    });

    // 3) cargar lista de especialidades
    this.especialidadesService.getEspecialidades().subscribe({
      next: (esps) => this.especialidades = esps,
      error: (err) => console.error('Error cargando especialidades:', err)
    });

    // 4) reaccionar a cambios para recargar médicos
    this.citaForm.get('especialidad')!.valueChanges
      .subscribe(() => this.buscarMedicosDisponibles());
    this.citaForm.get('fecha')!.valueChanges
      .subscribe(() => this.buscarMedicosDisponibles());
  }

  get idMedicoControl(): FormControl {
    return this.citaForm.get('idMedico') as FormControl;
  }

  get idHorarioControl(): FormControl {
    return this.citaForm.get('idHorario') as FormControl;
  }

  buscarMedicosDisponibles(): void {
    const espId = this.citaForm.value.especialidad;
    const fecha = this.citaForm.value.fecha;
    if (espId && fecha) {
      this.horarioMedicoService
        .getMedicosDisponibles(espId, fecha)            
        .subscribe({
          next: (turnos: IHorarioDisponible[]) => {
            this.medicosFiltrados = turnos;             
          },
          error: err => console.error('Error buscando médicos:', err)
        });
    } else {
      this.medicosFiltrados = [];
    }
  }
  onSubmit(): void {
    if (this.citaForm.invalid) return;

    const user = this.authService.getCurrentUserValue();
    console.log("user: ",user)
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    const medicoId = this.citaForm.value.idMedico;
    const medicoHorario = this.medicosFiltrados.find(m => m.medico.usuario.idUsuario === medicoId);
    if (!medicoHorario) {
      console.error('Médico no válido');
      return;
    }

    const nuevaCita: Cita = {
      idCita: 0,
      idUsuario: user.idUsuario,
      nombrePaciente: `${user.nombre} ${user.apellidos}`,
      idMedico: medicoHorario.medico.usuario.idUsuario,
      nombreMedico: `${medicoHorario.medico.usuario.nombre} ${medicoHorario.medico.usuario.apellidos}`,
      fecha: new Date(this.citaForm.value.fecha),
      estado: 'PENDIENTE',
      idHorario:medicoHorario.idHorario
    };
    console.log(nuevaCita)
    this.citasService.crearCita(nuevaCita).subscribe({
      next: created => {
        console.log('Cita creada:', created);
        Swal.fire({
          icon: 'success',
          title: 'Cita creada',
          text: 'Tu cita se ha creado con éxito',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/dashboard']);
      },
      error: err => console.error('Error al crear cita:', err)
    });
  }

  onTurnoSeleccionado(seleccion: { idMedico: number; turnoId: number }) {
    this.citaForm.patchValue({
      idMedico: seleccion.idMedico,
      idHorario: seleccion.turnoId
    });
  }
}