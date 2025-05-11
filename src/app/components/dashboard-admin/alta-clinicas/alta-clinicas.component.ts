import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IEspecialidad } from '../../../interfaces/iespecialidad';
import { ClinicasService } from '../../../services/clinicas-service.service';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { CommonModule } from '@angular/common';
import { Clinica } from '../../../interfaces/clinica';

@Component({
  selector: 'app-alta-clinicas',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './alta-clinicas.component.html',
  styleUrl: './alta-clinicas.component.css'
})
export class AltaClinicasComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() clinicaCreada = new EventEmitter<void>();

  clinicaForm: FormGroup;
  especialidades: IEspecialidad[] = [];

  private fb = inject(FormBuilder);
  private clinicasService = inject(ClinicasService);
  private especialidadesService = inject(EspecialidadesService);

  constructor() {
    this.clinicaForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      especialidades: [[], Validators.required]
    });

    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.especialidadesService.getEspecialidades().subscribe({
      next: (data) => this.especialidades = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar las especialidades', 'error')
    });
  }

  onSubmit(): void {
  if (this.clinicaForm.invalid) return;

  const formValue = this.clinicaForm.value;

  const clinica = {
    ...formValue,
    especialidades: formValue.especialidades // ✅ solo IDs
  };

  console.log('📦 Enviando clínica:', clinica);

  this.clinicasService.crearClinica(clinica).subscribe({
    next: () => {
      Swal.fire('Clínica creada', 'Se ha registrado correctamente.', 'success');
      this.clinicaCreada.emit();
      this.cerrar.emit();
    },
    error: (err) => {
      console.error('❌ Error al crear clínica:', err);
      Swal.fire('Error', 'No se pudo crear la clínica', 'error');
    }
  });
}

  cerrarModal(): void {
    this.cerrar.emit();
  }
}
