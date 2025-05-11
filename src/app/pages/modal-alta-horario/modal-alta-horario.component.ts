import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { IMedicoDto } from '../../interfaces/imedico-dto';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MedicosService } from '../../services/medicos.service';
import { ClinicasService } from '../../services/clinicas-service.service';
import { AuthService } from '../../auth/services/auth.service';
import { IHorarioAltaDto } from '../../interfaces/ihorario-alta-dto';
import { IUser } from '../../auth/interfaces/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-alta-horario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modal-alta-horario.component.html',
  styleUrl: './modal-alta-horario.component.css'
})
export class ModalAltaHorarioComponent implements OnInit{
  @Output() cerrar = new EventEmitter<void>();
  @Input() medico!: IMedicoDto;
  private medicosService: MedicosService = inject(MedicosService);
  private clinicasService: ClinicasService = inject(ClinicasService);
  private authService: AuthService = inject(AuthService);
  horario: IHorarioAltaDto = {
    colegiado: '',
    idClinica: 0,
    fechaCita: '',
    horaInicio: ''
  };

  clinicas: any[] = [];

  constructor(
   
  ) {}

  ngOnInit(): void {
    const user= this.authService.getCurrentUserValue();

    if (user && this.isMedico(user)) {
      this.horario.colegiado = user.colegiado;
    } else {
      console.warn('Usuario no es un médico o no tiene colegiado');
    }

    this.clinicasService.getTodas().subscribe({
      next: data => this.clinicas = data,
      error: err => console.error('Error cargando clínicas', err)
    });
  }

  onGuardar(): void {
    if (!this.horario.colegiado || !this.horario.idClinica || !this.horario.fechaCita || !this.horario.horaInicio) {
      Swal.fire('Faltan datos', 'Por favor completa todos los campos', 'warning');
      return;
    }

    this.medicosService.altaHorarioMedico(this.horario).subscribe({
      next: () => {
        Swal.fire('Horario creado', 'El horario ha sido registrado exitosamente', 'success');
        this.cerrar.emit();
      },
      error: (err) => {
        Swal.fire('Error', err?.error || 'No se pudo crear el horario', 'error');
      }
    });
  }

  onCancelar(): void {
    this.cerrar.emit();
  }

  isMedico(user: IUser | IMedicoDto): user is IMedicoDto {
  return (user as IMedicoDto).colegiado !== undefined;
}
}
