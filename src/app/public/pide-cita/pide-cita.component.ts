import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Cita } from '../../interfaces/cita';
import { IEspecialidad } from '../../interfaces/iespecialidad';
import { EspecialidadesService } from '../../services/especialidades.service';
import { CitasService } from '../../services/citas-service.service';
import { MedicoCardComponent } from '../../components/medico-card/medico-card.component';
import { IHorarioDisponible } from '../../interfaces/ihorario-disponible';
import Swal from 'sweetalert2';
import { MedicosService } from '../../services/medicos.service';
import { IMedicoDto } from '../../interfaces/imedico-dto';
import { IMedicoCard } from '../../interfaces/MedicoCard';


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
  minFecha: string = '';
  medicos: IMedicoDto[] = [];
  horariosDispobibles: IHorarioDisponible[] = [];

   private fb: FormBuilder = inject(FormBuilder);
    private authService: AuthService = inject(AuthService);
    private medicosService: MedicosService = inject(MedicosService);
    private especialidadesService: EspecialidadesService = inject(EspecialidadesService);
    private citasService: CitasService = inject(CitasService);
    private router: Router = inject(Router);
    
    constructor() {}

  ngOnInit(): void {
   console.log("iniciando form")
    this.minFecha = new Date().toISOString().split('T')[0];

    this.citaForm =this.fb.group({
    especialidad: ['', Validators.required],       
    fecha: ['', Validators.required],
    medico: ['', Validators.required],
    idHorario: [null, Validators.required]

    });

    //CARGAR ESPECIALIDADES
    this.especialidadesService.getEspecialidades().subscribe({
      next: (esps) => this.especialidades = esps,
      error: (err) => console.error('Error cargando especialidades:', err)
    });

   //BUSCAR MEDICOS SI CAMBIA ESPECIALIDAD O FECHA
    this.citaForm.get('especialidad')!.valueChanges
      .subscribe(() => this.buscarMedicosDisponibles())

    this.citaForm.get('fecha')?.valueChanges.subscribe(() => {
      this.buscarMedicosDisponibles();
    });

    //Buscar horarios cuando cambia el medico
    this.citaForm.get('medico')?.valueChanges.subscribe(()=>{
      this.buscarHorariosDisponibles();
    })
   
  }

  //metodos asociados
buscarHorariosDisponibles(): void {
  const medico = this.citaForm.get('medico')?.value;
  const fecha = this.citaForm.get('fecha')?.value;

  if (medico && fecha) {
    this.medicosService.getHorariosDisponibles(medico.colegiado, fecha).subscribe({
      next: (horarios) => this.horariosDispobibles = horarios,
      error: (err) => console.error('Error cargando horarios:', err)
    });
  }
}

buscarMedicosDisponibles(): void {
  const idEspecialidad = this.citaForm.get('especialidad')?.value;
  const fecha = this.citaForm.get('fecha')?.value;

  if (idEspecialidad && fecha) {
    this.medicosService.getMedicosDisponiblesPorEspecialidadYFecha(idEspecialidad, fecha).subscribe({
      next: (medicos) => {
        this.medicos  = medicos.filter(m => m && m.nombre);;
        this.citaForm.get('medico')?.reset(); 
        this.horariosDispobibles= [];
      },
      error: (err) =>{
        console.error('Error cargando médicos:', err)
       this.medicos = []; 
      } 
    });
  }
}

  
onSubmit(): void {
  if (this.citaForm.invalid) return;

  const user = this.authService.getCurrentUserValue();

  if (!user || !user.idUsuario) {
  console.error('Usuario no autenticado');
  return;
}

  const citaDto = {
    idUsuario: user?.idUsuario,
    idHorario: this.citaForm.get('idHorario')?.value
  };

  this.citasService.crearCita(citaDto).subscribe({
    next: () => {
       Swal.fire({
        icon: 'success',
        title: 'Cita creada',
        text: 'Tu cita ha sido registrada correctamente.'
      });
      this.citaForm.reset();
      this.horariosDispobibles= [];
      this.medicos = [];
    },
    error: (err) => {
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err?.error || 'No se pudo crear la cita. Intenta más tarde.'
      });
    }
  });
}

get colegiadoControl(): FormControl {
  return this.citaForm.get('medico') as FormControl;
}

onTurnoSeleccionado(event: { colegiado: string }) {
  // Este método puede estar vacío si no haces nada adicional por ahora
  console.log('Médico seleccionado:', event.colegiado);
}  



  
}

